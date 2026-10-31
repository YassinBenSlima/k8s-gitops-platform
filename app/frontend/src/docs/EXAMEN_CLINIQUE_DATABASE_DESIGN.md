# Examen Clinique - Database Design Documentation

## Overview

This document describes the optimized database schema for the Clinical Examination (Examen Clinique) module. The design prioritizes:

1. **Performance** - Fast reads for list views and detailed examination display
2. **Flexibility** - Generic question/answer system adaptable to different examination types
3. **Scalability** - Efficient storage and indexing for large patient volumes
4. **Maintainability** - Clear separation of concerns and audit capabilities
5. **RGPD Compliance** - Complete audit trail and data traceability

---

## Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           EXAMEN CLINIQUE ERD                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────┐     ┌─────────────────┐     ┌──────────────┐                  │
│  │ Patient  │────<│ ExamenClinique  │>────│  Praticien   │                  │
│  └──────────┘     └────────┬────────┘     └──────────────┘                  │
│                            │                                                 │
│            ┌───────────────┼───────────────┬──────────────┐                 │
│            │               │               │              │                 │
│            ▼               ▼               ▼              ▼                 │
│  ┌─────────────────┐ ┌───────────┐ ┌─────────────┐ ┌────────────┐          │
│  │  ExamenSection  │ │  Examen   │ │   Mesure    │ │  Examen    │          │
│  │                 │ │ Dentaire  │ │Cephalometr. │ │ Attachment │          │
│  └────────┬────────┘ └───────────┘ └─────────────┘ └────────────┘          │
│           │                                                                  │
│           ▼                                                                  │
│  ┌─────────────────┐     ┌──────────────────┐                               │
│  │ ReponseExamen   │────>│ QuestionTemplate │                               │
│  └─────────────────┘     └────────┬─────────┘                               │
│                                   │                                          │
│                          ┌────────┴────────┐                                │
│                          ▼                 ▼                                │
│                 ┌─────────────────┐ ┌──────────────┐                        │
│                 │ SectionTemplate │ │QuestionGroup │                        │
│                 └─────────────────┘ └──────────────┘                        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Core Design Patterns

### 1. Hybrid EAV + Structured Approach

Instead of pure Entity-Attribute-Value (EAV) which can be slow, we use a **hybrid approach**:

| Data Type | Storage Strategy | Reason |
|-----------|------------------|--------|
| Generic questions (checkboxes, text) | EAV with `ReponseExamen` | Flexibility |
| Dental examination | Dedicated `ExamenDentaire` table | Complex array data, frequent queries |
| Cephalometric measurements | Dedicated `MesureCephalometrique` table | Typed values, statistical analysis |
| Section summaries | JSONB snapshot in `ExamenSection` | Fast list views |

### 2. Template-Based Questions

Questions are defined in templates, not hardcoded:

```sql
-- Section: Pathologies ORL
-- Group: Ventilation
-- Questions: Nasale, Mixte, Buccale (all boolean)

SectionTemplate (code='pathologies_orl')
    └── QuestionGroup (code='ventilation')
            ├── QuestionTemplate (code='ventilation_nasale', type='boolean')
            ├── QuestionTemplate (code='ventilation_mixte', type='boolean')
            └── QuestionTemplate (code='ventilation_buccale', type='boolean')
```

### 3. Denormalized Snapshots for Performance

Each `ExamenSection` stores a JSONB snapshot of all answers:

```json
{
  "ventilation_nasale": true,
  "ventilation_mixte": false,
  "ventilation_buccale": false,
  "ablation_amygdales": true,
  "ablation_vegetations": false,
  "annee_age": "2020",
  "allergies": "Pénicilline, Latex"
}
```

**Benefits:**
- Single query to load entire section
- No JOINs needed for display
- Fast list views with summary data

---

## Table Specifications

### Patient
```sql
CREATE TABLE patient (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code_patient VARCHAR(20) UNIQUE NOT NULL,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    date_naissance DATE NOT NULL,
    sexe VARCHAR(1) CHECK (sexe IN ('M', 'F', 'O')),
    telephone VARCHAR(20),
    email VARCHAR(255),
    adresse TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE INDEX idx_patient_code ON patient(code_patient);
CREATE INDEX idx_patient_nom ON patient(nom, prenom);
CREATE INDEX idx_patient_active ON patient(is_active) WHERE is_active = TRUE;
```

