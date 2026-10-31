# Display Modes & Layouts Guide
## Complete Catalog for JSON-Driven Angular Application

---

## 📋 Table of Contents

1. [Executive Summary](#executive-summary)
2. [Layout Categories](#layout-categories)
3. [Display Modes Catalog](#display-modes-catalog)
4. [Component Patterns](#component-patterns)
5. [JSON Configuration Examples](#json-configuration-examples)
6. [Responsive Behavior](#responsive-behavior)
7. [Implementation Recommendations](#implementation-recommendations)

---

## 1. Executive Summary

### 1.1 Overview

This document catalogs **ALL display modes, layouts, and UI patterns** found across your medical practice management application. Each pattern is designed to be configurable via JSON for your Angular implementation.

### 1.2 Total Patterns Identified

- **23 Primary Layout Patterns**
- **15 Display Modes**
- **12 Navigation Patterns**
- **18 Data Presentation Modes**
- **8 Form Layouts**
- **6 Modal/Overlay Patterns**

---

## 2. Layout Categories

### 2.1 Page-Level Layouts

```yaml
Categories:
  1. Dashboard Layouts
  2. List/Grid Layouts
  3. Detail/Master Layouts
  4. Form Layouts
  5. Calendar Layouts
  6. Tabbed Layouts
  7. Wizard/Stepper Layouts
  8. Split-View Layouts
```

---

## 3. Display Modes Catalog

### 3.1 DASHBOARD LAYOUTS

#### 3.1.1 **Grid Dashboard** (Primary Pattern)

**Used in:** Dashboard.tsx, FinancialDashboard.tsx, HRDashboard.tsx, AIDashboard.tsx

**Description:** Card-based grid layout with statistics and widgets

**JSON Configuration:**
```json
{
  "layoutType": "grid-dashboard",
  "gridColumns": 4,
  "gap": 24,
  "cards": [
    {
      "id": "total-patients",
      "type": "stat-card",
      "position": { "row": 1, "col": 1, "width": 1, "height": 1 },
      "config": {
        "title": "Total patients",
        "value": "248",
        "icon": "users",
        "gradient": "from-blue-500 to-cyan-500",
        "trend": { "value": "+12%", "direction": "up" }
      }
    }
  ]
}
```

**Key Features:**
- Responsive grid (1-4 columns)
- Stat cards with icons and gradients
- Trend indicators (up/down arrows)
- Animated counters
- Quick action buttons

**Variants:**
- **2-column grid** (mobile)
- **3-column grid** (tablet)
- **4-column grid** (desktop)

---

#### 3.1.2 **Hero Dashboard Header**

**Used in:** Dashboard.tsx, PatientManagement.tsx, Appointments.tsx

**Description:** Prominent header with welcome message, stats, and actions

**JSON Configuration:**
```json
{
  "layoutType": "hero-header",
  "gradient": "from-indigo-600 via-purple-600 to-pink-600",
  "content": {
    "icon": "sparkles",
    "title": "Bienvenue Dr. Dupont",
    "subtitle": "Voici ce qui se passe dans votre cabinet aujourd'hui",
    "rightWidget": {
      "type": "streak-counter",
      "days": 5
    }
  },
  "statsBar": {
    "layout": "grid",
    "columns": 2,
    "items": [
      {
        "title": "Rendez-vous complétés",
        "progress": 75,
        "current": 9,
        "target": 12
      }
    ]
  }
}
```

---

#### 3.1.3 **Quick Actions Panel**

**Used in:** Dashboard.tsx

**Description:** Grid of action cards with icons and descriptions

**JSON Configuration:**
```json
{
  "layoutType": "quick-actions",
  "background": "gradient-to-br from-gray-50 to-blue-50",
  "header": {
    "icon": "zap",
    "title": "Actions rapides",
    "subtitle": "Accès direct aux fonctionnalités principales"
  },
  "actions": [
    {
      "title": "Nouveau patient",
      "description": "Ajouter un nouveau patient",
      "icon": "user-plus",
      "gradient": "from-blue-500 to-cyan-500",
      "route": "/patients/new"
    }
  ]
}
```

---

### 3.2 LIST & TABLE LAYOUTS

#### 3.2.1 **Data Table with Filters**

**Used in:** PatientManagement.tsx, Appointments.tsx, Facturation.tsx

**Description:** Full-featured table with search, filters, and actions

**JSON Configuration:**
```json
{
  "layoutType": "data-table",
  "features": {
    "search": true,
    "filters": true,
    "sorting": true,
    "pagination": true,
    "rowSelection": "multiple",
    "exportable": true
  },
  "header": {
    "searchPlaceholder": "Rechercher des patients...",
    "filters": [
      {
        "type": "select",
        "label": "Statut",
        "options": ["all", "active", "inactive"]
      }
    ],
    "actions": [
      {
        "label": "Nouveau Patient",
        "icon": "user-plus",
        "primary": true
      }
    ]
  },
  "columns": [
    {
      "field": "name",
      "header": "Patient",
      "sortable": true,
      "cellType": "avatar-name",
      "width": "250px"
    },
    {
      "field": "contact",
      "header": "Contact",
      "cellType": "contact-info",
      "width": "200px"
    },
    {
      "field": "progress",
      "header": "Progression",
      "cellType": "progress-bar",
      "width": "150px"
    },
    {
      "field": "actions",
      "header": "Actions",
      "cellType": "action-buttons",
      "width": "150px",
      "pinned": "right"
    }
  ]
}
```

**Cell Types:**
- `avatar-name`: Avatar + name + subtitle
- `contact-info`: Phone + email with icons
- `progress-bar`: Animated progress bar with percentage
- `status-badge`: Colored badge with icon
- `action-buttons`: Icon buttons (view, edit, delete)
- `date`: Formatted date with calendar icon
- `currency`: Formatted currency with icon

---

#### 3.2.2 **Card List View**

**Used in:** Appointments.tsx (list mode), PatientManagement.tsx (detail cards)

**Description:** List of interactive cards with rich information

**JSON Configuration:**
```json
{
  "layoutType": "card-list",
  "itemLayout": "horizontal-card",
  "features": {
    "clickable": true,
    "hoverable": true,
    "expandable": false
  },
  "cardConfig": {
    "leftBorder": {
      "width": 2,
      "colorField": "color"
    },
    "avatar": {
      "type": "initials",
      "size": "large",
      "gradientField": "color"
    },
    "content": {
      "title": "{{patientName}}",
      "badges": [
        { "field": "type", "style": "colored" },
        { "field": "status", "style": "status" }
      ],
      "metadata": [
        { "icon": "clock", "field": "time" },
        { "icon": "user", "field": "doctor" },
        { "icon": "map-pin", "field": "room" }
      ]
    },
    "rightAction": {
      "icon": "arrow-right",
      "animation": "slide-right-on-hover"
    }
  }
}
```

---

#### 3.2.3 **Grid View (Cards)**

**Used in:** TreatmentPlans.tsx, Diagnostics components

**Description:** Grid of cards for visual browsing

**JSON Configuration:**
```json
{
  "layoutType": "card-grid",
  "columns": {
    "mobile": 1,
    "tablet": 2,
    "desktop": 3
  },
  "gap": 16,
  "cardConfig": {
    "type": "feature-card",
    "hoverable": true,
    "selectable": true,
    "selectedStyle": "border-purple-500",
    "content": {
      "icon": {
        "size": "large",
        "background": "gradient",
        "position": "top-left"
      },
      "title": "{{name}}",
      "badges": [
        { "field": "duration", "icon": "clock" },
        { "field": "cost", "icon": "dollar-sign" },
        { "field": "complexity", "style": "colored" }
      ],
      "footer": {
        "type": "selection-indicator"
      }
    }
  }
}
```

---

### 3.3 DETAIL/MASTER LAYOUTS

#### 3.3.1 **Split View (List + Detail)**

**Used in:** PatientManagement.tsx (when patient selected)

**Description:** List on left, detail panel on right (or full-screen detail)

**JSON Configuration:**
```json
{
  "layoutType": "split-view",
  "mode": "responsive",
  "breakpoint": 1024,
  "listPanel": {
    "width": "40%",
    "minWidth": "300px",
    "layout": "card-list"
  },
  "detailPanel": {
    "width": "60%",
    "layout": "detail-view",
    "mobileMode": "full-screen-overlay"
  }
}
```

---

#### 3.3.2 **Detail View with Sections**

**Used in:** PatientManagement.tsx (patient detail), TreatmentDetails.tsx

**Description:** Comprehensive detail view with multiple sections

**JSON Configuration:**
```json
{
  "layoutType": "detail-view",
  "sections": [
    {
      "type": "hero-header",
      "gradient": "from-blue-500 to-cyan-500",
      "content": {
        "avatar": { "size": "xl", "type": "initials" },
        "title": "{{patientName}}",
        "metadata": [
          { "icon": "user", "field": "age" },
          { "icon": "calendar", "field": "dateOfBirth" },
          { "icon": "activity", "field": "treatment" }
        ],
        "actions": [
          { "label": "Modifier", "icon": "edit" },
          { "label": "Fermer", "icon": "x" }
        ]
      },
      "progressBar": {
        "field": "progress",
        "label": "Progression du traitement"
      }
    },
    {
      "type": "info-grid",
      "columns": 2,
      "cards": [
        {
          "title": "Informations personnelles",
          "icon": "user",
          "gradient": "from-blue-50 to-cyan-50",
          "fields": [
            { "label": "Email", "field": "email", "icon": "mail" },
            { "label": "Téléphone", "field": "phone", "icon": "phone" },
            { "label": "Adresse", "field": "address", "icon": "map-pin" }
          ]
        },
        {
          "title": "Traitement",
          "icon": "activity",
          "gradient": "from-purple-50 to-pink-50",
          "fields": [
            { "label": "Type", "field": "treatment", "icon": "sparkles" },
            { "label": "Prochain RDV", "field": "nextAppointment", "icon": "calendar" }
          ]
        }
      ]
    },
    {
      "type": "action-bar",
      "actions": [
        { "label": "Nouveau rendez-vous", "icon": "calendar", "gradient": "from-blue-600 to-cyan-600" },
        { "label": "Ajouter un document", "icon": "file-text", "gradient": "from-purple-600 to-pink-600" },
        { "label": "Ajouter des photos", "icon": "camera", "gradient": "from-green-600 to-emerald-600" }
      ]
    }
  ]
}
```

---

#### 3.3.3 **Payment Plan Section**

**Used in:** PatientManagement.tsx (payment plan display)

**Description:** Detailed payment tracking with installments

**JSON Configuration:**
```json
{
  "layoutType": "payment-plan-section",
  "header": {
    "gradient": "from-green-500 to-emerald-500",
    "icon": "dollar-sign",
    "title": "Plan de paiement",
    "subtitle": "Suivi des paiements et échéances",
    "progressBar": {
      "field": "paymentProgress",
      "label": "{{paidAmount}} DT payés sur {{totalAmount}} DT"
    }
  },
  "summaryCards": {
    "layout": "grid",
    "columns": 3,
    "cards": [
      {
        "label": "Montant total",
        "field": "totalAmount",
        "icon": "dollar-sign",
        "gradient": "from-blue-50 to-cyan-50"
      },
      {
        "label": "Montant payé",
        "field": "paidAmount",
        "icon": "check-circle",
        "gradient": "from-green-50 to-emerald-50",
        "color": "green"
      },
      {
        "label": "Reste à payer",
        "field": "remainingAmount",
        "icon": "clock",
        "gradient": "from-orange-50 to-amber-50",
        "color": "orange"
      }
    ]
  },
  "installmentsList": {
    "type": "scrollable-list",
    "maxHeight": "400px",
    "itemLayout": "installment-row",
    "itemConfig": {
      "numberBadge": { "field": "id", "color": "status-based" },
      "title": "Tranche {{id}}",
      "status": { "field": "status", "type": "badge" },
      "metadata": [
        { "label": "Échéance", "field": "dueDate", "icon": "calendar" },
        { "label": "Payé le", "field": "paymentDate", "icon": "check-circle", "conditional": "status === 'paid'" }
      ],
      "amount": { "field": "amount", "format": "currency" },
      "action": {
        "type": "toggle-payment-status",
        "icon": "conditional"
      }
    }
  }
}
```

---

### 3.4 CALENDAR LAYOUTS

#### 3.4.1 **Full Calendar View**

**Used in:** Appointments.tsx (calendar mode)

**Description:** FullCalendar integration with custom event rendering

**JSON Configuration:**
```json
{
  "layoutType": "full-calendar",
  "library": "fullcalendar",
  "views": ["dayGridMonth", "timeGridWeek", "timeGridDay"],
  "defaultView": "timeGridWeek",
  "config": {
    "slotMinTime": "08:00:00",
    "slotMaxTime": "19:00:00",
    "slotDuration": "00:15:00",
    "allDaySlot": false,
    "nowIndicator": true,
    "selectable": true,
    "editable": false
  },
  "eventRendering": {
    "type": "custom",
    "template": {
      "statusIndicator": { "type": "dot", "colorField": "status" },
      "avatar": { "type": "initials", "size": "small" },
      "title": "{{patientName}}",
      "badge": { "field": "type", "style": "colored" }
    }
  },
  "styling": {
    "headerBackground": "gradient-to-r from-gray-50 to-gray-100",
    "todayBackground": "purple-50",
    "eventBorderRadius": "8px"
  }
}
```

---

#### 3.4.2 **Date Selector with Navigation**

**Used in:** Appointments.tsx (list mode)

**Description:** Date navigation with prev/next buttons

**JSON Configuration:**
```json
{
  "layoutType": "date-selector",
  "display": "horizontal",
  "features": {
    "prevNext": true,
    "dateDisplay": "full",
    "viewModeToggle": true
  },
  "config": {
    "icon": "calendar",
    "iconBackground": "gradient-to-br from-purple-500 to-pink-500",
    "dateFormat": {
      "primary": "d MMMM yyyy",
      "secondary": "EEEE"
    },
    "viewModes": [
      { "id": "list", "icon": "list" },
      { "id": "grid", "icon": "grid" }
    ]
  }
}
```

---

### 3.5 TABBED LAYOUTS

#### 3.5.1 **Horizontal Tabs**

**Used in:** Administration.tsx, AITools.tsx, TreatmentDetails.tsx

**Description:** Tab navigation with icon + label

**JSON Configuration:**
```json
{
  "layoutType": "horizontal-tabs",
  "style": "pills",
  "features": {
    "icons": true,
    "activeIndicator": "underline",
    "scrollable": true
  },
  "tabs": [
    {
      "id": "dashboard",
      "label": "Tableau de bord",
      "icon": "layout-dashboard",
      "iconGradient": "from-blue-500 to-indigo-600"
    },
    {
      "id": "facturation",
      "label": "Facturation",
      "icon": "file-text",
      "iconGradient": "from-purple-500 to-pink-600"
    }
  ],
  "styling": {
    "background": "gradient-to-r from-gray-50 to-gray-100",
    "activeBackground": "gradient-to-r from-blue-500 to-indigo-500",
    "activeTextColor": "white",
    "inactiveTextColor": "gray-600",
    "borderBottom": "2px solid gray-200",
    "activeIndicatorHeight": "4px"
  }
}
```

---

#### 3.5.2 **Tab Content Area**

**Description:** Content area for tabbed layouts

**JSON Configuration:**
```json
{
  "layoutType": "tab-content",
  "padding": 24,
  "background": "white",
  "borderRadius": "16px",
  "shadow": "lg",
  "animation": {
    "type": "fade",
    "duration": 300
  }
}
```

---

### 3.6 FORM LAYOUTS

#### 3.6.1 **Stepper/Wizard Form**

**Used in:** NouveauPatient.tsx, NouvelHonoraire.tsx

**Description:** Multi-step form with progress indicator

**JSON Configuration:**
```json
{
  "layoutType": "stepper-form",
  "orientation": "horizontal",
  "steps": [
    {
      "id": "personal-info",
      "label": "Informations personnelles",
      "icon": "user",
      "fields": [
        {
          "type": "input",
          "name": "firstName",
          "label": "Prénom",
          "required": true,
          "validation": "required"
        },
        {
          "type": "input",
          "name": "lastName",
          "label": "Nom",
          "required": true
        },
        {
          "type": "date",
          "name": "dateOfBirth",
          "label": "Date de naissance",
          "required": true
        }
      ]
    },
    {
      "id": "medical-info",
      "label": "Informations médicales",
      "icon": "heart-pulse",
      "fields": [
        {
          "type": "select",
          "name": "treatmentType",
          "label": "Type de traitement",
          "options": [
            { "value": "FIXED", "label": "Appareil fixe" },
            { "value": "INVISIBLE", "label": "Gouttières invisibles" }
          ]
        }
      ]
    }
  ],
  "navigation": {
    "showStepNumbers": true,
    "showLabels": true,
    "allowSkip": false,
    "buttons": {
      "previous": { "label": "Précédent", "style": "secondary" },
      "next": { "label": "Suivant", "style": "primary" },
      "submit": { "label": "Enregistrer", "icon": "save" }
    }
  }
}
```

---

#### 3.6.2 **Grid Form Layout**

**Used in:** NouvelHonoraire.tsx (patient selection + details)

**Description:** Form fields arranged in responsive grid

**JSON Configuration:**
```json
{
  "layoutType": "grid-form",
  "columns": {
    "mobile": 1,
    "tablet": 2,
    "desktop": 2
  },
  "gap": 24,
  "sections": [
    {
      "title": "Informations Patient",
      "icon": "user",
      "gradient": "from-blue-50 to-indigo-50",
      "fields": [
        {
          "type": "select",
          "name": "patient",
          "label": "Patient",
          "icon": "user",
          "span": 1
        },
        {
          "type": "input",
          "name": "practitioner",
          "label": "Praticien",
          "icon": "user",
          "span": 1
        }
      ]
    }
  ]
}
```

---

#### 3.6.3 **Table Form (Itemized)**

**Used in:** NouvelHonoraire.tsx (invoice items)

**Description:** Editable table for line items

**JSON Configuration:**
```json
{
  "layoutType": "table-form",
  "features": {
    "addRow": true,
    "removeRow": true,
    "reorderRows": false,
    "calculations": true
  },
  "columns": [
    {
      "field": "description",
      "header": "Description",
      "type": "textarea",
      "width": "40%",
      "required": true
    },
    {
      "field": "quantity",
      "header": "Qté",
      "type": "number",
      "width": "10%",
      "min": 1,
      "default": 1
    },
    {
      "field": "unitPrice",
      "header": "Prix unitaire",
      "type": "currency",
      "width": "20%",
      "required": true
    },
    {
      "field": "total",
      "header": "Total",
      "type": "calculated",
      "width": "20%",
      "formula": "quantity * unitPrice",
      "readonly": true
    },
    {
      "field": "actions",
      "header": "",
      "type": "actions",
      "width": "10%",
      "buttons": [
        { "icon": "trash", "action": "remove", "color": "red" }
      ]
    }
  ],
  "footer": {
    "type": "summary",
    "calculations": [
      { "label": "Sous-total", "field": "subtotal" },
      { "label": "TVA", "field": "tax" },
      { "label": "Total", "field": "total", "bold": true }
    ]
  }
}
```

---

### 3.7 MODAL/OVERLAY PATTERNS

#### 3.7.1 **Full-Screen Modal**

**Used in:** NouveauPatient.tsx, various creation forms

**Description:** Full-screen overlay with form content

**JSON Configuration:**
```json
{
  "layoutType": "full-screen-modal",
  "animation": {
    "enter": "fade-in",
    "exit": "fade-out",
    "duration": 300
  },
  "backdrop": {
    "color": "gray-900",
    "opacity": 0.75,
    "blur": true
  },
  "content": {
    "maxWidth": "4xl",
    "background": "white",
    "borderRadius": "24px",
    "shadow": "2xl",
    "padding": 0
  },
  "header": {
    "gradient": "from-purple-600 to-pink-600",
    "icon": "user-plus",
    "title": "Nouveau Patient",
    "closeButton": true
  }
}
```

---

#### 3.7.2 **Side Panel/Drawer**

**Used in:** Potential for filters, settings

**JSON Configuration:**
```json
{
  "layoutType": "side-panel",
  "position": "right",
  "width": "400px",
  "animation": {
    "enter": "slide-in-right",
    "exit": "slide-out-right",
    "duration": 300
  },
  "backdrop": true,
  "closeOnBackdropClick": true
}
```

---

#### 3.7.3 **Centered Modal**

**Used in:** Confirmation dialogs, small forms

**JSON Configuration:**
```json
{
  "layoutType": "centered-modal",
  "size": "md",
  "animation": {
    "enter": "scale-fade-in",
    "exit": "scale-fade-out"
  },
  "content": {
    "padding": 24,
    "borderRadius": "16px"
  }
}
```

---

### 3.8 SPECIALIZED LAYOUTS

#### 3.8.1 **Timeline View**

**Used in:** TreatmentDetails.tsx (timeline tab)

**Description:** Vertical timeline with events

**JSON Configuration:**
```json
{
  "layoutType": "timeline",
  "orientation": "vertical",
  "lineStyle": {
    "width": 2,
    "color": "gradient-to-b from-indigo-500 to-purple-500",
    "position": "left"
  },
  "events": [
    {
      "id": 1,
      "date": "01/06/2023",
      "title": "Début du traitement",
      "description": "Pose de l'appareil orthodontique fixe",
      "type": "start",
      "icon": "check-circle",
      "iconColor": "green-500"
    }
  ],
  "eventCard": {
    "background": "gradient-to-br from-gray-50 to-white",
    "border": "gray-200",
    "shadow": "md",
    "padding": 24,
    "borderRadius": "12px"
  },
  "iconNode": {
    "size": 64,
    "background": "white",
    "border": "4px solid indigo-500",
    "shadow": "lg"
  }
}
```

---

#### 3.8.2 **Comparison View (Before/After)**

**Used in:** TreatmentPlans.tsx (preview section)

**Description:** Side-by-side comparison layout

**JSON Configuration:**
```json
{
  "layoutType": "comparison-view",
  "orientation": "horizontal",
  "items": [
    {
      "label": "Avant",
      "type": "image-placeholder",
      "border": "purple-200"
    },
    {
      "label": "Après",
      "type": "image-placeholder",
      "border": "purple-200"
    }
  ],
  "separator": {
    "type": "arrow",
    "icon": "arrow-right"
  }
}
```

---

#### 3.8.3 **Pros/Cons Layout**

**Used in:** TreatmentPlans.tsx (advantages/disadvantages)

**Description:** Two-column layout for pros and cons

**JSON Configuration:**
```json
{
  "layoutType": "pros-cons",
  "columns": 2,
  "sections": [
    {
      "type": "pros",
      "title": "Avantages",
      "icon": "check-circle",
      "iconColor": "green-500",
      "gradient": "from-green-50 to-emerald-50",
      "itemIcon": "check",
      "itemIconColor": "green-500"
    },
    {
      "type": "cons",
      "title": "Inconvénients",
      "icon": "alert-circle",
      "iconColor": "red-500",
      "gradient": "from-red-50 to-orange-50",
      "itemIcon": "arrow-right",
      "itemIconColor": "red-500"
    }
  ]
}
```

---

#### 3.8.4 **Photo Gallery Grid**

**Used in:** TreatmentDetails.tsx (photos tab)

**Description:** Responsive grid of images/placeholders

**JSON Configuration:**
```json
{
  "layoutType": "photo-gallery",
  "columns": {
    "mobile": 2,
    "tablet": 3,
    "desktop": 4
  },
  "gap": 16,
  "itemConfig": {
    "aspectRatio": "1:1",
    "borderRadius": "12px",
    "border": "2px solid gray-300",
    "placeholder": {
      "icon": "image",
      "iconSize": "large",
      "background": "gradient-to-br from-gray-200 to-gray-300"
    },
    "hover": {
      "scale": 1.05,
      "shadow": "lg"
    }
  },
  "addButton": {
    "position": "top-right",
    "label": "Ajouter des photos",
    "icon": "plus"
  }
}
```

---

#### 3.8.5 **Collapsible Sections / Accordion**

**Used in:** Various detail views

**JSON Configuration:**
```json
{
  "layoutType": "accordion",
  "allowMultiple": false,
  "sections": [
    {
      "id": "personal-info",
      "title": "Informations personnelles",
      "icon": "user",
      "defaultExpanded": true,
      "content": {
        "type": "field-list",
        "fields": []
      }
    }
  ],
  "styling": {
    "headerBackground": "gray-50",
    "headerPadding": 16,
    "contentPadding": 24,
    "border": "gray-200"
  }
}
```

---

### 3.9 NAVIGATION PATTERNS

#### 3.9.1 **Sidebar Navigation**

**Used in:** Sidebar.tsx

**Description:** Vertical sidebar with icons and labels

**JSON Configuration:**
```json
{
  "layoutType": "sidebar-navigation",
  "position": "left",
  "width": "280px",
  "collapsible": true,
  "logo": {
    "text": "SmartOrtho",
    "icon": "sparkles",
    "gradient": "from-purple-600 to-pink-600"
  },
  "items": [
    {
      "id": "dashboard",
      "label": "Tableau de bord",
      "icon": "layout-dashboard",
      "route": "/dashboard",
      "badge": null
    },
    {
      "id": "patients",
      "label": "Patients",
      "icon": "users",
      "route": "/patients",
      "badge": { "value": 248, "color": "blue" }
    }
  ],
  "footer": {
    "type": "user-profile",
    "showSettings": true
  }
}
```

---

#### 3.9.2 **Top Header Navigation**

**Used in:** Header.tsx

**Description:** Horizontal header with search and actions

**JSON Configuration:**
```json
{
  "layoutType": "top-header",
  "height": "64px",
  "background": "white",
  "border": "bottom",
  "sections": {
    "left": {
      "type": "search",
      "placeholder": "Rechercher",
      "width": "400px"
    },
    "right": {
      "items": [
        { "type": "language-selector" },
        { "type": "theme-toggle" },
        { "type": "notifications", "badge": true },
        { "type": "user-menu" }
      ]
    }
  }
}
```

---

#### 3.9.3 **Breadcrumb Navigation**

**Description:** Hierarchical navigation path

**JSON Configuration:**
```json
{
  "layoutType": "breadcrumb",
  "separator": "/",
  "items": [
    { "label": "Accueil", "route": "/" },
    { "label": "Patients", "route": "/patients" },
    { "label": "Sophie Martin", "route": null }
  ],
  "styling": {
    "activeColor": "gray-900",
    "inactiveColor": "gray-500",
    "hoverColor": "gray-700"
  }
}
```

---

### 3.10 NOTIFICATION & ALERT PATTERNS

#### 3.10.1 **Alert Banner**

**Used in:** LowStockAlert.tsx, various warnings

**Description:** Prominent alert with action buttons

**JSON Configuration:**
```json
{
  "layoutType": "alert-banner",
  "type": "warning",
  "dismissible": true,
  "icon": "alert-triangle",
  "title": "Alerte stock faible",
  "message": "2 articles nécessitent un réapprovisionnement",
  "actions": [
    {
      "label": "Générer une commande",
      "style": "primary",
      "action": "generate-order"
    },
    {
      "label": "Ignorer",
      "style": "secondary",
      "action": "dismiss"
    }
  ],
  "styling": {
    "background": "gradient-to-r from-amber-50 to-orange-50",
    "border": "amber-200",
    "iconColor": "amber-500"
  }
}
```

---

#### 3.10.2 **Toast Notification**

**Description:** Temporary notification popup

**JSON Configuration:**
```json
{
  "layoutType": "toast",
  "position": "top-right",
  "duration": 5000,
  "type": "success",
  "title": "Patient enregistré",
  "message": "Le patient a été ajouté avec succès",
  "icon": "check-circle",
  "dismissible": true
}
```

---

#### 3.10.3 **Info Card**

**Used in:** TreatmentPlans.tsx (info section)

**Description:** Informational card with icon and content

**JSON Configuration:**
```json
{
  "layoutType": "info-card",
  "icon": "info",
  "iconBackground": "indigo-500",
  "gradient": "from-indigo-50 to-purple-50",
  "title": "À propos des plans de traitement",
  "content": "L'IA analyse les données du patient...",
  "stats": [
    {
      "icon": "award",
      "value": "100%",
      "label": "Personnalisés",
      "iconBackground": "indigo-100"
    }
  ]
}
```

---

### 3.11 WIDGET PATTERNS

#### 3.11.1 **Stat Card**

**Used in:** Dashboard.tsx, all stat displays

**Description:** Card displaying a single statistic

**JSON Configuration:**
```json
{
  "layoutType": "stat-card",
  "icon": "users",
  "iconGradient": "from-blue-500 to-cyan-500",
  "title": "Total patients",
  "value": "248",
  "trend": {
    "value": "+12%",
    "direction": "up",
    "label": "vs mois dernier"
  },
  "description": "Patients actifs",
  "styling": {
    "background": "white",
    "border": "gray-100",
    "shadow": "lg",
    "padding": 24,
    "borderRadius": "16px"
  }
}
```

---

#### 3.11.2 **Progress Card**

**Used in:** Dashboard.tsx (daily achievements)

**Description:** Card with progress bar and metrics

**JSON Configuration:**
```json
{
  "layoutType": "progress-card",
  "title": "Rendez-vous complétés",
  "icon": "check-circle",
  "progress": 75,
  "current": 9,
  "target": 12,
  "color": "green",
  "showPercentage": true,
  "showValues": true
}
```

---

#### 3.11.3 **Chart Card**

**Used in:** FinancialDashboard.tsx, various analytics

**Description:** Card containing a chart/graph

**JSON Configuration:**
```json
{
  "layoutType": "chart-card",
  "title": "Évolution mensuelle",
  "chartType": "line",
  "chartLibrary": "recharts",
  "data": [],
  "config": {
    "xAxis": { "dataKey": "month" },
    "yAxis": { "label": "Montant (DT)" },
    "series": [
      {
        "dataKey": "revenue",
        "stroke": "#3b82f6",
        "fill": "#3b82f6"
      }
    ]
  }
}
```

---

#### 3.11.4 **Badge Showcase**

**Used in:** Dashboard.tsx (gamification)

**Description:** Grid of achievement badges

**JSON Configuration:**
```json
{
  "layoutType": "badge-showcase",
  "columns": 4,
  "gap": 16,
  "badges": [
    {
      "id": "patient-care",
      "title": "Expert en soins patients",
      "icon": "heart",
      "unlocked": true,
      "color": "blue"
    },
    {
      "id": "perfect-attendance",
      "title": "Assiduité parfaite",
      "icon": "calendar-check",
      "unlocked": false,
      "color": "gray"
    }
  ],
  "badgeStyle": {
    "size": "large",
    "showTitle": true,
    "lockedOpacity": 0.3
  }
}
```

---

#### 3.11.5 **Level Progress**

**Used in:** Dashboard.tsx (doctor level)

**Description:** Gamification level display with XP bar

**JSON Configuration:**
```json
{
  "layoutType": "level-progress",
  "level": 8,
  "title": "Orthodontiste Expert",
  "currentXP": 350,
  "nextLevelXP": 500,
  "icon": "award",
  "styling": {
    "levelBadge": {
      "size": "xl",
      "gradient": "from-purple-500 to-pink-600"
    },
    "progressBar": {
      "height": 8,
      "gradient": "from-purple-500 to-pink-600",
      "background": "gray-200"
    }
  }
}
```

---

### 3.12 EMPTY STATES

#### 3.12.1 **Empty State with Action**

**Used in:** Various list views when empty

**Description:** Centered empty state with icon and CTA

**JSON Configuration:**
```json
{
  "layoutType": "empty-state",
  "icon": "users",
  "iconSize": "xl",
  "iconColor": "gray-400",
  "title": "Aucun patient trouvé",
  "message": "Commencez par ajouter votre premier patient",
  "action": {
    "label": "Nouveau patient",
    "icon": "plus",
    "style": "primary"
  }
}
```

---

### 3.13 LOADING STATES

#### 3.13.1 **Skeleton Loader**

**Description:** Placeholder content while loading

**JSON Configuration:**
```json
{
  "layoutType": "skeleton-loader",
  "type": "card-list",
  "count": 3,
  "animation": "pulse",
  "elements": [
    { "type": "circle", "size": 48 },
    { "type": "line", "width": "60%", "height": 16 },
    { "type": "line", "width": "40%", "height": 12 }
  ]
}
```

---

#### 3.13.2 **Spinner Overlay**

**Description:** Full-screen or inline loading spinner

**JSON Configuration:**
```json
{
  "layoutType": "spinner-overlay",
  "type": "full-screen",
  "spinner": {
    "type": "circular",
    "size": "large",
    "color": "purple-600"
  },
  "message": "Chargement en cours...",
  "backdrop": {
    "color": "white",
    "opacity": 0.8,
    "blur": true
  }
}
```

---

## 4. Component Patterns

### 4.1 Reusable UI Components

```yaml
Components Needed:
  1. Button (primary, secondary, ghost, icon-only)
  2. Input (text, number, email, password, search)
  3. Select (single, multi, searchable)
  4. Checkbox & Radio
  5. Date Picker
  6. Time Picker
  7. File Upload
  8. Avatar (image, initials, icon)
  9. Badge (status, count, colored)
  10. Progress Bar (linear, circular)
  11. Tooltip
  12. Dropdown Menu
  13. Modal (full-screen, centered, side-panel)
  14. Tabs (horizontal, vertical)
  15. Accordion
  16. Card (various styles)
  17. Alert/Banner
  18. Toast Notification
  19. Pagination
  20. Search Bar
  21. Filter Panel
  22. Action Menu (context menu)
  23. Breadcrumb
  24. Stepper
  25. Timeline
```

---

## 5. JSON Configuration Examples

### 5.1 Complete Page Configuration Example

```json
{
  "pageId": "patient-management",
  "pageType": "list-detail",
  "layout": {
    "type": "responsive-layout",
    "header": {
      "type": "hero-header",
      "gradient": "from-blue-600 via-indigo-600 to-purple-600",
      "content": {
        "icon": "users",
        "title": "Gestion des Patients",
        "subtitle": "Gérez vos patients et leurs traitements",
        "actions": [
          {
            "label": "Nouveau Patient",
            "icon": "user-plus",
            "action": "open-modal",
            "modalId": "new-patient-modal"
          }
        ]
      },
      "statsBar": {
        "columns": 3,
        "items": [
          {
            "label": "Total patients",
            "value": "{{totalPatients}}",
            "icon": "users"
          },
          {
            "label": "En traitement",
            "value": "{{activePatients}}",
            "icon": "activity"
          },
          {
            "label": "Progression moyenne",
            "value": "{{avgProgress}}%",
            "icon": "trending-up"
          }
        ]
      }
    },
    "filters": {
      "type": "filter-bar",
      "search": {
        "placeholder": "Rechercher des patients...",
        "fields": ["name", "email", "phone"]
      },
      "filters": [
        {
          "type": "select",
          "label": "Statut",
          "field": "status",
          "options": [
            { "value": "all", "label": "Tous" },
            { "value": "active", "label": "Actifs" },
            { "value": "inactive", "label": "Inactifs" }
          ]
        }
      ]
    },
    "content": {
      "type": "data-table",
      "dataSource": "patients",
      "columns": [
        {
          "field": "name",
          "header": "Patient",
          "cellType": "avatar-name",
          "sortable": true
        },
        {
          "field": "contact",
          "header": "Contact",
          "cellType": "contact-info"
        },
        {
          "field": "treatment",
          "header": "Traitement",
          "cellType": "text-with-badge"
        },
        {
          "field": "progress",
          "header": "Progression",
          "cellType": "progress-bar"
        },
        {
          "field": "actions",
          "header": "Actions",
          "cellType": "action-buttons",
          "pinned": "right"
        }
      ],
      "rowAction": {
        "type": "navigate",
        "route": "/patients/{{id}}"
      }
    }
  },
  "modals": [
    {
      "id": "new-patient-modal",
      "type": "full-screen-modal",
      "content": {
        "type": "stepper-form",
        "formId": "new-patient-form"
      }
    }
  ]
}
```

---

## 6. Responsive Behavior

### 6.1 Breakpoint Strategy

```yaml
Breakpoints:
  mobile: 0-640px
  tablet: 641-1024px
  desktop: 1025px+

Responsive Patterns:
  - Grid columns: 1 (mobile) → 2 (tablet) → 3-4 (desktop)
  - Sidebar: Hidden (mobile) → Collapsible (tablet) → Fixed (desktop)
  - Tables: Scroll (mobile) → Card view option (tablet) → Full table (desktop)
  - Modals: Full-screen (mobile) → Centered (tablet/desktop)
  - Navigation: Bottom bar (mobile) → Sidebar (desktop)
```

---

## 7. Implementation Recommendations

### 7.1 Priority Order for Implementation

```yaml
Phase 1 - Core Layouts (Weeks 1-2):
  1. Grid Dashboard
  2. Data Table with Filters
  3. Detail View with Sections
  4. Stepper Form
  5. Full-Screen Modal

Phase 2 - Navigation & Lists (Weeks 3-4):
  6. Sidebar Navigation
  7. Top Header
  8. Card List View
  9. Horizontal Tabs
  10. Breadcrumb

Phase 3 - Specialized Views (Weeks 5-6):
  11. Calendar View
  12. Timeline View
  13. Payment Plan Section
  14. Photo Gallery
  15. Comparison View

Phase 4 - Widgets & States (Weeks 7-8):
  16. Stat Cards
  17. Progress Cards
  18. Chart Cards
  19. Empty States
  20. Loading States
  21. Alert Banners
  22. Toast Notifications

Phase 5 - Advanced Features (Weeks 9-10):
  23. All remaining patterns
```

### 7.2 Angular Component Architecture

```typescript
// Recommended structure
@Component({
  selector: 'app-dynamic-layout',
  template: `
    <ng-container [ngSwitch]="config.layoutType">
      <app-grid-dashboard *ngSwitchCase="'grid-dashboard'" [config]="config"></app-grid-dashboard>
      <app-data-table *ngSwitchCase="'data-table'" [config]="config"></app-data-table>
      <app-detail-view *ngSwitchCase="'detail-view'" [config]="config"></app-detail-view>
      <!-- ... more cases ... -->
    </ng-container>
  `
})
export class DynamicLayoutComponent {
  @Input() config: LayoutConfig;
}
```

---

## 8. Summary

### 8.1 Complete Layout Inventory

**Total Patterns: 50+**

**By Category:**
- Dashboard Layouts: 3
- List/Table Layouts: 3
- Detail Views: 3
- Calendar Layouts: 2
- Tabbed Layouts: 2
- Form Layouts: 3
- Modal Patterns: 3
- Specialized Layouts: 5
- Navigation Patterns: 3
- Alert Patterns: 3
- Widget Patterns: 5
- Empty/Loading States: 2
- Component Patterns: 25+

### 8.2 Key Takeaways

1. **Consistency**: Most layouts follow similar patterns with different data
2. **Composability**: Complex layouts are built from simpler components
3. **Responsiveness**: All layouts must adapt to mobile/tablet/desktop
4. **Configurability**: Every aspect should be JSON-configurable
5. **Reusability**: Focus on creating flexible, reusable components

---

**Document Version**: 1.0.0  
**Last Updated**: 2024  
**Author**: Magic Patterns Architecture Team  
**Purpose**: Complete catalog for JSON-driven Angular implementation
