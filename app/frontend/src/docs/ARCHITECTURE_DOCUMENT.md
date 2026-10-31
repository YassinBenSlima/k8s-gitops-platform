# HealthPilot — Architecture Technique
## Système de Gestion de Cabinet Orthodontique avec Intelligence Artificielle

---

**Version :** 2.0  
**Date :** Février 2026  
**Stack Technique :** Angular 18 · Tailwind CSS · Spring Boot 3.3 · PostgreSQL 16  
**Pattern Backend :** Vertical Slice Architecture  
**Statut :** Approuvé

---

## Table des Matières

1. [Vue d'Ensemble](#1-vue-densemble)
2. [Architecture Globale](#2-architecture-globale)
3. [Architecture Frontend — Angular + Tailwind](#3-architecture-frontend--angular--tailwind)
4. [Architecture Backend — Spring Boot Vertical Slice](#4-architecture-backend--spring-boot-vertical-slice)
5. [Architecture Base de Données — PostgreSQL](#5-architecture-base-de-données--postgresql)
6. [Découpage en Vertical Slices par Module](#6-découpage-en-vertical-slices-par-module)
7. [Architecture API REST](#7-architecture-api-rest)
8. [Sécurité & Authentification](#8-sécurité--authentification)
9. [Architecture IA & Machine Learning](#9-architecture-ia--machine-learning)
10. [Gestion des Fichiers & Imagerie](#10-gestion-des-fichiers--imagerie)
11. [Internationalisation (i18n)](#11-internationalisation-i18n)
12. [Tests & Qualité](#12-tests--qualité)
13. [Infrastructure & Déploiement](#13-infrastructure--déploiement)
14. [Performance & Scalabilité](#14-performance--scalabilité)
15. [Monitoring & Observabilité](#15-monitoring--observabilité)
16. [Conventions & Standards de Développement](#16-conventions--standards-de-développement)
17. [Annexes](#17-annexes)

---

## 1. Vue d'Ensemble

### 1.1 Objectif du Document

Ce document décrit l'architecture technique complète de HealthPilot, une plateforme de gestion de cabinet orthodontique enrichie par l'intelligence artificielle. Il sert de référence pour l'équipe de développement et les parties prenantes techniques.

### 1.2 Principes Architecturaux

| Principe | Description |
|----------|-------------|
| **Vertical Slice Architecture** | Chaque fonctionnalité est un slice autonome traversant toutes les couches (UI → API → DB) |
| **Feature-First Organization** | Le code est organisé par fonctionnalité métier, pas par couche technique |
| **CQRS Léger** | Séparation des commandes (écriture) et des requêtes (lecture) au sein de chaque slice |
| **Domain-Driven Design** | Modélisation guidée par le domaine métier orthodontique |
| **API-First** | Contrat API défini avant l'implémentation |
| **Security by Design** | Sécurité intégrée dès la conception (RGPD, données de santé) |
| **Progressive Enhancement** | Fonctionnalités de base toujours disponibles, IA en enrichissement |

### 1.3 Stack Technique Complet

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND                                │
│  Angular 18 · Tailwind CSS 3.4 · NgRx Signals              │
│  Angular Material · PrimeNG · Chart.js · Three.js           │
│  i18n (ngx-translate) · Fabric.js (Image Editor)            │
├─────────────────────────────────────────────────────────────┤
│                      API GATEWAY                             │
│  Spring Cloud Gateway · Rate Limiting · CORS                │
├─────────────────────────────────────────────────────────────┤
│                      BACKEND                                 │
│  Spring Boot 3.3 · Java 21 · Vertical Slice Architecture   │
│  Spring Security · Spring Data JPA · Hibernate 6            │
│  MediatR-style (custom) · MapStruct · Flyway               │
├─────────────────────────────────────────────────────────────┤
│                      AI / ML                                 │
│  Python 3.12 · FastAPI · TensorFlow/PyTorch                 │
│  scikit-learn · OpenCV · ONNX Runtime                       │
├─────────────────────────────────────────────────────────────┤
│                      DATA                                    │
│  PostgreSQL 16 · Redis 7 (Cache) · MinIO (Object Storage)  │
│  Elasticsearch 8 (Search) · RabbitMQ (Messaging)           │
├─────────────────────────────────────────────────────────────┤
│                      INFRASTRUCTURE                          │
│  Docker · Kubernetes · Azure Cloud                          │
│  Prometheus · Grafana · ELK Stack                           │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Architecture Globale

### 2.1 Diagramme d'Architecture Haut Niveau

```
                    ┌──────────────────┐
                    │   CDN (Azure)    │
                    │  Static Assets   │
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │  Load Balancer   │
                    │    (Azure LB)    │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
     ┌────────▼───────┐     │     ┌────────▼───────┐
     │  Angular SPA   │     │     │  Angular SPA   │
     │  (Instance 1)  │     │     │  (Instance N)  │
     └────────┬───────┘     │     └────────┬───────┘
              │              │              │
              └──────────────┼──────────────┘
                             │
                    ┌────────▼─────────┐
                    │   API Gateway    │
                    │ (Spring Cloud)   │
                    │ Rate Limit, Auth │
                    └────────┬─────────┘
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
┌────────▼───────┐  ┌───────▼────────┐  ┌───────▼────────┐
│  Spring Boot   │  │  Spring Boot   │  │   AI Service   │
│  Main API      │  │  Main API      │  │   (FastAPI)    │
│  (Instance 1)  │  │  (Instance N)  │  │   ML Models    │
└────────┬───────┘  └───────┬────────┘  └───────┬────────┘
         │                   │                   │
         └───────────────────┼───────────────────┘
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
┌────────▼───────┐  ┌───────▼────────┐  ┌───────▼────────┐
│  PostgreSQL    │  │     Redis      │  │     MinIO      │
│  (Primary +   │  │   (Cache +     │  │  (Object       │
│   Replica)    │  │    Sessions)   │  │   Storage)     │
└────────────────┘  └────────────────┘  └────────────────┘
```

### 2.2 Communication Inter-Services

```
┌─────────────────────────────────────────────────────────────┐
│                  Communication Patterns                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Synchrone (REST):                                          │
│  Angular ──HTTP/JSON──> Spring Boot API                     │
│  Spring Boot ──HTTP──> AI Service (FastAPI)                 │
│                                                              │
│  Asynchrone (Events):                                       │
│  Spring Boot ──RabbitMQ──> Notification Service             │
│  Spring Boot ──RabbitMQ──> AI Analysis Queue                │
│  Spring Boot ──RabbitMQ──> Audit Log Service                │
│                                                              │
│  Cache:                                                      │
│  Spring Boot ──Redis──> Session Store                       │
│  Spring Boot ──Redis──> Query Cache                         │
│  Spring Boot ──Redis──> Rate Limiting                       │
│                                                              │
│  Search:                                                     │
│  Spring Boot ──Elasticsearch──> Full-Text Search            │
│  (Patients, Documents, Notes)                               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Architecture Frontend — Angular + Tailwind

### 3.1 Structure du Projet Angular

```
healthpilot-frontend/
├── angular.json
├── tailwind.config.js
├── tsconfig.json
├── package.json
│
├── src/
│   ├── main.ts
│   ├── index.html
│   ├── styles.css                          # Tailwind imports + global styles
│   │
│   ├── app/
│   │   ├── app.component.ts
│   │   ├── app.config.ts                   # Standalone app config
│   │   ├── app.routes.ts                   # Top-level routes
│   │   │
│   │   ├── core/                           # Singleton services, guards, interceptors
│   │   │   ├── auth/
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth.guard.ts
│   │   │   │   ├── auth.interceptor.ts
│   │   │   │   └── token.service.ts
│   │   │   ├── http/
│   │   │   │   ├── api.interceptor.ts
│   │   │   │   ├── error.interceptor.ts
│   │   │   │   └── loading.interceptor.ts
│   │   │   ├── services/
│   │   │   │   ├── notification.service.ts
│   │   │   │   ├── websocket.service.ts
│   │   │   │   └── theme.service.ts
│   │   │   └── guards/
│   │   │       ├── role.guard.ts
│   │   │       └── permission.guard.ts
│   │   │
│   │   ├── shared/                         # Shared components, directives, pipes
│   │   │   ├── components/
│   │   │   │   ├── stat-card/
│   │   │   │   ├── data-table/
│   │   │   │   ├── confirm-dialog/
│   │   │   │   ├── file-upload/
│   │   │   │   ├── search-input/
│   │   │   │   └── loading-spinner/
│   │   │   ├── directives/
│   │   │   │   ├── click-outside.directive.ts
│   │   │   │   ├── permission.directive.ts
│   │   │   │   └── rtl.directive.ts
│   │   │   ├── pipes/
│   │   │   │   ├── date-format.pipe.ts
│   │   │   │   ├── currency-format.pipe.ts
│   │   │   │   └── truncate.pipe.ts
│   │   │   └── models/
│   │   │       ├── api-response.model.ts
│   │   │       ├── pagination.model.ts
│   │   │       └── user.model.ts
│   │   │
│   │   ├── layout/                         # App shell (sidebar, header, footer)
│   │   │   ├── layout.component.ts
│   │   │   ├── sidebar/
│   │   │   │   ├── sidebar.component.ts
│   │   │   │   └── sidebar.component.html
│   │   │   ├── header/
│   │   │   │   ├── header.component.ts
│   │   │   │   └── header.component.html
│   │   │   └── language-selector/
│   │   │       └── language-selector.component.ts
│   │   │
│   │   └── features/                       # Feature modules (lazy-loaded)
│   │       ├── dashboard/
│   │       │   ├── dashboard.routes.ts
│   │       │   ├── dashboard.component.ts
│   │       │   ├── components/
│   │       │   │   ├── stats-card.component.ts
│   │       │   │   ├── revenue-chart.component.ts
│   │       │   │   └── activity-timeline.component.ts
│   │       │   └── services/
│   │       │       └── dashboard.service.ts
│   │       │
│   │       ├── patients/
│   │       │   ├── patients.routes.ts
│   │       │   ├── patient-list/
│   │       │   │   ├── patient-list.component.ts
│   │       │   │   └── patient-list.component.html
│   │       │   ├── patient-detail/
│   │       │   │   ├── patient-detail.component.ts
│   │       │   │   └── patient-detail.component.html
│   │       │   ├── patient-create/
│   │       │   │   ├── patient-create.component.ts
│   │       │   │   └── patient-create.component.html
│   │       │   ├── patient-edit/
│   │       │   │   └── patient-edit.component.ts
│   │       │   ├── components/
│   │       │   │   ├── payment-plan-modal.component.ts
│   │       │   │   └── send-notification-modal.component.ts
│   │       │   ├── models/
│   │       │   │   └── patient.model.ts
│   │       │   └── services/
│   │       │       └── patient.service.ts
│   │       │
│   │       ├── appointments/
│   │       │   ├── appointments.routes.ts
│   │       │   ├── appointment-calendar/
│   │       │   ├── appointment-create/
│   │       │   ├── appointment-detail/
│   │       │   ├── models/
│   │       │   └── services/
│   │       │
│   │       ├── diagnostics/
│   │       │   ├── diagnostics.routes.ts
│   │       │   ├── dental-chart/
│   │       │   ├── image-analysis/
│   │       │   ├── anomaly-detection/
│   │       │   ├── treatment-plans/
│   │       │   ├── examen-clinique/
│   │       │   │   ├── examen-list.component.ts
│   │       │   │   ├── examen-form.component.ts
│   │       │   │   ├── sections/
│   │       │   │   │   ├── motif-consultation.component.ts
│   │       │   │   │   ├── pathologies-orl.component.ts
│   │       │   │   │   ├── parafonctions.component.ts
│   │       │   │   │   ├── dysfonctions.component.ts
│   │       │   │   │   ├── examen-atm.component.ts
│   │       │   │   │   ├── examen-dentaire.component.ts
│   │       │   │   │   └── examens-complementaires.component.ts
│   │       │   │   └── models/
│   │       │   │       └── examen-clinique.model.ts
│   │       │   ├── models/
│   │       │   └── services/
│   │       │
│   │       ├── treatments/
│   │       │   ├── treatments.routes.ts
│   │       │   ├── treatment-list/
│   │       │   ├── treatment-detail/
│   │       │   ├── evolution-tracking/
│   │       │   ├── components/
│   │       │   │   ├── photo-comparison.component.ts
│   │       │   │   ├── timeline-view.component.ts
│   │       │   │   └── photo-uploader.component.ts
│   │       │   ├── models/
│   │       │   └── services/
│   │       │
│   │       ├── ai-tools/
│   │       │   ├── ai-tools.routes.ts
│   │       │   ├── ai-dashboard/
│   │       │   ├── ml-analysis/
│   │       │   ├── treatment-recommendations/
│   │       │   ├── problem-detection/
│   │       │   ├── schedule-optimization/
│   │       │   ├── models/
│   │       │   └── services/
│   │       │
│   │       ├── administration/
│   │       │   ├── administration.routes.ts
│   │       │   ├── financial-dashboard/
│   │       │   ├── facturation/
│   │       │   ├── mutuelles/
│   │       │   ├── paiements/
│   │       │   ├── rapports/
│   │       │   ├── comptabilite/
│   │       │   ├── models/
│   │       │   └── services/
│   │       │
│   │       ├── hr/
│   │       │   ├── hr.routes.ts
│   │       │   ├── hr-dashboard/
│   │       │   ├── staff-directory/
│   │       │   ├── contracts/
│   │       │   ├── vacations/
│   │       │   ├── evaluations/
│   │       │   ├── models/
│   │       │   └── services/
│   │       │
│   │       ├── stock/
│   │       │   ├── stock.routes.ts
│   │       │   ├── material-list/
│   │       │   ├── stock-movement/
│   │       │   ├── low-stock-alert/
│   │       │   ├── generate-order/
│   │       │   ├── models/
│   │       │   └── services/
│   │       │
│   │       ├── imagerie/
│   │       │   ├── imagerie.routes.ts
│   │       │   ├── image-editor/
│   │       │   │   ├── editor-canvas.component.ts
│   │       │   │   ├── editor-toolbar.component.ts
│   │       │   │   ├── editor-settings-panel.component.ts
│   │       │   │   └── editor-top-bar.component.ts
│   │       │   ├── tools/
│   │       │   ├── filters/
│   │       │   ├── layers/
│   │       │   └── services/
│   │       │
│   │       ├── users/
│   │       │   ├── users.routes.ts
│   │       │   ├── user-list/
│   │       │   ├── user-create/
│   │       │   ├── permissions/
│   │       │   ├── activity-logs/
│   │       │   ├── security-settings/
│   │       │   ├── models/
│   │       │   └── services/
│   │       │
│   │       ├── communication/
│   │       │   ├── communication.routes.ts
│   │       │   └── ...
│   │       │
│   │       ├── notifications/
│   │       │   ├── notifications.routes.ts
│   │       │   └── ...
│   │       │
│   │       ├── settings/
│   │       │   └── ...
│   │       │
│   │       └── auth/
│   │           ├── login/
│   │           │   └── login.component.ts
│   │           └── auth.routes.ts
│   │
│   ├── assets/
│   │   ├── i18n/
│   │   │   ├── fr.json
│   │   │   ├── en.json
│   │   │   └── ar.json
│   │   ├── images/
│   │   └── fonts/
│   │
│   └── environments/
│       ├── environment.ts
│       ├── environment.development.ts
│       └── environment.production.ts
```

### 3.2 Tailwind CSS Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',  // Main brand blue
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        dental: {
          teal:   '#14B8A6',
          purple: '#A855F7',
          orange: '#F97316',
          red:    '#EF4444',
          indigo: '#6366F1',
          green:  '#22C55E',
          amber:  '#F59E0B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in':    'fadeIn 0.3s ease-out',
        'slide-up':   'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in':   'scaleIn 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
```

### 3.3 State Management — NgRx Signals

```typescript
// Approche: NgRx Signal Store par feature

// features/patients/store/patient.store.ts
export const PatientStore = signalStore(
  { providedIn: 'root' },
  withState<PatientState>({
    patients: [],
    selectedPatient: null,
    loading: false,
    error: null,
    filters: { search: '', status: 'all' },
    pagination: { page: 0, size: 20, total: 0 },
  }),
  withComputed((store) => ({
    filteredPatients: computed(() => /* filtering logic */),
    hasMore: computed(() => store.pagination().page * store.pagination().size < store.pagination().total),
  })),
  withMethods((store, patientService = inject(PatientService)) => ({
    loadPatients: rxMethod<PatientFilters>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap((filters) => patientService.getAll(filters)),
        tap((response) => patchState(store, {
          patients: response.content,
          pagination: { ...store.pagination(), total: response.totalElements },
          loading: false,
        })),
      ),
    ),
    selectPatient: (id: string) => { /* ... */ },
    createPatient: rxMethod<CreatePatientDto>(/* ... */),
  })),
);
```

### 3.4 Routing Strategy — Lazy Loading

```typescript
// app.routes.ts
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard',      loadChildren: () => import('./features/dashboard/dashboard.routes') },
      { path: 'patients',       loadChildren: () => import('./features/patients/patients.routes') },
      { path: 'appointments',   loadChildren: () => import('./features/appointments/appointments.routes') },
      { path: 'diagnostics',    loadChildren: () => import('./features/diagnostics/diagnostics.routes') },
      { path: 'treatments',     loadChildren: () => import('./features/treatments/treatments.routes') },
      { path: 'ai-tools',       loadChildren: () => import('./features/ai-tools/ai-tools.routes') },
      { path: 'administration', loadChildren: () => import('./features/administration/administration.routes') },
      { path: 'hr',             loadChildren: () => import('./features/hr/hr.routes') },
      { path: 'stock',          loadChildren: () => import('./features/stock/stock.routes') },
      { path: 'users',          loadChildren: () => import('./features/users/users.routes') },
      { path: 'communication',  loadChildren: () => import('./features/communication/communication.routes') },
      { path: 'notifications',  loadChildren: () => import('./features/notifications/notifications.routes') },
      { path: 'settings',       loadChildren: () => import('./features/settings/settings.routes') },
      { path: 'profile',        loadChildren: () => import('./features/settings/profile.routes') },
    ],
  },
  // Standalone full-screen routes
  { path: 'imagerie', loadChildren: () => import('./features/imagerie/imagerie.routes') },
  { path: '**', redirectTo: 'dashboard' },
];
```

---

## 4. Architecture Backend — Spring Boot Vertical Slice

### 4.1 Pourquoi Vertical Slice Architecture ?

**Architecture Traditionnelle en Couches (N-Tier) :**
```
❌ Problème: Couplage horizontal entre couches
Controllers/ → Services/ → Repositories/ → Entities/
   ↓              ↓             ↓              ↓
PatientCtrl   PatientSvc   PatientRepo   Patient.java
AppointCtrl   AppointSvc   AppointRepo   Appointment.java
InvoiceCtrl   InvoiceSvc   InvoiceRepo   Invoice.java
```

**Vertical Slice Architecture :**
```
✅ Solution: Chaque feature est autonome
features/
├── patients/
│   ├── create-patient/     ← Slice complet: Request → Handler → Response
│   ├── get-patient/
│   ├── update-patient/
│   ├── list-patients/
│   └── delete-patient/
├── appointments/
│   ├── create-appointment/
│   ├── get-appointment/
│   └── ...
```

**Avantages :**
- Chaque slice est indépendant et testable isolément
- Modification d'une feature sans impact sur les autres
- Facilite le travail en équipe (chaque dev travaille sur un slice)
- Réduit le couplage entre features
- Code plus facile à comprendre (tout est au même endroit)

### 4.2 Structure du Projet Spring Boot

```
healthpilot-api/
├── pom.xml (ou build.gradle)
├── src/
│   ├── main/
│   │   ├── java/com/healthpilot/
│   │   │   │
│   │   │   ├── HealthPilotApplication.java
│   │   │   │
│   │   │   ├── common/                          # Cross-cutting concerns
│   │   │   │   ├── config/
│   │   │   │   │   ├── SecurityConfig.java
│   │   │   │   │   ├── CorsConfig.java
│   │   │   │   │   ├── JpaConfig.java
│   │   │   │   │   ├── RedisConfig.java
│   │   │   │   │   ├── RabbitMQConfig.java
│   │   │   │   │   ├── OpenApiConfig.java
│   │   │   │   │   └── AsyncConfig.java
│   │   │   │   ├── security/
│   │   │   │   │   ├── JwtTokenProvider.java
│   │   │   │   │   ├── JwtAuthenticationFilter.java
│   │   │   │   │   ├── UserDetailsServiceImpl.java
│   │   │   │   │   └── SecurityUtils.java
│   │   │   │   ├── exception/
│   │   │   │   │   ├── GlobalExceptionHandler.java
│   │   │   │   │   ├── BusinessException.java
│   │   │   │   │   ├── NotFoundException.java
│   │   │   │   │   ├── UnauthorizedException.java
│   │   │   │   │   └── ValidationException.java
│   │   │   │   ├── audit/
│   │   │   │   │   ├── AuditAspect.java
│   │   │   │   │   ├── AuditLog.java
│   │   │   │   │   └── AuditLogRepository.java
│   │   │   │   ├── pagination/
│   │   │   │   │   ├── PageResponse.java
│   │   │   │   │   └── PageRequest.java
│   │   │   │   ├── validation/
│   │   │   │   │   └── ValidationUtils.java
│   │   │   │   └── events/
│   │   │   │       ├── DomainEvent.java
│   │   │   │       └── EventPublisher.java
│   │   │   │
│   │   │   └── features/                        # ★ VERTICAL SLICES ★
│   │   │       │
│   │   │       ├── auth/                        # Authentication Feature
│   │   │       │   ├── login/
│   │   │       │   │   ├── LoginController.java
│   │   │       │   │   ├── LoginRequest.java
│   │   │       │   │   ├── LoginResponse.java
│   │   │       │   │   └── LoginHandler.java
│   │   │       │   ├── refresh-token/
│   │   │       │   │   ├── RefreshTokenController.java
│   │   │       │   │   ├── RefreshTokenRequest.java
│   │   │       │   │   └── RefreshTokenHandler.java
│   │   │       │   ├── logout/
│   │   │       │   │   └── ...
│   │   │       │   └── domain/
│   │   │       │       ├── User.java
│   │   │       │       ├── Role.java
│   │   │       │       ├── Permission.java
│   │   │       │       └── UserRepository.java
│   │   │       │
│   │   │       ├── patients/                    # Patient Management Feature
│   │   │       │   ├── create-patient/
│   │   │       │   │   ├── CreatePatientController.java
│   │   │       │   │   ├── CreatePatientRequest.java
│   │   │       │   │   ├── CreatePatientResponse.java
│   │   │       │   │   ├── CreatePatientHandler.java
│   │   │       │   │   └── CreatePatientValidator.java
│   │   │       │   ├── get-patient/
│   │   │       │   │   ├── GetPatientController.java
│   │   │       │   │   ├── GetPatientResponse.java
│   │   │       │   │   └── GetPatientHandler.java
│   │   │       │   ├── list-patients/
│   │   │       │   │   ├── ListPatientsController.java
│   │   │       │   │   ├── ListPatientsRequest.java
│   │   │       │   │   ├── ListPatientsResponse.java
│   │   │       │   │   └── ListPatientsHandler.java
│   │   │       │   ├── update-patient/
│   │   │       │   │   └── ...
│   │   │       │   ├── delete-patient/
│   │   │       │   │   └── ...
│   │   │       │   ├── upload-document/
│   │   │       │   │   └── ...
│   │   │       │   ├── upload-photo/
│   │   │       │   │   └── ...
│   │   │       │   ├── send-notification/
│   │   │       │   │   └── ...
│   │   │       │   ├── manage-payment-plan/
│   │   │       │   │   └── ...
│   │   │       │   └── domain/
│   │   │       │       ├── Patient.java
│   │   │       │       ├── PatientRepository.java
│   │   │       │       ├── MedicalHistory.java
│   │   │       │       ├── InsuranceInfo.java
│   │   │       │       └── PaymentPlan.java
│   │   │       │
│   │   │       ├── appointments/                # Appointments Feature
│   │   │       │   ├── create-appointment/
│   │   │       │   ├── get-appointment/
│   │   │       │   ├── list-appointments/
│   │   │       │   ├── update-appointment/
│   │   │       │   ├── cancel-appointment/
│   │   │       │   ├── confirm-appointment/
│   │   │       │   ├── check-availability/
│   │   │       │   └── domain/
│   │   │       │       ├── Appointment.java
│   │   │       │       ├── AppointmentStatus.java
│   │   │       │       └── AppointmentRepository.java
│   │   │       │
│   │   │       ├── diagnostics/                 # Diagnostics Feature
│   │   │       │   ├── examen-clinique/
│   │   │       │   │   ├── create-examen/
│   │   │       │   │   ├── get-examen/
│   │   │       │   │   ├── list-examens/
│   │   │       │   │   ├── update-examen/
│   │   │       │   │   ├── validate-examen/
│   │   │       │   │   └── domain/
│   │   │       │   │       ├── ExamenClinique.java
│   │   │       │   │       ├── ExamenSection.java
│   │   │       │   │       ├── ReponseExamen.java
│   │   │       │   │       ├── SectionTemplate.java
│   │   │       │   │       ├── QuestionTemplate.java
│   │   │       │   │       ├── ExamenDentaire.java
│   │   │       │   │       ├── MesureCephalometrique.java
│   │   │       │   │       └── ExamenCliniqueRepository.java
│   │   │       │   ├── image-analysis/
│   │   │       │   │   ├── analyze-image/
│   │   │       │   │   └── domain/
│   │   │       │   ├── anomaly-detection/
│   │   │       │   └── treatment-plans/
│   │   │       │
│   │   │       ├── treatments/                  # Treatment Tracking Feature
│   │   │       │   ├── create-treatment/
│   │   │       │   ├── get-treatment/
│   │   │       │   ├── track-evolution/
│   │   │       │   ├── add-evaluation/
│   │   │       │   ├── add-note/
│   │   │       │   ├── generate-report/
│   │   │       │   └── domain/
│   │   │       │
│   │   │       ├── ai-tools/                    # AI Tools Feature
│   │   │       │   ├── ml-analysis/
│   │   │       │   │   ├── run-analysis/
│   │   │       │   │   ├── get-analysis-result/
│   │   │       │   │   └── domain/
│   │   │       │   ├── treatment-recommendations/
│   │   │       │   │   ├── generate-recommendations/
│   │   │       │   │   ├── apply-recommendation/
│   │   │       │   │   └── domain/
│   │   │       │   ├── problem-detection/
│   │   │       │   │   ├── detect-problems/
│   │   │       │   │   ├── get-alerts/
│   │   │       │   │   └── domain/
│   │   │       │   └── schedule-optimization/
│   │   │       │       ├── optimize-schedule/
│   │   │       │       └── domain/
│   │   │       │
│   │   │       ├── administration/              # Financial Administration
│   │   │       │   ├── invoices/
│   │   │       │   │   ├── create-invoice/
│   │   │       │   │   ├── list-invoices/
│   │   │       │   │   ├── send-invoice/
│   │   │       │   │   └── domain/
│   │   │       │   ├── honoraires/
│   │   │       │   ├── devis/
│   │   │       │   ├── mutuelles/
│   │   │       │   │   ├── create-fse/
│   │   │       │   │   ├── verify-rights/
│   │   │       │   │   ├── track-reimbursement/
│   │   │       │   │   └── domain/
│   │   │       │   ├── paiements/
│   │   │       │   │   ├── create-payment-link/
│   │   │       │   │   ├── process-payment/
│   │   │       │   │   ├── create-payment-plan/
│   │   │       │   │   └── domain/
│   │   │       │   ├── comptabilite/
│   │   │       │   │   ├── treasury-movement/
│   │   │       │   │   ├── asset-management/
│   │   │       │   │   ├── tax-declaration/
│   │   │       │   │   └── domain/
│   │   │       │   └── rapports/
│   │   │       │       ├── generate-financial-report/
│   │   │       │       └── domain/
│   │   │       │
│   │   │       ├── hr/                          # Human Resources
│   │   │       │   ├── staff/
│   │   │       │   │   ├── create-staff/
│   │   │       │   │   ├── list-staff/
│   │   │       │   │   ├── get-staff-profile/
│   │   │       │   │   └── domain/
│   │   │       │   ├── contracts/
│   │   │       │   ├── vacations/
│   │   │       │   │   ├── request-vacation/
│   │   │       │   │   ├── approve-vacation/
│   │   │       │   │   ├── get-balance/
│   │   │       │   │   └── domain/
│   │   │       │   └── evaluations/
│   │   │       │
│   │   │       ├── stock/                       # Stock Management
│   │   │       │   ├── materials/
│   │   │       │   │   ├── add-material/
│   │   │       │   │   ├── list-materials/
│   │   │       │   │   └── domain/
│   │   │       │   ├── movements/
│   │   │       │   ├── alerts/
│   │   │       │   └── orders/
│   │   │       │
│   │   │       ├── users/                       # User Management
│   │   │       │   ├── create-user/
│   │   │       │   ├── list-users/
│   │   │       │   ├── manage-permissions/
│   │   │       │   ├── activity-logs/
│   │   │       │   └── domain/
│   │   │       │
│   │   │       ├── communication/               # Communication
│   │   │       │   ├── send-sms/
│   │   │       │   ├── send-email/
│   │   │       │   └── domain/
│   │   │       │
│   │   │       ├── notifications/               # Notifications
│   │   │       │   ├── create-notification/
│   │   │       │   ├── list-notifications/
│   │   │       │   ├── mark-as-read/
│   │   │       │   └── domain/
│   │   │       │
│   │   │       └── dashboard/                   # Dashboard
│   │   │           ├── get-stats/
│   │   │           ├── get-recent-activity/
│   │   │           └── domain/
│   │   │
│   │   └── resources/
│   │       ├── application.yml
│   │       ├── application-dev.yml
│   │       ├── application-prod.yml
│   │       └── db/migration/                    # Flyway migrations
│   │           ├── V1__create_users_tables.sql
│   │           ├── V2__create_patients_tables.sql
│   │           ├── V3__create_appointments_tables.sql
│   │           ├── V4__create_diagnostics_tables.sql
│   │           ├── V5__create_treatments_tables.sql
│   │           ├── V6__create_administration_tables.sql
│   │           ├── V7__create_hr_tables.sql
│   │           ├── V8__create_stock_tables.sql
│   │           ├── V9__create_communication_tables.sql
│   │           ├── V10__create_ai_tables.sql
│   │           ├── V11__create_audit_tables.sql
│   │           └── V12__seed_template_data.sql
│   │
│   └── test/
│       └── java/com/healthpilot/
│           └── features/
│               ├── patients/
│               │   ├── create-patient/
│               │   │   ├── CreatePatientHandlerTest.java
│               │   │   └── CreatePatientControllerIT.java
│               │   └── ...
│               └── ...
```

### 4.3 Anatomie d'un Vertical Slice

Chaque slice suit le même pattern :

```
create-patient/
├── CreatePatientController.java   ← HTTP endpoint (thin)
├── CreatePatientRequest.java      ← Input DTO + validation
├── CreatePatientResponse.java     ← Output DTO
├── CreatePatientHandler.java      ← Business logic (the meat)
└── CreatePatientValidator.java    ← Complex validation (optional)
```

#### Exemple Complet : Create Patient Slice

```java
// ═══════════════════════════════════════════════════════
// 1. REQUEST DTO (with Jakarta Validation)
// ═══════════════════════════════════════════════════════
@Data
public class CreatePatientRequest {
    @NotBlank(message = "Le nom est obligatoire")
    @Size(max = 100)
    private String nom;

    @NotBlank(message = "Le prénom est obligatoire")
    @Size(max = 100)
    private String prenom;

    @NotNull(message = "La date de naissance est obligatoire")
    @Past
    private LocalDate dateNaissance;

    @Pattern(regexp = "^[MFO]$")
    private String sexe;

    @Email
    private String email;

    @Pattern(regexp = "^\\+?[0-9]{8,15}$")
    private String telephone;

    private String adresse;
    private MedicalHistoryDto antecedentsMedicaux;
    private InsuranceInfoDto assurance;
}

// ═══════════════════════════════════════════════════════
// 2. RESPONSE DTO
// ═══════════════════════════════════════════════════════
@Data
@Builder
public class CreatePatientResponse {
    private UUID id;
    private String codePatient;
    private String nom;
    private String prenom;
    private LocalDate dateNaissance;
    private LocalDateTime createdAt;
}

// ═══════════════════════════════════════════════════════
// 3. HANDLER (Business Logic)
// ═══════════════════════════════════════════════════════
@Service
@RequiredArgsConstructor
@Transactional
public class CreatePatientHandler {

    private final PatientRepository patientRepository;
    private final PatientCodeGenerator codeGenerator;
    private final EventPublisher eventPublisher;

    public CreatePatientResponse handle(CreatePatientRequest request) {
        // Check for duplicates
        patientRepository
            .findByNomAndPrenomAndDateNaissance(
                request.getNom(), request.getPrenom(), request.getDateNaissance())
            .ifPresent(existing -> {
                throw new BusinessException("PATIENT_DUPLICATE",
                    "Un patient avec ces informations existe déjà");
            });

        // Create entity
        Patient patient = Patient.builder()
            .codePatient(codeGenerator.generate())
            .nom(request.getNom())
            .prenom(request.getPrenom())
            .dateNaissance(request.getDateNaissance())
            .sexe(request.getSexe())
            .email(request.getEmail())
            .telephone(request.getTelephone())
            .adresse(request.getAdresse())
            .isActive(true)
            .build();

        Patient saved = patientRepository.save(patient);

        // Publish domain event
        eventPublisher.publish(new PatientCreatedEvent(saved.getId()));

        return CreatePatientResponse.builder()
            .id(saved.getId())
            .codePatient(saved.getCodePatient())
            .nom(saved.getNom())
            .prenom(saved.getPrenom())
            .dateNaissance(saved.getDateNaissance())
            .createdAt(saved.getCreatedAt())
            .build();
    }
}

// ═══════════════════════════════════════════════════════
// 4. CONTROLLER (Thin — delegates to handler)
// ═══════════════════════════════════════════════════════
@RestController
@RequestMapping("/api/v1/patients")
@RequiredArgsConstructor
@Tag(name = "Patients", description = "Gestion des patients")
public class CreatePatientController {

    private final CreatePatientHandler handler;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyRole('ADMIN', 'RECEPTIONIST', 'PRACTITIONER')")
    @Operation(summary = "Créer un nouveau patient")
    @ApiResponse(responseCode = "201", description = "Patient créé avec succès")
    @ApiResponse(responseCode = "409", description = "Patient en doublon")
    public CreatePatientResponse create(
            @Valid @RequestBody CreatePatientRequest request) {
        return handler.handle(request);
    }
}
```

### 4.4 Domain Events Pattern

```java
// Domain Event
public record PatientCreatedEvent(UUID patientId) implements DomainEvent {}

// Event Listener (in another slice or service)
@Component
@RequiredArgsConstructor
public class PatientCreatedEventListener {

    private final NotificationService notificationService;
    private final AuditLogService auditLogService;

    @EventListener
    @Async
    public void onPatientCreated(PatientCreatedEvent event) {
        // Send welcome notification
        notificationService.sendWelcomeNotification(event.patientId());
        // Log audit
        auditLogService.log("PATIENT_CREATED", event.patientId());
    }
}
```

---

## 5. Architecture Base de Données — PostgreSQL

### 5.1 Schéma Général

```
┌─────────────────────────────────────────────────────────────┐
│                    PostgreSQL 16                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Schema: public                                             │
│  ├── auth_*          (users, roles, permissions, sessions)  │
│  ├── patient_*       (patients, medical_history, insurance) │
│  ├── appointment_*   (appointments, reminders)              │
│  ├── diagnostic_*    (examens, sections, reponses, mesures) │
│  ├── treatment_*     (plans, evaluations, notes, photos)    │
│  ├── admin_*         (invoices, payments, devis, fse)       │
│  ├── hr_*            (staff, contracts, vacations, evals)   │
│  ├── stock_*         (materials, movements, orders)         │
│  ├── comm_*          (messages, notifications, templates)   │
│  ├── ai_*            (analyses, recommendations, alerts)    │
│  └── audit_*         (logs, events)                         │
│                                                              │
│  Extensions:                                                │
│  ├── uuid-ossp       (UUID generation)                      │
│  ├── pgcrypto        (Encryption)                           │
│  ├── pg_trgm         (Trigram search)                       │
│  ├── btree_gin       (GIN indexes)                          │
│  └── pg_stat_statements (Query monitoring)                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 Tables Principales par Module

```sql
-- ═══════════════════════════════════════════════════════
-- AUTH MODULE
-- ═══════════════════════════════════════════════════════
CREATE TABLE auth_users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username        VARCHAR(50) UNIQUE NOT NULL,
    email           VARCHAR(255) UNIQUE NOT NULL,
    password_hash   VARCHAR(255) NOT NULL,
    first_name      VARCHAR(100) NOT NULL,
    last_name       VARCHAR(100) NOT NULL,
    phone           VARCHAR(20),
    avatar_url      VARCHAR(500),
    role_id         UUID REFERENCES auth_roles(id),
    is_active       BOOLEAN DEFAULT TRUE,
    is_locked       BOOLEAN DEFAULT FALSE,
    failed_attempts INT DEFAULT 0,
    last_login_at   TIMESTAMP,
    language        VARCHAR(5) DEFAULT 'fr',
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE auth_roles (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(50) UNIQUE NOT NULL,  -- ADMIN, PRACTITIONER, RECEPTIONIST, ASSISTANT, MANAGER
    description TEXT,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE auth_permissions (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code        VARCHAR(100) UNIQUE NOT NULL,  -- patients.create, patients.read, etc.
    module      VARCHAR(50) NOT NULL,
    description TEXT
);

CREATE TABLE auth_role_permissions (
    role_id       UUID REFERENCES auth_roles(id),
    permission_id UUID REFERENCES auth_permissions(id),
    PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE auth_refresh_tokens (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID REFERENCES auth_users(id) ON DELETE CASCADE,
    token       VARCHAR(500) UNIQUE NOT NULL,
    expires_at  TIMESTAMP NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ═══════════════════════════════════════════════════════
-- PATIENT MODULE
-- ═══════════════════════════════════════════════════════
CREATE TABLE patient_patients (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code_patient    VARCHAR(20) UNIQUE NOT NULL,
    nom             VARCHAR(100) NOT NULL,
    prenom          VARCHAR(100) NOT NULL,
    date_naissance  DATE NOT NULL,
    sexe            VARCHAR(1) CHECK (sexe IN ('M', 'F', 'O')),
    email           VARCHAR(255),
    telephone       VARCHAR(20),
    adresse         TEXT,
    photo_url       VARCHAR(500),
    is_active       BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by      UUID REFERENCES auth_users(id)
);

CREATE INDEX idx_patient_code ON patient_patients(code_patient);
CREATE INDEX idx_patient_name ON patient_patients(nom, prenom);
CREATE INDEX idx_patient_search ON patient_patients USING gin(
    (nom || ' ' || prenom) gin_trgm_ops
);

CREATE TABLE patient_medical_history (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id      UUID UNIQUE REFERENCES patient_patients(id) ON DELETE CASCADE,
    allergies       TEXT[],
    medications     TEXT[],
    conditions      TEXT[],
    family_history  JSONB,
    risk_factors    JSONB,
    notes           TEXT,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE patient_documents (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id      UUID REFERENCES patient_patients(id) ON DELETE CASCADE,
    type            VARCHAR(50) NOT NULL,  -- identity, insurance, consent, medical, photo
    file_name       VARCHAR(255) NOT NULL,
    file_path       VARCHAR(500) NOT NULL,
    mime_type       VARCHAR(100),
    file_size       BIGINT,
    description     TEXT,
    uploaded_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    uploaded_by     UUID REFERENCES auth_users(id)
);

CREATE TABLE patient_payment_plans (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id      UUID REFERENCES patient_patients(id),
    total_amount    DECIMAL(10,2) NOT NULL,
    paid_amount     DECIMAL(10,2) DEFAULT 0,
    frequency       VARCHAR(20) NOT NULL,  -- monthly, bimonthly, weekly
    start_date      DATE NOT NULL,
    end_date        DATE,
    status          VARCHAR(20) DEFAULT 'active',
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ═══════════════════════════════════════════════════════
-- APPOINTMENT MODULE
-- ═══════════════════════════════════════════════════════
CREATE TABLE appointment_appointments (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id      UUID REFERENCES patient_patients(id),
    practitioner_id UUID REFERENCES auth_users(id),
    date_time       TIMESTAMP NOT NULL,
    duration_min    INT NOT NULL DEFAULT 30,
    type            VARCHAR(50) NOT NULL,
    status          VARCHAR(20) DEFAULT 'scheduled',
    notes           TEXT,
    room            VARCHAR(50),
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by      UUID REFERENCES auth_users(id)
);

CREATE INDEX idx_appointment_date ON appointment_appointments(date_time);
CREATE INDEX idx_appointment_patient ON appointment_appointments(patient_id, date_time DESC);
CREATE INDEX idx_appointment_practitioner ON appointment_appointments(practitioner_id, date_time);
CREATE INDEX idx_appointment_status ON appointment_appointments(status) WHERE status IN ('scheduled', 'confirmed');

-- ═══════════════════════════════════════════════════════
-- DIAGNOSTIC MODULE (see EXAMEN_CLINIQUE_DATABASE_DESIGN.md for full ERD)
-- ═══════════════════════════════════════════════════════
-- Tables: diagnostic_examen_clinique, diagnostic_examen_section,
--         diagnostic_reponse_examen, diagnostic_examen_dentaire,
--         diagnostic_mesure_cephalometrique, diagnostic_section_template,
--         diagnostic_question_template, diagnostic_question_group

-- ═══════════════════════════════════════════════════════
-- TREATMENT MODULE
-- ═══════════════════════════════════════════════════════
CREATE TABLE treatment_plans (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id          UUID REFERENCES patient_patients(id),
    practitioner_id     UUID REFERENCES auth_users(id),
    title               VARCHAR(255) NOT NULL,
    description         TEXT,
    status              VARCHAR(20) DEFAULT 'proposed',
    estimated_duration  INT,  -- months
    estimated_cost      DECIMAL(10,2),
    start_date          DATE,
    end_date            DATE,
    ai_generated        BOOLEAN DEFAULT FALSE,
    ai_confidence       DECIMAL(5,2),
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE treatment_phases (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id         UUID REFERENCES treatment_plans(id) ON DELETE CASCADE,
    name            VARCHAR(100) NOT NULL,
    description     TEXT,
    order_index     INT NOT NULL,
    status          VARCHAR(20) DEFAULT 'pending',
    start_date      DATE,
    end_date        DATE,
    objectives      JSONB
);

CREATE TABLE treatment_evaluations (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id         UUID REFERENCES treatment_plans(id),
    evaluator_id    UUID REFERENCES auth_users(id),
    date            TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    rating          INT CHECK (rating BETWEEN 1 AND 5),
    progress_pct    INT CHECK (progress_pct BETWEEN 0 AND 100),
    observations    TEXT,
    measurements    JSONB,
    photos          TEXT[]  -- array of photo URLs
);

CREATE TABLE treatment_notes (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id         UUID REFERENCES treatment_plans(id),
    author_id       UUID REFERENCES auth_users(id),
    content         TEXT NOT NULL,
    type            VARCHAR(50),  -- observation, adjustment, milestone
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ═══════════════════════════════════════════════════════
-- ADMINISTRATION MODULE
-- ═══════════════════════════════════════════════════════
CREATE TABLE admin_invoices (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    number          VARCHAR(20) UNIQUE NOT NULL,
    patient_id      UUID REFERENCES patient_patients(id),
    practitioner_id UUID REFERENCES auth_users(id),
    date            DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date        DATE,
    subtotal        DECIMAL(10,2) NOT NULL,
    tax_amount      DECIMAL(10,2) DEFAULT 0,
    total           DECIMAL(10,2) NOT NULL,
    paid_amount     DECIMAL(10,2) DEFAULT 0,
    status          VARCHAR(20) DEFAULT 'draft',
    notes           TEXT,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admin_invoice_lines (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id      UUID REFERENCES admin_invoices(id) ON DELETE CASCADE,
    description     VARCHAR(255) NOT NULL,
    code_acte       VARCHAR(20),
    quantity        INT DEFAULT 1,
    unit_price      DECIMAL(10,2) NOT NULL,
    total           DECIMAL(10,2) NOT NULL,
    order_index     INT
);

CREATE TABLE admin_payments (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id      UUID REFERENCES admin_invoices(id),
    patient_id      UUID REFERENCES patient_patients(id),
    amount          DECIMAL(10,2) NOT NULL,
    method          VARCHAR(20) NOT NULL,  -- cash, card, transfer, check, online
    reference       VARCHAR(100),
    date            TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status          VARCHAR(20) DEFAULT 'completed',
    created_by      UUID REFERENCES auth_users(id)
);

CREATE TABLE admin_devis (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference       VARCHAR(20) UNIQUE NOT NULL,
    patient_id      UUID REFERENCES patient_patients(id),
    practitioner_id UUID REFERENCES auth_users(id),
    treatment_desc  TEXT,
    total           DECIMAL(10,2) NOT NULL,
    status          VARCHAR(20) DEFAULT 'draft',
    valid_until     DATE,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admin_fse (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id      UUID REFERENCES admin_invoices(id),
    patient_id      UUID REFERENCES patient_patients(id),
    numero_fse      VARCHAR(50),
    status          VARCHAR(20) DEFAULT 'created',
    transmitted_at  TIMESTAMP,
    reimbursed_at   TIMESTAMP,
    amount_claimed  DECIMAL(10,2),
    amount_reimbursed DECIMAL(10,2),
    rejection_reason TEXT,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ═══════════════════════════════════════════════════════
-- HR MODULE
-- ═══════════════════════════════════════════════════════
CREATE TABLE hr_staff (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID REFERENCES auth_users(id),
    employee_code   VARCHAR(20) UNIQUE NOT NULL,
    department      VARCHAR(50),
    position        VARCHAR(100),
    hire_date       DATE NOT NULL,
    salary          DECIMAL(10,2),
    contract_type   VARCHAR(20),  -- CDI, CDD, stage
    is_active       BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE hr_contracts (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    staff_id        UUID REFERENCES hr_staff(id),
    type            VARCHAR(20) NOT NULL,
    start_date      DATE NOT NULL,
    end_date        DATE,
    salary          DECIMAL(10,2),
    document_url    VARCHAR(500),
    status          VARCHAR(20) DEFAULT 'active',
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE hr_vacation_requests (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    staff_id        UUID REFERENCES hr_staff(id),
    type            VARCHAR(30) NOT NULL,  -- conge_paye, maladie, sans_solde
    start_date      DATE NOT NULL,
    end_date        DATE NOT NULL,
    days_count      DECIMAL(4,1) NOT NULL,
    reason          TEXT,
    status          VARCHAR(20) DEFAULT 'pending',
    approved_by     UUID REFERENCES auth_users(id),
    approved_at     TIMESTAMP,
    rejection_reason TEXT,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE hr_vacation_balances (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    staff_id        UUID REFERENCES hr_staff(id),
    year            INT NOT NULL,
    entitled_days   DECIMAL(4,1) NOT NULL,
    used_days       DECIMAL(4,1) DEFAULT 0,
    remaining_days  DECIMAL(4,1) GENERATED ALWAYS AS (entitled_days - used_days) STORED,
    UNIQUE(staff_id, year)
);

CREATE TABLE hr_evaluations (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    staff_id        UUID REFERENCES hr_staff(id),
    evaluator_id    UUID REFERENCES auth_users(id),
    period          VARCHAR(20),  -- 2025-Q1, 2025-annual
    overall_rating  INT CHECK (overall_rating BETWEEN 1 AND 5),
    criteria        JSONB,
    strengths       TEXT,
    improvements    TEXT,
    goals           JSONB,
    status          VARCHAR(20) DEFAULT 'draft',
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ═══════════════════════════════════════════════════════
-- STOCK MODULE
-- ═══════════════════════════════════════════════════════
CREATE TABLE stock_materials (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(200) NOT NULL,
    sku             VARCHAR(50) UNIQUE,
    category        VARCHAR(50),
    unit            VARCHAR(20),
    current_qty     DECIMAL(10,2) DEFAULT 0,
    min_qty         DECIMAL(10,2) DEFAULT 0,
    max_qty         DECIMAL(10,2),
    unit_price      DECIMAL(10,2),
    supplier        VARCHAR(200),
    location        VARCHAR(100),
    expiry_date     DATE,
    is_active       BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE stock_movements (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    material_id     UUID REFERENCES stock_materials(id),
    type            VARCHAR(20) NOT NULL,  -- in, out, adjustment, return
    quantity        DECIMAL(10,2) NOT NULL,
    reference       VARCHAR(100),
    notes           TEXT,
    performed_by    UUID REFERENCES auth_users(id),
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE stock_orders (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number    VARCHAR(20) UNIQUE NOT NULL,
    supplier        VARCHAR(200) NOT NULL,
    status          VARCHAR(20) DEFAULT 'draft',
    total_amount    DECIMAL(10,2),
    order_date      DATE,
    expected_date   DATE,
    received_date   DATE,
    notes           TEXT,
    created_by      UUID REFERENCES auth_users(id),
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ═══════════════════════════════════════════════════════
-- AI MODULE
-- ═══════════════════════════════════════════════════════
CREATE TABLE ai_analyses (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id      UUID REFERENCES patient_patients(id),
    requested_by    UUID REFERENCES auth_users(id),
    type            VARCHAR(50) NOT NULL,  -- ml_classification, image_analysis, problem_detection
    status          VARCHAR(20) DEFAULT 'pending',
    input_data      JSONB,
    results         JSONB,
    confidence      DECIMAL(5,2),
    processing_time INT,  -- milliseconds
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at    TIMESTAMP
);

CREATE TABLE ai_recommendations (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    analysis_id     UUID REFERENCES ai_analyses(id),
    patient_id      UUID REFERENCES patient_patients(id),
    type            VARCHAR(50),
    title           VARCHAR(255),
    description     TEXT,
    confidence      DECIMAL(5,2),
    priority        VARCHAR(10),
    details         JSONB,
    status          VARCHAR(20) DEFAULT 'pending',  -- pending, applied, rejected
    applied_by      UUID REFERENCES auth_users(id),
    applied_at      TIMESTAMP,
    feedback        JSONB,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ═══════════════════════════════════════════════════════
-- AUDIT MODULE
-- ═══════════════════════════════════════════════════════
CREATE TABLE audit_logs (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID REFERENCES auth_users(id),
    action          VARCHAR(50) NOT NULL,
    entity_type     VARCHAR(50),
    entity_id       UUID,
    old_values      JSONB,
    new_values      JSONB,
    ip_address      VARCHAR(45),
    user_agent      TEXT,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_user ON audit_logs(user_id, created_at DESC);
CREATE INDEX idx_audit_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_action ON audit_logs(action, created_at DESC);

-- Partition audit logs by month for performance
CREATE TABLE audit_logs_partitioned (
    LIKE audit_logs INCLUDING ALL
) PARTITION BY RANGE (created_at);
```

### 5.3 Indexing Strategy

| Table | Index | Type | Purpose |
|-------|-------|------|---------|
| patient_patients | `(nom, prenom)` | B-tree | Name search |
| patient_patients | `(nom \|\| ' ' \|\| prenom)` | GIN (trigram) | Fuzzy search |
| appointment_appointments | `(practitioner_id, date_time)` | B-tree | Calendar queries |
| appointment_appointments | `(status) WHERE status IN (...)` | Partial | Active appointments |
| diagnostic_examen_section | `answers_snapshot` | GIN (JSONB) | JSON queries |
| admin_invoices | `(patient_id, date DESC)` | Composite | Patient invoices |
| audit_logs | `(created_at)` | B-tree | Time-range queries |
| stock_materials | `(current_qty) WHERE current_qty < min_qty` | Partial | Low stock alerts |

### 5.4 Database Migration Strategy (Flyway)

```
V1__create_auth_tables.sql          ← Users, roles, permissions
V2__create_patient_tables.sql       ← Patients, medical history, documents
V3__create_appointment_tables.sql   ← Appointments, reminders
V4__create_diagnostic_tables.sql    ← Examens, sections, templates, questions
V5__create_treatment_tables.sql     ← Plans, phases, evaluations, notes
V6__create_admin_tables.sql         ← Invoices, payments, devis, FSE
V7__create_hr_tables.sql            ← Staff, contracts, vacations, evaluations
V8__create_stock_tables.sql         ← Materials, movements, orders
V9__create_comm_tables.sql          ← Messages, notifications, templates
V10__create_ai_tables.sql           ← Analyses, recommendations
V11__create_audit_tables.sql        ← Audit logs (partitioned)
V12__seed_roles_permissions.sql     ← Default roles and permissions
V13__seed_diagnostic_templates.sql  ← Section/question templates for examen clinique
V14__seed_notification_templates.sql ← Default notification templates
```

---

## 6. Découpage en Vertical Slices par Module

### 6.1 Inventaire Complet des Slices

| Module | Slice | HTTP Method | Endpoint | Description |
|--------|-------|-------------|----------|-------------|
| **Auth** | Login | POST | `/api/v1/auth/login` | Authentification |
| | Refresh Token | POST | `/api/v1/auth/refresh` | Renouveler token |
| | Logout | POST | `/api/v1/auth/logout` | Déconnexion |
| | Change Password | PUT | `/api/v1/auth/password` | Changer mot de passe |
| **Patients** | Create Patient | POST | `/api/v1/patients` | Créer patient |
| | Get Patient | GET | `/api/v1/patients/{id}` | Détail patient |
| | List Patients | GET | `/api/v1/patients` | Liste paginée |
| | Update Patient | PUT | `/api/v1/patients/{id}` | Modifier patient |
| | Delete Patient | DELETE | `/api/v1/patients/{id}` | Supprimer patient |
| | Upload Document | POST | `/api/v1/patients/{id}/documents` | Upload document |
| | Upload Photo | POST | `/api/v1/patients/{id}/photos` | Upload photo |
| | Send Notification | POST | `/api/v1/patients/{id}/notifications` | Envoyer notification |
| | Manage Payment Plan | POST/PUT | `/api/v1/patients/{id}/payment-plans` | Plan de paiement |
| **Appointments** | Create Appointment | POST | `/api/v1/appointments` | Créer RDV |
| | Get Appointment | GET | `/api/v1/appointments/{id}` | Détail RDV |
| | List Appointments | GET | `/api/v1/appointments` | Calendrier |
| | Update Appointment | PUT | `/api/v1/appointments/{id}` | Modifier RDV |
| | Cancel Appointment | PUT | `/api/v1/appointments/{id}/cancel` | Annuler RDV |
| | Confirm Appointment | PUT | `/api/v1/appointments/{id}/confirm` | Confirmer RDV |
| | Check Availability | GET | `/api/v1/appointments/availability` | Vérifier dispo |
| **Diagnostics** | Create Examen | POST | `/api/v1/examens` | Créer examen |
| | Get Examen | GET | `/api/v1/examens/{id}` | Détail examen |
| | List Examens | GET | `/api/v1/examens?patient_id=X` | Liste examens |
| | Update Examen | PUT | `/api/v1/examens/{id}` | Modifier examen |
| | Validate Examen | PUT | `/api/v1/examens/{id}/validate` | Valider examen |
| | Analyze Image | POST | `/api/v1/diagnostics/analyze-image` | Analyse IA image |
| **Treatments** | Create Treatment | POST | `/api/v1/treatments` | Créer plan |
| | Get Treatment | GET | `/api/v1/treatments/{id}` | Détail plan |
| | List Treatments | GET | `/api/v1/treatments` | Liste plans |
| | Track Evolution | POST | `/api/v1/treatments/{id}/evaluations` | Ajouter évaluation |
| | Add Note | POST | `/api/v1/treatments/{id}/notes` | Ajouter note |
| | Generate Report | POST | `/api/v1/treatments/{id}/reports` | Générer rapport |
| **AI Tools** | Run ML Analysis | POST | `/api/v1/ai/analyze` | Lancer analyse ML |
| | Get Recommendations | GET | `/api/v1/ai/recommendations?patient_id=X` | Recommandations |
| | Apply Recommendation | POST | `/api/v1/ai/recommendations/{id}/apply` | Appliquer reco |
| | Detect Problems | GET | `/api/v1/ai/problems?patient_id=X` | Détection problèmes |
| | Optimize Schedule | POST | `/api/v1/ai/schedule/optimize` | Optimiser planning |
| **Administration** | Create Invoice | POST | `/api/v1/invoices` | Créer facture |
| | List Invoices | GET | `/api/v1/invoices` | Liste factures |
| | Create Devis | POST | `/api/v1/devis` | Créer devis |
| | Create FSE | POST | `/api/v1/fse` | Créer FSE |
| | Process Payment | POST | `/api/v1/payments` | Enregistrer paiement |
| | Create Payment Link | POST | `/api/v1/payments/links` | Lien de paiement |
| | Financial Dashboard | GET | `/api/v1/dashboard/financial` | Stats financières |
| **HR** | Create Staff | POST | `/api/v1/hr/staff` | Créer employé |
| | List Staff | GET | `/api/v1/hr/staff` | Annuaire |
| | Request Vacation | POST | `/api/v1/hr/vacations` | Demande congé |
| | Approve Vacation | PUT | `/api/v1/hr/vacations/{id}/approve` | Approuver congé |
| | Get Balance | GET | `/api/v1/hr/vacations/balance` | Solde congés |
| | Create Evaluation | POST | `/api/v1/hr/evaluations` | Créer évaluation |
| | Create Contract | POST | `/api/v1/hr/contracts` | Créer contrat |
| **Stock** | Add Material | POST | `/api/v1/stock/materials` | Ajouter matériau |
| | List Materials | GET | `/api/v1/stock/materials` | Inventaire |
| | Record Movement | POST | `/api/v1/stock/movements` | Mouvement stock |
| | Get Alerts | GET | `/api/v1/stock/alerts` | Alertes stock bas |
| | Generate Order | POST | `/api/v1/stock/orders` | Bon de commande |
| **Users** | Create User | POST | `/api/v1/users` | Créer utilisateur |
| | List Users | GET | `/api/v1/users` | Liste utilisateurs |
| | Manage Permissions | PUT | `/api/v1/users/{id}/permissions` | Gérer permissions |
| | Get Activity Logs | GET | `/api/v1/audit/logs` | Logs d'activité |
| **Dashboard** | Get Stats | GET | `/api/v1/dashboard/stats` | Statistiques |
| | Get Activity | GET | `/api/v1/dashboard/activity` | Activité récente |

**Total : ~60+ vertical slices**

---

## 7. Architecture API REST

### 7.1 Conventions API

```
Base URL:  https://api.healthpilot.com/api/v1

Headers:
  Authorization: Bearer <JWT_TOKEN>
  Content-Type: application/json
  Accept-Language: fr|en|ar
  X-Request-Id: <UUID>  (for tracing)

Pagination:
  GET /api/v1/patients?page=0&size=20&sort=nom,asc

Filtering:
  GET /api/v1/patients?search=Martin&status=active&insurance=CPAM

Response Format:
  {
    "content": [...],
    "page": { "number": 0, "size": 20, "totalElements": 150, "totalPages": 8 }
  }

Error Format:
  {
    "timestamp": "2026-02-14T10:30:00Z",
    "status": 400,
    "error": "Bad Request",
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      { "field": "email", "message": "Format email invalide" }
    ],
    "traceId": "abc-123-def"
  }
```

### 7.2 API Versioning

```
/api/v1/patients     ← Current version
/api/v2/patients     ← Future breaking changes

Strategy: URL path versioning
Deprecation: 6-month notice with Sunset header
```

---

## 8. Sécurité & Authentification

### 8.1 Architecture de Sécurité

```
┌─────────────────────────────────────────────────────────────┐
│                    Security Layers                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Layer 1: Network                                           │
│  ├── TLS 1.3 (HTTPS only)                                  │
│  ├── WAF (Azure Web Application Firewall)                   │
│  ├── DDoS Protection                                        │
│  └── IP Whitelisting (admin endpoints)                      │
│                                                              │
│  Layer 2: API Gateway                                       │
│  ├── Rate Limiting (100 req/min per user)                   │
│  ├── Request Size Limits (10MB max)                         │
│  ├── CORS Configuration                                     │
│  └── Request Validation                                     │
│                                                              │
│  Layer 3: Authentication                                    │
│  ├── JWT (Access Token: 15min, Refresh Token: 7 days)       │
│  ├── BCrypt Password Hashing (strength: 12)                 │
│  ├── 2FA (TOTP - Google Authenticator)                      │
│  └── Account Lockout (5 failed attempts → 30min lock)       │
│                                                              │
│  Layer 4: Authorization                                     │
│  ├── RBAC (Role-Based Access Control)                       │
│  ├── @PreAuthorize annotations per endpoint                 │
│  ├── Row-Level Security (patients by practitioner)          │
│  └── Field-Level Security (salary visible to HR only)       │
│                                                              │
│  Layer 5: Data Protection                                   │
│  ├── AES-256 encryption at rest (PostgreSQL TDE)            │
│  ├── Column-level encryption (SSN, medical data)            │
│  ├── Data masking in logs                                   │
│  └── Automatic PII detection                                │
│                                                              │
│  Layer 6: Audit                                             │
│  ├── Complete audit trail (all CRUD operations)             │
│  ├── Login/logout tracking                                  │
│  ├── Data access logging                                    │
│  └── RGPD compliance reports                                │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 8.2 RBAC — Matrice des Permissions

| Module | Admin | Praticien | Secrétaire | Assistant | Manager |
|--------|:-----:|:---------:|:----------:|:---------:|:-------:|
| Dashboard | ✅ | ✅ | ✅ | ✅ | ✅ |
| Patients (CRUD) | ✅ | ✅ | ✅ | 👁️ | 👁️ |
| Rendez-vous | ✅ | ✅ | ✅ | 👁️ | 👁️ |
| Diagnostics | ✅ | ✅ | ❌ | 👁️ | ❌ |
| Examen Clinique | ✅ | ✅ | ❌ | ❌ | ❌ |
| Traitements | ✅ | ✅ | 👁️ | 👁️ | 👁️ |
| Outils IA | ✅ | ✅ | ❌ | ❌ | ❌ |
| Facturation | ✅ | 👁️ | ✅ | ❌ | ✅ |
| Mutuelles/FSE | ✅ | 👁️ | ✅ | ❌ | ✅ |
| Paiements | ✅ | ❌ | ✅ | ❌ | ✅ |
| Stock | ✅ | 👁️ | ✅ | ❌ | ✅ |
| RH | ✅ | ❌ | ❌ | ❌ | ✅ |
| Utilisateurs | ✅ | ❌ | ❌ | ❌ | ❌ |
| Imagerie | ✅ | ✅ | ❌ | 👁️ | ❌ |
| Paramètres | ✅ | 🔧 | 🔧 | 🔧 | 🔧 |

✅ = Full access · 👁️ = Read only · 🔧 = Own profile only · ❌ = No access

---

## 9. Architecture IA & Machine Learning

### 9.1 Service IA (FastAPI)

```
healthpilot-ai/
├── app/
│   ├── main.py                     # FastAPI app
│   ├── config.py
│   ├── models/
│   │   ├── case_classifier.py      # Classification Classe I/II/III
│   │   ├── complexity_evaluator.py # Évaluation complexité
│   │   ├── duration_predictor.py   # Prédiction durée
│   │   ├── image_analyzer.py       # Analyse d'images (caries, anomalies)
│   │   └── problem_detector.py     # Détection de problèmes
│   ├── services/
│   │   ├── analysis_service.py
│   │   ├── recommendation_service.py
│   │   └── optimization_service.py
│   ├── api/
│   │   ├── analyze.py              # POST /analyze
│   │   ├── recommend.py            # POST /recommend
│   │   └── detect.py               # POST /detect
│   └── utils/
│       ├── preprocessing.py
│       └── postprocessing.py
├── models/                          # Trained model files (.onnx, .h5)
├── data/                            # Training data
├── tests/
├── Dockerfile
└── requirements.txt
```

### 9.2 Communication Spring Boot ↔ AI Service

```java
// Spring Boot side — AI Client
@Service
@RequiredArgsConstructor
public class AIServiceClient {

    private final WebClient aiWebClient;

    public Mono<AnalysisResult> analyzeCase(AnalysisRequest request) {
        return aiWebClient.post()
            .uri("/analyze")
            .bodyValue(request)
            .retrieve()
            .bodyToMono(AnalysisResult.class)
            .timeout(Duration.ofSeconds(30))
            .retryWhen(Retry.backoff(3, Duration.ofSeconds(1)));
    }
}
```

---

## 10. Gestion des Fichiers & Imagerie

### 10.1 Object Storage (MinIO)

```
MinIO Buckets:
├── patient-documents/     # Carte identité, carte vitale, consentements
│   └── {patient_id}/{document_id}/{filename}
├── patient-photos/        # Photos intra-orales, extra-orales
│   └── {patient_id}/{photo_id}/{filename}
├── medical-images/        # Radiographies, DICOM
│   └── {patient_id}/{image_id}/{filename}
├── treatment-photos/      # Photos de progression
│   └── {treatment_id}/{photo_id}/{filename}
├── hr-documents/          # Contrats, évaluations
│   └── {staff_id}/{document_id}/{filename}
└── exports/               # Rapports PDF générés
    └── {user_id}/{export_id}/{filename}
```

### 10.2 Upload Flow

```
Angular → Spring Boot → MinIO
  1. Angular sends file via multipart/form-data
  2. Spring Boot validates (type, size, virus scan)
  3. Spring Boot uploads to MinIO
  4. Spring Boot stores metadata in PostgreSQL
  5. Returns presigned URL for frontend display
```

---

## 11. Internationalisation (i18n)

### 11.1 Frontend (Angular)

```typescript
// ngx-translate configuration
// Supported: fr (default), en, ar (RTL)

// assets/i18n/fr.json
{
  "navigation": {
    "dashboard": "Tableau de bord",
    "patients": "Patients",
    "appointments": "Rendez-vous"
  },
  "patients": {
    "create": "Nouveau patient",
    "search": "Rechercher un patient..."
  }
}
```

### 11.2 Backend (Spring Boot)

```yaml
# messages_fr.properties, messages_en.properties, messages_ar.properties
# Used for validation messages and error responses

patient.not.found=Patient non trouvé
patient.duplicate=Un patient avec ces informations existe déjà
appointment.conflict=Ce créneau est déjà occupé
```

---

## 12. Tests & Qualité

### 12.1 Stratégie de Tests

| Type | Outil | Couverture Cible | Scope |
|------|-------|------------------|-------|
| **Unit Tests** | JUnit 5 + Mockito | 80% | Handlers, Services |
| **Integration Tests** | Spring Boot Test + Testcontainers | 70% | Slices end-to-end |
| **API Tests** | REST Assured | 100% endpoints | Controllers |
| **Frontend Unit** | Jest + Angular Testing Library | 70% | Components, Services |
| **Frontend E2E** | Cypress | Critical paths | User journeys |
| **Performance** | JMeter / Gatling | Key endpoints | Load testing |
| **Security** | OWASP ZAP | All endpoints | Vulnerability scan |

### 12.2 Test d'un Vertical Slice

```java
// Unit Test — Handler
@ExtendWith(MockitoExtension.class)
class CreatePatientHandlerTest {
    @Mock PatientRepository patientRepository;
    @Mock PatientCodeGenerator codeGenerator;
    @Mock EventPublisher eventPublisher;
    @InjectMocks CreatePatientHandler handler;

    @Test
    void should_create_patient_successfully() {
        // Given
        var request = new CreatePatientRequest();
        request.setNom("Martin");
        request.setPrenom("Sophie");
        request.setDateNaissance(LocalDate.of(2010, 5, 15));

        when(codeGenerator.generate()).thenReturn("PAT-2026-0001");
        when(patientRepository.save(any())).thenAnswer(inv -> {
            Patient p = inv.getArgument(0);
            p.setId(UUID.randomUUID());
            return p;
        });

        // When
        var response = handler.handle(request);

        // Then
        assertThat(response.getCodePatient()).isEqualTo("PAT-2026-0001");
        assertThat(response.getNom()).isEqualTo("Martin");
        verify(eventPublisher).publish(any(PatientCreatedEvent.class));
    }

    @Test
    void should_throw_when_duplicate_patient() {
        // Given
        var request = new CreatePatientRequest();
        request.setNom("Martin");
        request.setPrenom("Sophie");
        request.setDateNaissance(LocalDate.of(2010, 5, 15));

        when(patientRepository.findByNomAndPrenomAndDateNaissance(any(), any(), any()))
            .thenReturn(Optional.of(new Patient()));

        // When/Then
        assertThatThrownBy(() -> handler.handle(request))
            .isInstanceOf(BusinessException.class)
            .hasMessageContaining("PATIENT_DUPLICATE");
    }
}

// Integration Test — Full Slice
@SpringBootTest
@AutoConfigureMockMvc
@Testcontainers
class CreatePatientControllerIT {
    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16");

    @Autowired MockMvc mockMvc;
    @Autowired ObjectMapper objectMapper;

    @Test
    @WithMockUser(roles = "RECEPTIONIST")
    void should_create_patient_via_api() throws Exception {
        var request = Map.of(
            "nom", "Martin",
            "prenom", "Sophie",
            "dateNaissance", "2010-05-15",
            "sexe", "F",
            "telephone", "+33612345678"
        );

        mockMvc.perform(post("/api/v1/patients")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.codePatient").isNotEmpty())
            .andExpect(jsonPath("$.nom").value("Martin"));
    }
}
```

---

## 13. Infrastructure & Déploiement

### 13.1 Architecture de Déploiement (Azure)

```
Azure Cloud
├── Azure Kubernetes Service (AKS)
│   ├── Namespace: healthpilot-prod
│   │   ├── Deployment: angular-frontend (2 replicas)
│   │   ├── Deployment: spring-boot-api (3 replicas)
│   │   ├── Deployment: fastapi-ai (2 replicas)
│   │   ├── Service: frontend-svc (ClusterIP)
│   │   ├── Service: api-svc (ClusterIP)
│   │   ├── Service: ai-svc (ClusterIP)
│   │   └── Ingress: healthpilot-ingress (NGINX)
│   └── Namespace: healthpilot-staging
│       └── (mirror of prod with fewer replicas)
│
├── Azure Database for PostgreSQL (Flexible Server)
│   ├── Primary (Zone 1)
│   └── Read Replica (Zone 2)
│
├── Azure Cache for Redis
│   └── Standard tier (6GB)
│
├── Azure Blob Storage (or MinIO on AKS)
│   └── Patient files, images, exports
│
├── Azure Container Registry
│   └── Docker images
│
├── Azure Key Vault
│   └── Secrets, certificates, API keys
│
├── Azure Monitor + Application Insights
│   └── Metrics, logs, traces
│
└── Azure DevOps / GitHub Actions
    └── CI/CD pipelines
```

### 13.2 CI/CD Pipeline

```yaml
# .github/workflows/main.yml (simplified)
name: HealthPilot CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  # Backend
  backend-test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with: { java-version: '21' }
      - run: ./mvnw verify

  # Frontend
  frontend-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci && npm run test -- --watch=false
      - run: npm run build -- --configuration=production

  # Deploy (on main only)
  deploy:
    needs: [backend-test, frontend-test]
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Build & push Docker images
      - name: Deploy to AKS
      - name: Run Flyway migrations
      - name: Health check
      - name: Notify team
```

---

## 14. Performance & Scalabilité

### 14.1 Objectifs de Performance

| Métrique | Objectif | Mesure |
|----------|----------|--------|
| Time to First Byte (TTFB) | < 200ms | API response |
| Largest Contentful Paint (LCP) | < 2.5s | Frontend load |
| API Response (P95) | < 500ms | All endpoints |
| API Response (P99) | < 1s | All endpoints |
| Concurrent Users | 200+ | Load test |
| Database Queries | < 50ms (P95) | Query monitoring |
| AI Analysis | < 30s | ML processing |

### 14.2 Stratégies de Performance

```
Frontend:
├── Lazy loading (all feature modules)
├── OnPush change detection
├── Virtual scrolling (large lists)
├── Image optimization (WebP, lazy load)
├── Service Worker (PWA caching)
└── Bundle size < 500KB (initial)

Backend:
├── Connection pooling (HikariCP, 20 connections)
├── Redis caching (dashboard stats: 5min TTL)
├── Pagination (max 50 items per page)
├── Async processing (AI analysis via RabbitMQ)
├── Database query optimization (EXPLAIN ANALYZE)
├── N+1 query prevention (EntityGraph, JOIN FETCH)
└── Response compression (gzip)

Database:
├── Read replicas for reporting queries
├── Partitioned tables (audit_logs by month)
├── Materialized views (dashboard aggregations)
├── Connection pooling (PgBouncer)
├── Vacuum and analyze scheduling
└── Index monitoring (pg_stat_user_indexes)
```

---

## 15. Monitoring & Observabilité

### 15.1 Stack de Monitoring

```
Metrics:    Micrometer → Prometheus → Grafana
Logs:       SLF4J/Logback → Elasticsearch → Kibana
Traces:     OpenTelemetry → Jaeger
Alerts:     Prometheus AlertManager → Slack/Email
Health:     Spring Boot Actuator → Kubernetes probes
```

### 15.2 Dashboards Grafana

| Dashboard | Métriques |
|-----------|-----------|
| API Overview | Request rate, error rate, latency P50/P95/P99 |
| Database | Query duration, connection pool, cache hit ratio |
| Business | Active patients, appointments today, revenue |
| AI Service | Analysis queue depth, processing time, confidence scores |
| Infrastructure | CPU, memory, disk, network per pod |

---

## 16. Conventions & Standards de Développement

### 16.1 Conventions de Nommage

| Élément | Convention | Exemple |
|---------|------------|---------|
| **Angular Component** | kebab-case | `patient-list.component.ts` |
| **Angular Service** | camelCase | `patientService` |
| **Java Class** | PascalCase | `CreatePatientHandler` |
| **Java Package** | lowercase | `com.healthpilot.features.patients` |
| **Database Table** | snake_case + prefix | `patient_patients` |
| **Database Column** | snake_case | `date_naissance` |
| **API Endpoint** | kebab-case | `/api/v1/payment-plans` |
| **Git Branch** | type/description | `feature/create-patient` |
| **Git Commit** | Conventional Commits | `feat(patients): add create patient endpoint` |

### 16.2 Code Review Checklist

- [ ] Slice is self-contained (no cross-feature dependencies)
- [ ] Request DTO has proper validation annotations
- [ ] Handler has unit tests (happy path + error cases)
- [ ] Controller has integration test
- [ ] Flyway migration is idempotent
- [ ] API documented with OpenAPI annotations
- [ ] Security annotations present (`@PreAuthorize`)
- [ ] Audit logging for data mutations
- [ ] Error handling follows global pattern
- [ ] No N+1 queries (check with Hibernate statistics)

### 16.3 Definition of Done

1. ✅ Code written and self-reviewed
2. ✅ Unit tests passing (≥80% coverage for handler)
3. ✅ Integration test passing
4. ✅ API documentation updated (Swagger)
5. ✅ Database migration tested
6. ✅ Code reviewed by peer
7. ✅ No SonarQube critical/blocker issues
8. ✅ Frontend component tested
9. ✅ Accessible (WCAG 2.1 AA)
10. ✅ Works in FR, EN, AR (RTL)

---

## 17. Annexes

### 17.1 Documents Connexes

| Document | Fichier | Description |
|----------|---------|-------------|
| Cahier des Charges | `docs/CAHIER_DES_CHARGES.md` | Exigences fonctionnelles |
| Features Documentation | `docs/FEATURES_DOCUMENTATION.md` | Spécifications détaillées |
| ERD Examen Clinique | `docs/EXAMEN_CLINIQUE_ERD.puml` | Diagramme entité-relation |
| Database Design | `docs/EXAMEN_CLINIQUE_DATABASE_DESIGN.md` | Design BDD examens |
| Sequence Diagrams | `docs/diagrams/SEQUENCE_DIAGRAMS.puml` | Diagrammes de séquence |
| Use Case Diagrams | `docs/diagrams/USE_CASE_DIAGRAMS.puml` | Cas d'utilisation |
| State Diagrams | `docs/diagrams/STATE_TRANSITION_DIAGRAMS.puml` | États-transitions |
| Activity Diagrams | `docs/diagrams/ACTIVITY_DIAGRAMS.puml` | Diagrammes d'activités |
| Azure Infrastructure | `docs/AZURE_INFRASTRUCTURE_GUIDE.md` | Guide infrastructure |
| Multi-Specialty Guide | `docs/MULTI_SPECIALTY_ARCHITECTURE_GUIDE.md` | Architecture multi-spécialité |

### 17.2 Dépendances Principales

#### Backend (pom.xml)
```xml
<dependencies>
    <!-- Spring Boot -->
    <dependency>spring-boot-starter-web</dependency>
    <dependency>spring-boot-starter-data-jpa</dependency>
    <dependency>spring-boot-starter-security</dependency>
    <dependency>spring-boot-starter-validation</dependency>
    <dependency>spring-boot-starter-cache</dependency>
    <dependency>spring-boot-starter-amqp</dependency>
    <dependency>spring-boot-starter-actuator</dependency>
    <dependency>spring-boot-starter-webflux</dependency>  <!-- WebClient for AI service -->

    <!-- Database -->
    <dependency>postgresql</dependency>
    <dependency>flyway-core</dependency>
    <dependency>flyway-database-postgresql</dependency>

    <!-- Cache -->
    <dependency>spring-boot-starter-data-redis</dependency>

    <!-- Security -->
    <dependency>jjwt-api</dependency>
    <dependency>jjwt-impl</dependency>

    <!-- Utilities -->
    <dependency>lombok</dependency>
    <dependency>mapstruct</dependency>

    <!-- Documentation -->
    <dependency>springdoc-openapi-starter-webmvc-ui</dependency>

    <!-- Monitoring -->
    <dependency>micrometer-registry-prometheus</dependency>
    <dependency>opentelemetry-api</dependency>

    <!-- Testing -->
    <dependency>spring-boot-starter-test</dependency>
    <dependency>spring-security-test</dependency>
    <dependency>testcontainers</dependency>
    <dependency>testcontainers-postgresql</dependency>
    <dependency>rest-assured</dependency>
</dependencies>
```

#### Frontend (package.json)
```json
{
  "dependencies": {
    "@angular/core": "^18.0.0",
    "@angular/router": "^18.0.0",
    "@angular/forms": "^18.0.0",
    "@angular/cdk": "^18.0.0",
    "@ngrx/signals": "^18.0.0",
    "@ngx-translate/core": "^15.0.0",
    "tailwindcss": "^3.4.0",
    "chart.js": "^4.4.0",
    "ng2-charts": "^6.0.0",
    "three": "^0.165.0",
    "fabric": "^6.0.0",
    "date-fns": "^3.0.0",
    "rxjs": "^7.8.0"
  },
  "devDependencies": {
    "@angular/cli": "^18.0.0",
    "cypress": "^13.0.0",
    "jest": "^29.0.0",
    "@testing-library/angular": "^15.0.0",
    "prettier": "^3.0.0",
    "eslint": "^9.0.0"
  }
}
```

### 17.3 Glossaire

| Terme | Définition |
|-------|------------|
| **Vertical Slice** | Unité de fonctionnalité traversant toutes les couches (UI → API → DB) |
| **CQRS** | Command Query Responsibility Segregation — séparation lecture/écriture |
| **FSE** | Feuille de Soins Électronique — formulaire de remboursement santé |
| **SESAM-Vitale** | Système de facturation électronique de l'assurance maladie française |
| **RGPD** | Règlement Général sur la Protection des Données |
| **JWT** | JSON Web Token — standard d'authentification |
| **RBAC** | Role-Based Access Control — contrôle d'accès par rôle |
| **ONNX** | Open Neural Network Exchange — format portable de modèles ML |
| **Flyway** | Outil de migration de base de données |
| **Testcontainers** | Bibliothèque pour tests d'intégration avec conteneurs Docker |

---

**Fin du Document d'Architecture**

*Ce document est vivant et sera mis à jour au fur et à mesure de l'évolution du projet.*

---

© 2026 HealthPilot — Document confidentiel