### ExamenClinique
```sql
CREATE TABLE examen_clinique (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patient(id),
    praticien_id UUID NOT NULL REFERENCES praticien(id),
    
    date_examen TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    statut VARCHAR(20) DEFAULT 'brouillon' 
        CHECK (statut IN ('brouillon', 'en_cours', 'termine', 'valide')),
    numero_examen VARCHAR(20) UNIQUE,
    
    -- Denormalized summary for list views
    diagnostic_principal TEXT,
    observations TEXT,
    objectifs_therapeutiques TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    validated_at TIMESTAMP,
    validated_by UUID REFERENCES praticien(id)
);

-- Composite index for patient examination history
CREATE INDEX idx_examen_patient_date ON examen_clinique(patient_id, date_examen DESC);

-- Partial index for active examinations
CREATE INDEX idx_examen_en_cours ON examen_clinique(praticien_id, date_examen) 
    WHERE statut IN ('brouillon', 'en_cours');

-- Index for validation workflow
CREATE INDEX idx_examen_statut ON examen_clinique(statut, date_examen DESC);
```

### SectionTemplate
```sql
CREATE TABLE section_template (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) UNIQUE NOT NULL,
    nom VARCHAR(100) NOT NULL,
    description TEXT,
    ordre INTEGER NOT NULL,
    couleur VARCHAR(7), -- Hex color
    icone VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Predefined sections
INSERT INTO section_template (code, nom, ordre, couleur, icone) VALUES
('motif_consultation', 'Motif de consultation', 1, '#14B8A6', 'UserIcon'),
('pathologies_orl', 'Pathologies ORL', 2, '#A855F7', 'AlertCircleIcon'),
('parafonctions', 'Parafonctions', 3, '#F97316', 'ActivityIcon'),
('dysfonctions', 'Dysfonctions', 4, '#EF4444', 'AlertCircleIcon'),
('examen_atm', 'Examen ATM', 5, '#6366F1', 'ActivityIcon'),
('examen_dentaire', 'Examen dentaire', 6, '#22C55E', 'SmileIcon'),
('diagnostic_squelettique', 'Diagnostic squelettique', 7, '#3B82F6', 'ActivityIcon'),
('diagnostic_dentaire', 'Diagnostic dentaire', 8, '#22C55E', 'SmileIcon'),
('tissus_mous', 'Analyse des tissus mous', 9, '#A855F7', 'UserIcon'),
('synthese', 'Synthèse diagnostique', 10, '#F59E0B', 'FileTextIcon');
```

### QuestionTemplate
```sql
CREATE TABLE question_template (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_id UUID NOT NULL REFERENCES section_template(id),
    group_id UUID REFERENCES question_group(id),
    
    code VARCHAR(50) NOT NULL,
    libelle VARCHAR(255) NOT NULL,
    description TEXT,
    type_reponse VARCHAR(20) NOT NULL 
        CHECK (type_reponse IN ('boolean', 'single_choice', 'multi_choice', 'text', 'number', 'date', 'teeth_selection')),
    ordre INTEGER NOT NULL,
    
    -- For choice-based questions
    options_json JSONB,
    
    -- Validation
    is_required BOOLEAN DEFAULT FALSE,
    validation_rules JSONB,
    
    -- Conditional display
    condition_json JSONB,
    
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(section_id, code)
);

CREATE INDEX idx_question_section ON question_template(section_id, ordre);
CREATE INDEX idx_question_type ON question_template(type_reponse);
```

### ExamenSection
```sql
CREATE TABLE examen_section (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    examen_id UUID NOT NULL REFERENCES examen_clinique(id) ON DELETE CASCADE,
    section_template_id UUID NOT NULL REFERENCES section_template(id),
    
    statut VARCHAR(20) DEFAULT 'non_commence'
        CHECK (statut IN ('non_commence', 'en_cours', 'termine')),
    completed_at TIMESTAMP,
    
    -- Denormalized JSON snapshot for fast reads
    answers_snapshot JSONB,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(examen_id, section_template_id)
);

CREATE INDEX idx_examen_section_examen ON examen_section(examen_id);
CREATE INDEX idx_examen_section_snapshot ON examen_section USING GIN (answers_snapshot);
```

### ReponseExamen
```sql
CREATE TABLE reponse_examen (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    examen_section_id UUID NOT NULL REFERENCES examen_section(id) ON DELETE CASCADE,
    question_template_id UUID NOT NULL REFERENCES question_template(id),
    
    -- Polymorphic value storage
    valeur_boolean BOOLEAN,
    valeur_text TEXT,
    valeur_number DECIMAL(10,2),
    valeur_date DATE,
    valeur_json JSONB,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_by UUID REFERENCES praticien(id),
    
    UNIQUE(examen_section_id, question_template_id)
);

CREATE INDEX idx_reponse_section ON reponse_examen(examen_section_id);
CREATE INDEX idx_reponse_question ON reponse_examen(question_template_id);
```

### ExamenDentaire (Specialized)
```sql
CREATE TABLE examen_dentaire (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    examen_id UUID UNIQUE NOT NULL REFERENCES examen_clinique(id) ON DELETE CASCADE,
    
    -- Teeth selections as PostgreSQL arrays
    dents_selectionnees INTEGER[] DEFAULT '{}',
    dents_incluses INTEGER[] DEFAULT '{}',
    
    -- Quick access fields
    age_dentaire VARCHAR(10) CHECK (age_dentaire IN ('precoce', 'normal', 'retarde')),
    mih BOOLEAN DEFAULT FALSE,
    
    -- Text observations
    dents_couronnees TEXT,
    caries TEXT,
    implants TEXT,
    dents_absentes TEXT,
    facettes_usure TEXT,
    fractures TEXT,
    dyschromie TEXT,
    
    -- Contacts during movements
    contact_lateral_droite TEXT,
    contact_propulsion TEXT,
    contact_lateral_gauche TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- GIN index for array queries (find exams with specific teeth)
CREATE INDEX idx_examen_dentaire_dents ON examen_dentaire USING GIN (dents_selectionnees);
```

### MesureCephalometrique (Specialized)
```sql
CREATE TABLE mesure_cephalometrique (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    examen_id UUID UNIQUE NOT NULL REFERENCES examen_clinique(id) ON DELETE CASCADE,
    
    -- Vertical measurements
    fma DECIMAL(5,2),
    impa DECIMAL(5,2),
    axe_y DECIMAL(5,2),
    
    -- Sagittal measurements
    anb DECIMAL(5,2),
    sna DECIMAL(5,2),
    snb DECIMAL(5,2),
    convexite_faciale DECIMAL(5,2),
    
    -- Transversal measurements
    largeur_maxillaire DECIMAL(5,2),
    largeur_mandibulaire DECIMAL(5,2),
    symetrie VARCHAR(20) CHECK (symetrie IN ('symetrique', 'deviation_droite', 'deviation_gauche')),
    
    -- Dental measurements
    surplomb DECIMAL(5,2),
    recouvrement DECIMAL(5,2),
    encombrement_sup DECIMAL(5,2),
    encombrement_inf DECIMAL(5,2),
    
    -- Classifications
    classe_molaire_droite VARCHAR(5) CHECK (classe_molaire_droite IN ('I', 'II', 'III')),
    classe_molaire_gauche VARCHAR(5) CHECK (classe_molaire_gauche IN ('I', 'II', 'III')),
    classe_canine VARCHAR(5) CHECK (classe_canine IN ('I', 'II', 'III')),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Performance Optimizations

### 1. Query Patterns & Indexes

| Query Pattern | Index Strategy |
|---------------|----------------|
| List patient examinations | `(patient_id, date_examen DESC)` composite |
| Find in-progress exams | Partial index on `statut IN ('brouillon', 'en_cours')` |
| Load section answers | JSONB `answers_snapshot` - single read |
| Search by teeth | GIN index on `dents_selectionnees` array |
| Audit trail | `(examen_id, timestamp DESC)` |

### 2. Read Optimization Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                    READ PATTERNS                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  LIST VIEW (Fast)                                           │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ SELECT id, date_examen, statut, diagnostic_principal │    │
│  │ FROM examen_clinique                                 │    │
│  │ WHERE patient_id = ?                                 │    │
│  │ ORDER BY date_examen DESC                            │    │
│  │ LIMIT 10                                             │    │
│  └─────────────────────────────────────────────────────┘    │
│  → Uses denormalized summary fields                          │
│  → No JOINs needed                                          │
│                                                              │
│  SECTION VIEW (Fast)                                        │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ SELECT answers_snapshot                              │    │
│  │ FROM examen_section                                  │    │
│  │ WHERE examen_id = ? AND section_template_id = ?      │    │
│  └─────────────────────────────────────────────────────┘    │
│  → Single row, JSONB contains all answers                   │
│                                                              │
│  FULL EXAMINATION (Moderate)                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ SELECT e.*, es.answers_snapshot, ed.*, mc.*          │    │
│  │ FROM examen_clinique e                               │    │
│  │ LEFT JOIN examen_section es ON es.examen_id = e.id   │    │
│  │ LEFT JOIN examen_dentaire ed ON ed.examen_id = e.id  │    │
│  │ LEFT JOIN mesure_cephalometrique mc ON ...           │    │
│  │ WHERE e.id = ?                                       │    │
│  └─────────────────────────────────────────────────────┘    │
│  → Few JOINs, all 1:1 or 1:N with small N                   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 3. Write Optimization Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                    WRITE PATTERNS                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  SAVE SECTION (Atomic)                                      │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ BEGIN TRANSACTION;                                   │    │
│  │                                                      │    │
│  │ -- Update individual answers (for audit)             │    │
│  │ INSERT INTO reponse_examen (...) VALUES (...)        │    │
│  │ ON CONFLICT (examen_section_id, question_template_id)│    │
│  │ DO UPDATE SET ...;                                   │    │
│  │                                                      │    │
│  │ -- Update snapshot (for fast reads)                  │    │
│  │ UPDATE examen_section                                │    │
│  │ SET answers_snapshot = ?, updated_at = NOW()         │    │
│  │ WHERE id = ?;                                        │    │
│  │                                                      │    │
│  │ COMMIT;                                              │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  Benefits:                                                   │
│  - Individual answers preserved for audit                    │
│  - Snapshot updated for fast reads                          │
│  - Atomic transaction ensures consistency                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Volume Estimates

| Entity | Estimated Records (5 years) | Growth Rate |
|--------|----------------------------|-------------|
| Patients | 10,000 | 150/month |
| Examinations | 50,000 | 800/month |
| Sections per exam | 10 | Fixed |
| Answers per exam | ~200 | Fixed |
| Attachments | 100,000 | 1,500/month |

### Storage Estimates

| Table | Avg Row Size | Total Size (5 years) |
|-------|--------------|---------------------|
| examen_clinique | 2 KB | 100 MB |
| examen_section | 5 KB (with JSONB) | 2.5 GB |
| reponse_examen | 200 bytes | 2 GB |
| examen_dentaire | 1 KB | 50 MB |
| mesure_cephalometrique | 500 bytes | 25 MB |
| Attachments (files) | - | 50 GB |

**Total Database Size: ~5 GB** (excluding file storage)

---

## API Query Examples

### 1. Get Patient Examination History
```sql
SELECT 
    e.id,
    e.numero_examen,
    e.date_examen,
    e.statut,
    e.diagnostic_principal,
    p.nom || ' ' || p.prenom AS praticien_nom
FROM examen_clinique e
JOIN praticien p ON p.id = e.praticien_id
WHERE e.patient_id = $1
ORDER BY e.date_examen DESC
LIMIT 20;
```

### 2. Load Section with Answers
```sql
SELECT 
    es.id,
    es.statut,
    es.answers_snapshot,
    st.code AS section_code,
    st.nom AS section_nom
FROM examen_section es
JOIN section_template st ON st.id = es.section_template_id
WHERE es.examen_id = $1
ORDER BY st.ordre;
```

### 3. Find Examinations with Specific Teeth
```sql
SELECT e.*, ed.dents_selectionnees
FROM examen_clinique e
JOIN examen_dentaire ed ON ed.examen_id = e.id
WHERE ed.dents_selectionnees @> ARRAY[11, 21]  -- Contains teeth 11 and 21
ORDER BY e.date_examen DESC;
```

### 4. Statistics: Examinations by Month
```sql
SELECT 
    DATE_TRUNC('month', date_examen) AS mois,
    COUNT(*) AS total,
    COUNT(*) FILTER (WHERE statut = 'valide') AS valides
FROM examen_clinique
WHERE date_examen >= NOW() - INTERVAL '12 months'
GROUP BY DATE_TRUNC('month', date_examen)
ORDER BY mois DESC;
```

---

## Migration Strategy

### Phase 1: Schema Creation
1. Create all tables with indexes
2. Insert template data (sections, questions)
3. Create database functions and triggers

### Phase 2: Data Migration (if existing data)
1. Map existing examination data to new schema
2. Generate JSONB snapshots from individual answers
3. Validate data integrity

### Phase 3: Application Integration
1. Update API endpoints
2. Implement optimistic locking for concurrent edits
3. Add real-time sync for multi-user scenarios

---

## Conclusion

This database design provides:

✅ **High Performance** - Denormalized snapshots for fast reads  
✅ **Flexibility** - Template-based questions, easy to add new sections  
✅ **Scalability** - Efficient indexes, partitioning-ready  
✅ **Data Integrity** - Foreign keys, constraints, audit trail  
✅ **RGPD Compliance** - Complete history, data traceability  
✅ **Developer Experience** - Clear structure, documented patterns

The hybrid approach (EAV + specialized tables + JSONB snapshots) balances flexibility with performance, making it ideal for a clinical examination system that needs both structured data analysis and dynamic form capabilities.
