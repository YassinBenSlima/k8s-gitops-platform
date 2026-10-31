
# Typography Audit — Dental Practice Management App

> **Generated:** 2026-02-27  
> **Scope:** All visual components across all pages  
> **Stack:** React + TypeScript + Tailwind CSS  
> **Base font:** System UI / Inter (Tailwind default — no custom font-family overrides detected in `index.css` or `tailwind.config.js`)  
> **Color system:** Tailwind utility classes; dark-mode via `.dark` class (ThemeContext)

---

## Global Defaults (inherited by all components)

| Token | Value |
|---|---|
| Font Family | `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial` (Tailwind default) |
| Base font size | `16px` (`text-base`) |
| Base line-height | `1.5` |
| Base color (light) | `#111827` (`text-gray-900`) |
| Base color (dark) | `#F9FAFB` (`text-gray-100`) |
| Base bg (light) | `#F9FAFB` (`bg-gray-50`) |
| Base bg (dark) | `#111827` (`bg-gray-900`) |

---

## Layout Components

### `components/layout/Sidebar.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG (light) | BG (dark) |
|---|---|---|---|---|---|---|---|
| App title / logo text | `text-xl font-bold` | 20px | 700 | `#1D4ED8` (blue-700) | `#93C5FD` (blue-300) | — | — |
| Navigation group label | `text-xs font-semibold uppercase tracking-wider` | 12px | 600 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — | — |
| Nav item label (active) | `text-sm font-medium` | 14px | 500 | `#1D4ED8` (blue-700) | `#93C5FD` (blue-300) | `#EFF6FF` (blue-50) | `#1E3A5F` (blue-900/50) |
| Nav item label (inactive) | `text-sm font-medium` | 14px | 500 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — | — |
| Nav item label (hover) | `text-sm font-medium` | 14px | 500 | `#1D4ED8` (blue-700) | `#93C5FD` (blue-300) | `#F3F4F6` (gray-100) | `#1F2937` (gray-800) |
| Sidebar container | — | — | — | — | — | `#FFFFFF` (white) | `#1F2937` (gray-800) |
| Sidebar border | — | — | — | — | — | `#E5E7EB` (gray-200) | `#374151` (gray-700) |

---

### `components/layout/Header.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG (light) | BG (dark) |
|---|---|---|---|---|---|---|---|
| Page title | `text-xl font-semibold` | 20px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — | — |
| Breadcrumb / subtitle | `text-sm` | 14px | 400 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — | — |
| User name | `text-sm font-medium` | 14px | 500 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — | — |
| User role badge | `text-xs` | 12px | 400 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — | — |
| Notification count badge | `text-xs font-bold` | 12px | 700 | `#FFFFFF` | `#FFFFFF` | `#EF4444` (red-500) | `#EF4444` (red-500) |
| Header container | — | — | — | — | — | `#FFFFFF` (white) | `#1F2937` (gray-800) |
| Header border | — | — | — | — | — | `#E5E7EB` (gray-200) | `#374151` (gray-700) |

---

## Dashboard

### `pages/Dashboard.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Page heading | `text-2xl font-bold` | 24px | 700 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Section heading | `text-lg font-semibold` | 18px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Date/subtitle | `text-sm` | 14px | 400 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Quick action label | `text-sm font-medium` | 14px | 500 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Appointment row — patient name | `text-sm font-medium` | 14px | 500 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Appointment row — time | `text-sm` | 14px | 400 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Appointment row — type badge | `text-xs font-medium` | 12px | 500 | varies | varies | varies (colored pill) |
| Card container | — | — | — | — | — | `#FFFFFF` / `#1F2937` |

---

### `components/dashboard/StatsCard.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Stat label | `text-sm font-medium` | 14px | 500 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Stat value | `text-2xl font-bold` | 24px | 700 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Trend indicator (positive) | `text-sm font-medium` | 14px | 500 | `#10B981` (green-500) | `#34D399` (green-400) | — |
| Trend indicator (negative) | `text-sm font-medium` | 14px | 500 | `#EF4444` (red-500) | `#F87171` (red-400) | — |
| Trend label | `text-xs` | 12px | 400 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Card container | — | — | — | — | — | `#FFFFFF` / `#1F2937` |
| Icon container | — | — | — | — | — | colored (blue/green/purple/orange) bg-opacity-10 |

---

### `components/common/StatCard.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Title | `text-sm font-medium` | 14px | 500 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Value | `text-3xl font-bold` | 30px | 700 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Subtitle / change | `text-sm` | 14px | 400 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Card | — | — | — | — | — | `#FFFFFF` / `#1F2937` |

---

## Authentication

### `pages/Login.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| App name / logo text | `text-3xl font-bold` | 30px | 700 | `#1D4ED8` (blue-700) | `#93C5FD` (blue-300) | — |
| Page title | `text-2xl font-bold` | 24px | 700 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Subtitle | `text-sm` | 14px | 400 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Form label | `text-sm font-medium` | 14px | 500 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Input text | `text-sm` | 14px | 400 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | `#FFFFFF` / `#374151` |
| Input placeholder | `text-sm` | 14px | 400 | `#9CA3AF` (gray-400) | `#6B7280` (gray-500) | — |
| Input border | — | — | — | `#D1D5DB` (gray-300) | `#4B5563` (gray-600) | — |
| Submit button text | `text-sm font-medium` | 14px | 500 | `#FFFFFF` | `#FFFFFF` | `#2563EB` (blue-600) |
| Forgot password link | `text-sm` | 14px | 400 | `#2563EB` (blue-600) | `#60A5FA` (blue-400) | — |
| Error message | `text-sm` | 14px | 400 | `#EF4444` (red-500) | `#F87171` (red-400) | `#FEF2F2` (red-50) |
| Card container | — | — | — | — | — | `#FFFFFF` / `#1F2937` |
| Page background | — | — | — | — | — | `#F3F4F6` (gray-100) / `#111827` |

---

## Patient Management

### `pages/PatientManagement.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Page title | `text-2xl font-bold` | 24px | 700 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Tab label (active) | `text-sm font-medium` | 14px | 500 | `#2563EB` (blue-600) | `#60A5FA` (blue-400) | — |
| Tab label (inactive) | `text-sm font-medium` | 14px | 500 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Search input | `text-sm` | 14px | 400 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | `#FFFFFF` / `#374151` |
| Filter label | `text-sm` | 14px | 400 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Action button (primary) | `text-sm font-medium` | 14px | 500 | `#FFFFFF` | `#FFFFFF` | `#2563EB` (blue-600) |

---

### `components/patients/PatientList.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Table header cell | `text-xs font-semibold uppercase tracking-wider` | 12px | 600 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | `#F9FAFB` (gray-50) / `#374151` |
| Table row — patient name | `text-sm font-medium` | 14px | 500 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Table row — secondary info | `text-sm` | 14px | 400 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Table row — ID | `text-xs font-mono` | 12px | 400 | `#9CA3AF` (gray-400) | `#6B7280` (gray-500) | — |
| Status badge (active) | `text-xs font-medium` | 12px | 500 | `#065F46` (green-800) | `#A7F3D0` (green-200) | `#D1FAE5` (green-100) / `#064E3B` |
| Status badge (inactive) | `text-xs font-medium` | 12px | 500 | `#92400E` (yellow-800) | `#FDE68A` (yellow-200) | `#FEF3C7` (yellow-100) / `#78350F` |
| Row hover | — | — | — | — | — | `#F9FAFB` (gray-50) / `#374151` |
| Table border | — | — | — | `#E5E7EB` (gray-200) | `#374151` (gray-700) | — |
| Pagination text | `text-sm` | 14px | 400 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Pagination button (active) | `text-sm font-medium` | 14px | 500 | `#FFFFFF` | `#FFFFFF` | `#2563EB` (blue-600) |
| Action icon button | — | — | — | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |

---

### `components/patients/NouveauPatient.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Section title | `text-lg font-semibold` | 18px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Form label | `text-sm font-medium` | 14px | 500 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Input text | `text-sm` | 14px | 400 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | `#FFFFFF` / `#374151` |
| Input placeholder | `text-sm` | 14px | 400 | `#9CA3AF` (gray-400) | `#6B7280` (gray-500) | — |
| Select text | `text-sm` | 14px | 400 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | `#FFFFFF` / `#374151` |
| Textarea text | `text-sm` | 14px | 400 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | `#FFFFFF` / `#374151` |
| Required asterisk | — | — | — | `#EF4444` (red-500) | `#F87171` (red-400) | — |
| Validation error | `text-xs` | 12px | 400 | `#EF4444` (red-500) | `#F87171` (red-400) | — |
| Submit button | `text-sm font-medium` | 14px | 500 | `#FFFFFF` | `#FFFFFF` | `#2563EB` (blue-600) |
| Cancel button | `text-sm font-medium` | 14px | 500 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | `#FFFFFF` / `#374151` |
| Step indicator (active) | `text-sm font-semibold` | 14px | 600 | `#FFFFFF` | `#FFFFFF` | `#2563EB` (blue-600) |
| Step indicator (inactive) | `text-sm` | 14px | 400 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | `#E5E7EB` / `#374151` |
| Step label | `text-xs font-medium` | 12px | 500 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |

---

### `components/patients/PatientEdit.tsx`

> Same typography as `NouveauPatient.tsx` — form labels, inputs, selects, buttons follow identical patterns.

---

### `components/patients/EditPaymentPlanModal.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Modal title | `text-lg font-semibold` | 18px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Form label | `text-sm font-medium` | 14px | 500 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Input text | `text-sm` | 14px | 400 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | `#FFFFFF` / `#374151` |
| Amount value | `text-base font-semibold` | 16px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Installment row | `text-sm` | 14px | 400 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Status badge | `text-xs font-medium` | 12px | 500 | varies | varies | varies |
| Modal overlay | — | — | — | — | — | `rgba(0,0,0,0.5)` |
| Modal container | — | — | — | — | — | `#FFFFFF` / `#1F2937` |

---

### `components/patients/SendNotificationModal.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Modal title | `text-lg font-semibold` | 18px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Channel label | `text-sm font-medium` | 14px | 500 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Message textarea | `text-sm` | 14px | 400 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | `#FFFFFF` / `#374151` |
| Character count | `text-xs` | 12px | 400 | `#9CA3AF` (gray-400) | `#6B7280` (gray-500) | — |
| Send button | `text-sm font-medium` | 14px | 500 | `#FFFFFF` | `#FFFFFF` | `#2563EB` (blue-600) |

---

## Appointments

### `pages/Appointments.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Page title | `text-2xl font-bold` | 24px | 700 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Calendar day number | `text-sm font-medium` | 14px | 500 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Calendar day number (today) | `text-sm font-bold` | 14px | 700 | `#FFFFFF` | `#FFFFFF` | `#2563EB` (blue-600) |
| Calendar day number (other month) | `text-sm` | 14px | 400 | `#9CA3AF` (gray-400) | `#6B7280` (gray-500) | — |
| Calendar header (Mon/Tue…) | `text-xs font-semibold uppercase` | 12px | 600 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Month/year heading | `text-lg font-semibold` | 18px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| View toggle button (active) | `text-sm font-medium` | 14px | 500 | `#FFFFFF` | `#FFFFFF` | `#2563EB` (blue-600) |
| View toggle button (inactive) | `text-sm font-medium` | 14px | 500 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | `#FFFFFF` / `#374151` |

---

### `components/appointments/AppointmentList.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Table header | `text-xs font-semibold uppercase tracking-wider` | 12px | 600 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | `#F9FAFB` / `#374151` |
| Patient name | `text-sm font-medium` | 14px | 500 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Date/time | `text-sm` | 14px | 400 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Doctor name | `text-sm` | 14px | 400 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Status badge (confirmed) | `text-xs font-medium` | 12px | 500 | `#065F46` | `#A7F3D0` | `#D1FAE5` / `#064E3B` |
| Status badge (pending) | `text-xs font-medium` | 12px | 500 | `#92400E` | `#FDE68A` | `#FEF3C7` / `#78350F` |
| Status badge (cancelled) | `text-xs font-medium` | 12px | 500 | `#991B1B` | `#FCA5A5` | `#FEE2E2` / `#7F1D1D` |
| Type badge | `text-xs font-medium` | 12px | 500 | `#1E40AF` | `#BFDBFE` | `#DBEAFE` / `#1E3A8A` |

---

### `components/appointments/AppointmentCreate.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Modal/page title | `text-xl font-semibold` | 20px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Form label | `text-sm font-medium` | 14px | 500 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Input / select text | `text-sm` | 14px | 400 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | `#FFFFFF` / `#374151` |
| Time slot (available) | `text-sm font-medium` | 14px | 500 | `#1D4ED8` (blue-700) | `#93C5FD` (blue-300) | `#EFF6FF` / `#1E3A5F` |
| Time slot (unavailable) | `text-sm` | 14px | 400 | `#9CA3AF` (gray-400) | `#6B7280` (gray-500) | `#F3F4F6` / `#374151` |
| Time slot (selected) | `text-sm font-semibold` | 14px | 600 | `#FFFFFF` | `#FFFFFF` | `#2563EB` (blue-600) |
| Notes textarea | `text-sm` | 14px | 400 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | `#FFFFFF` / `#374151` |

---

### `components/appointments/AppointmentDetails.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Section title | `text-lg font-semibold` | 18px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Detail label | `text-sm font-medium` | 14px | 500 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Detail value | `text-sm` | 14px | 400 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Notes text | `text-sm` | 14px | 400 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | `#F9FAFB` / `#374151` |

---

## Administration

### `pages/Administration.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Page title | `text-2xl font-bold` | 24px | 700 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Tab label | `text-sm font-medium` | 14px | 500 | varies | varies | — |
| Summary card value | `text-2xl font-bold` | 24px | 700 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Summary card label | `text-sm` | 14px | 400 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |

---

### `components/administration/FinancialDashboard.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Section heading | `text-lg font-semibold` | 18px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| KPI value | `text-3xl font-bold` | 30px | 700 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| KPI label | `text-sm font-medium` | 14px | 500 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| KPI trend (positive) | `text-sm font-medium` | 14px | 500 | `#10B981` (green-500) | `#34D399` (green-400) | — |
| KPI trend (negative) | `text-sm font-medium` | 14px | 500 | `#EF4444` (red-500) | `#F87171` (red-400) | — |
| Chart axis label | `text-xs` | 12px | 400 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Chart legend | `text-xs font-medium` | 12px | 500 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Chart tooltip value | `text-sm font-semibold` | 14px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | `#FFFFFF` / `#1F2937` |
| Chart tooltip label | `text-xs` | 12px | 400 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Period selector button | `text-sm font-medium` | 14px | 500 | varies | varies | varies |

---

### `components/administration/common/FinancialChart.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Chart title | `text-base font-semibold` | 16px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Axis tick | `text-xs` | 12px | 400 | `#9CA3AF` (gray-400) | `#6B7280` (gray-500) | — |
| Tooltip header | `text-sm font-semibold` | 14px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | `#FFFFFF` / `#1F2937` |
| Tooltip value | `text-sm` | 14px | 400 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Legend item | `text-xs font-medium` | 12px | 500 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |

---

### `components/administration/common/InvoiceCard.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Invoice number | `text-sm font-semibold` | 14px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Patient name | `text-sm` | 14px | 400 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Amount | `text-lg font-bold` | 18px | 700 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Date | `text-xs` | 12px | 400 | `#9CA3AF` (gray-400) | `#6B7280` (gray-500) | — |
| Status badge (paid) | `text-xs font-medium` | 12px | 500 | `#065F46` | `#A7F3D0` | `#D1FAE5` / `#064E3B` |
| Status badge (pending) | `text-xs font-medium` | 12px | 500 | `#92400E` | `#FDE68A` | `#FEF3C7` / `#78350F` |
| Status badge (overdue) | `text-xs font-medium` | 12px | 500 | `#991B1B` | `#FCA5A5` | `#FEE2E2` / `#7F1D1D` |
| Card container | — | — | — | — | — | `#FFFFFF` / `#1F2937` |

---

### `components/administration/common/HonoraireCard.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Card title | `text-sm font-semibold` | 14px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Amount | `text-xl font-bold` | 20px | 700 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Label | `text-xs` | 12px | 400 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Card container | — | — | — | — | — | `#FFFFFF` / `#1F2937` |

---

### `components/administration/Facturation.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Section title | `text-lg font-semibold` | 18px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Table header | `text-xs font-semibold uppercase tracking-wider` | 12px | 600 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | `#F9FAFB` / `#374151` |
| Invoice row — ID | `text-sm font-mono` | 14px | 400 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Invoice row — patient | `text-sm font-medium` | 14px | 500 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Invoice row — amount | `text-sm font-semibold` | 14px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Invoice row — date | `text-sm` | 14px | 400 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Total row | `text-sm font-bold` | 14px | 700 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | `#F9FAFB` / `#374151` |

---

### `components/administration/Paiements.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Section title | `text-lg font-semibold` | 18px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Table header | `text-xs font-semibold uppercase tracking-wider` | 12px | 600 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | `#F9FAFB` / `#374151` |
| Payment row — patient | `text-sm font-medium` | 14px | 500 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Payment row — amount | `text-sm font-semibold` | 14px | 600 | `#10B981` (green-600) | `#34D399` (green-400) | — |
| Payment row — method | `text-sm` | 14px | 400 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Payment row — date | `text-sm` | 14px | 400 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Method badge | `text-xs font-medium` | 12px | 500 | varies | varies | varies |

---

### `components/administration/NouveauDevis.tsx` / `pages/NouveauDevis.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Page/modal title | `text-xl font-semibold` | 20px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Section heading | `text-base font-semibold` | 16px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Form label | `text-sm font-medium` | 14px | 500 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Input text | `text-sm` | 14px | 400 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | `#FFFFFF` / `#374151` |
| Line item — description | `text-sm` | 14px | 400 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Line item — amount | `text-sm font-semibold` | 14px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Total label | `text-base font-bold` | 16px | 700 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Total value | `text-xl font-bold` | 20px | 700 | `#2563EB` (blue-600) | `#60A5FA` (blue-400) | — |

---

### `components/administration/Mutuelles.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Section title | `text-lg font-semibold` | 18px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Table header | `text-xs font-semibold uppercase tracking-wider` | 12px | 600 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | `#F9FAFB` / `#374151` |
| Mutuelle name | `text-sm font-medium` | 14px | 500 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Coverage % | `text-sm font-semibold` | 14px | 600 | `#2563EB` (blue-600) | `#60A5FA` (blue-400) | — |
| Status badge | `text-xs font-medium` | 12px | 500 | varies | varies | varies |

---

### `components/administration/Rapports.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Section title | `text-lg font-semibold` | 18px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Report type label | `text-sm font-medium` | 14px | 500 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Date range input | `text-sm` | 14px | 400 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | `#FFFFFF` / `#374151` |
| Export button | `text-sm font-medium` | 14px | 500 | `#FFFFFF` | `#FFFFFF` | `#2563EB` (blue-600) |
| Summary stat value | `text-2xl font-bold` | 24px | 700 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Summary stat label | `text-sm` | 14px | 400 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |

---

### `components/administration/DevisReports.tsx`

> Same table/form typography as `Rapports.tsx` and `Facturation.tsx`.

---

### `components/administration/mutuelles/CouvertureDetails.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Title | `text-lg font-semibold` | 18px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Detail label | `text-sm font-medium` | 14px | 500 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Detail value | `text-sm` | 14px | 400 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Coverage bar label | `text-xs font-medium` | 12px | 500 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Coverage bar % | `text-xs font-bold` | 12px | 700 | `#FFFFFF` | `#FFFFFF` | `#2563EB` (blue-600) |

---

## Stock Management

### `pages/StockManagement.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Page title | `text-2xl font-bold` | 24px | 700 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Tab label | `text-sm font-medium` | 14px | 500 | varies | varies | — |
| Summary KPI value | `text-2xl font-bold` | 24px | 700 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Summary KPI label | `text-sm` | 14px | 400 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Alert count badge | `text-xs font-bold` | 12px | 700 | `#FFFFFF` | `#FFFFFF` | `#EF4444` (red-500) |

---

### `components/stock/MaterialList.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Table header | `text-xs font-semibold uppercase tracking-wider` | 12px | 600 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | `#F9FAFB` / `#374151` |
| Material name | `text-sm font-medium` | 14px | 500 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Category | `text-sm` | 14px | 400 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Quantity (normal) | `text-sm font-semibold` | 14px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Quantity (low stock) | `text-sm font-semibold` | 14px | 600 | `#EF4444` (red-500) | `#F87171` (red-400) | — |
| Unit price | `text-sm` | 14px | 400 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Supplier | `text-sm` | 14px | 400 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Stock status badge | `text-xs font-medium` | 12px | 500 | varies | varies | varies |
| Expiry date (normal) | `text-xs` | 12px | 400 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Expiry date (expiring soon) | `text-xs font-medium` | 12px | 500 | `#D97706` (amber-600) | `#FCD34D` (amber-300) | — |
| Expiry date (expired) | `text-xs font-medium` | 12px | 500 | `#EF4444` (red-500) | `#F87171` (red-400) | — |

---

### `components/stock/AddMaterial.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Page/modal title | `text-xl font-semibold` | 20px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Form label | `text-sm font-medium` | 14px | 500 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Input text | `text-sm` | 14px | 400 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | `#FFFFFF` / `#374151` |
| Select text | `text-sm` | 14px | 400 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | `#FFFFFF` / `#374151` |
| Validation error | `text-xs` | 12px | 400 | `#EF4444` (red-500) | `#F87171` (red-400) | — |

---

### `components/stock/EditMaterialModal.tsx`

> Same form typography as `AddMaterial.tsx`.

---

### `components/stock/StockMovement.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Section title | `text-lg font-semibold` | 18px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Table header | `text-xs font-semibold uppercase tracking-wider` | 12px | 600 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | `#F9FAFB` / `#374151` |
| Movement type (in) | `text-xs font-medium` | 12px | 500 | `#065F46` | `#A7F3D0` | `#D1FAE5` / `#064E3B` |
| Movement type (out) | `text-xs font-medium` | 12px | 500 | `#991B1B` | `#FCA5A5` | `#FEE2E2` / `#7F1D1D` |
| Quantity delta | `text-sm font-semibold` | 14px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Date | `text-sm` | 14px | 400 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Reason | `text-sm` | 14px | 400 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |

---

### `components/stock/LowStockAlert.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Alert title | `text-base font-semibold` | 16px | 600 | `#92400E` (amber-800) | `#FDE68A` (amber-200) | `#FEF3C7` (amber-50) / `#78350F` |
| Alert item name | `text-sm font-medium` | 14px | 500 | `#92400E` | `#FDE68A` | — |
| Alert item quantity | `text-sm` | 14px | 400 | `#B45309` (amber-700) | `#FCD34D` (amber-300) | — |
| Alert container | — | — | — | — | — | `#FFFBEB` (amber-50) / `#451A03` |

---

### `components/stock/StockHistoryModal.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Modal title | `text-lg font-semibold` | 18px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| History row — date | `text-xs` | 12px | 400 | `#9CA3AF` (gray-400) | `#6B7280` (gray-500) | — |
| History row — action | `text-sm` | 14px | 400 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| History row — quantity | `text-sm font-semibold` | 14px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |

---

### `components/stock/GenerateOrder.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Modal title | `text-lg font-semibold` | 18px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Item name | `text-sm font-medium` | 14px | 500 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Quantity input | `text-sm` | 14px | 400 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | `#FFFFFF` / `#374151` |
| Supplier label | `text-sm` | 14px | 400 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Total | `text-base font-bold` | 16px | 700 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |

---

### `pages/Fournisseurs.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Page title | `text-2xl font-bold` | 24px | 700 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Table header | `text-xs font-semibold uppercase tracking-wider` | 12px | 600 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | `#F9FAFB` / `#374151` |
| Supplier name | `text-sm font-medium` | 14px | 500 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Contact info | `text-sm` | 14px | 400 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Status badge | `text-xs font-medium` | 12px | 500 | varies | varies | varies |

---

## HR Management

### `pages/HRManagement.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Page title | `text-2xl font-bold` | 24px | 700 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Tab label | `text-sm font-medium` | 14px | 500 | varies | varies | — |

---

### `components/hr/HRDashboard.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| KPI value | `text-3xl font-bold` | 30px | 700 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| KPI label | `text-sm font-medium` | 14px | 500 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Section heading | `text-lg font-semibold` | 18px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Chart axis | `text-xs` | 12px | 400 | `#9CA3AF` (gray-400) | `#6B7280` (gray-500) | — |

---

### `components/hr/StaffDirectory.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Table header | `text-xs font-semibold uppercase tracking-wider` | 12px | 600 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | `#F9FAFB` / `#374151` |
| Staff name | `text-sm font-medium` | 14px | 500 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Role/position | `text-sm` | 14px | 400 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Department badge | `text-xs font-medium` | 12px | 500 | `#1E40AF` | `#BFDBFE` | `#DBEAFE` / `#1E3A8A` |
| Status badge | `text-xs font-medium` | 12px | 500 | varies | varies | varies |
| Contact info | `text-xs` | 12px | 400 | `#9CA3AF` (gray-400) | `#6B7280` (gray-500) | — |
| Avatar initials | `text-sm font-semibold` | 14px | 600 | `#FFFFFF` | `#FFFFFF` | colored bg |

---

### `components/hr/StaffProfile.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Staff name | `text-2xl font-bold` | 24px | 700 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Role | `text-base font-medium` | 16px | 500 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Section title | `text-lg font-semibold` | 18px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Detail label | `text-sm font-medium` | 14px | 500 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Detail value | `text-sm` | 14px | 400 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Skill badge | `text-xs font-medium` | 12px | 500 | `#1E40AF` | `#BFDBFE` | `#DBEAFE` / `#1E3A8A` |

---

### `components/hr/ContractManagement.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Section title | `text-lg font-semibold` | 18px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Table header | `text-xs font-semibold uppercase tracking-wider` | 12px | 600 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | `#F9FAFB` / `#374151` |
| Contract type | `text-sm font-medium` | 14px | 500 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Date range | `text-sm` | 14px | 400 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Status badge | `text-xs font-medium` | 12px | 500 | varies | varies | varies |

---

### `components/hr/PerformanceEvaluations.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Section title | `text-lg font-semibold` | 18px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Evaluation score | `text-3xl font-bold` | 30px | 700 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Score label | `text-sm` | 14px | 400 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Criteria label | `text-sm font-medium` | 14px | 500 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Rating bar label | `text-xs` | 12px | 400 | `#9CA3AF` (gray-400) | `#6B7280` (gray-500) | — |
| Comments text | `text-sm` | 14px | 400 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | `#F9FAFB` / `#374151` |

---

### `components/hr/VacationManagement.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Section title | `text-lg font-semibold` | 18px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Request row — name | `text-sm font-medium` | 14px | 500 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Request row — dates | `text-sm` | 14px | 400 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Status badge (approved) | `text-xs font-medium` | 12px | 500 | `#065F46` | `#A7F3D0` | `#D1FAE5` / `#064E3B` |
| Status badge (pending) | `text-xs font-medium` | 12px | 500 | `#92400E` | `#FDE68A` | `#FEF3C7` / `#78350F` |
| Status badge (rejected) | `text-xs font-medium` | 12px | 500 | `#991B1B` | `#FCA5A5` | `#FEE2E2` / `#7F1D1D` |

---

### `components/hr/VacationBalances.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Staff name | `text-sm font-medium` | 14px | 500 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Balance value | `text-2xl font-bold` | 24px | 700 | `#2563EB` (blue-600) | `#60A5FA` (blue-400) | — |
| Balance label | `text-xs` | 12px | 400 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Progress bar label | `text-xs font-medium` | 12px | 500 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |

---

## Diagnostics

### `pages/Diagnostics.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Page title | `text-2xl font-bold` | 24px | 700 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Tab label | `text-sm font-medium` | 14px | 500 | varies | varies | — |

---

### `components/diagnostics/DentalChart.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Section title | `text-lg font-semibold` | 18px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Tooth number | `text-xs font-bold` | 12px | 700 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Tooth status label | `text-xs` | 12px | 400 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Legend label | `text-xs font-medium` | 12px | 500 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Condition badge (healthy) | `text-xs font-medium` | 12px | 500 | `#065F46` | `#A7F3D0` | `#D1FAE5` / `#064E3B` |
| Condition badge (cavity) | `text-xs font-medium` | 12px | 500 | `#991B1B` | `#FCA5A5` | `#FEE2E2` / `#7F1D1D` |
| Condition badge (treated) | `text-xs font-medium` | 12px | 500 | `#1E40AF` | `#BFDBFE` | `#DBEAFE` / `#1E3A8A` |
| Quadrant label | `text-sm font-semibold` | 14px | 600 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |

---

### `components/diagnostics/TreatmentPlans.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Plan title | `text-base font-semibold` | 16px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Plan description | `text-sm` | 14px | 400 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Step number | `text-xs font-bold` | 12px | 700 | `#FFFFFF` | `#FFFFFF` | `#2563EB` (blue-600) |
| Step label | `text-sm font-medium` | 14px | 500 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Step status | `text-xs font-medium` | 12px | 500 | varies | varies | varies |
| Cost label | `text-sm font-semibold` | 14px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Duration label | `text-xs` | 12px | 400 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |

---

### `components/diagnostics/ImageAnalysis.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Section title | `text-lg font-semibold` | 18px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Analysis result label | `text-sm font-medium` | 14px | 500 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Confidence score | `text-sm font-bold` | 14px | 700 | `#2563EB` (blue-600) | `#60A5FA` (blue-400) | — |
| Finding description | `text-sm` | 14px | 400 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Severity badge (high) | `text-xs font-medium` | 12px | 500 | `#991B1B` | `#FCA5A5` | `#FEE2E2` / `#7F1D1D` |
| Severity badge (medium) | `text-xs font-medium` | 12px | 500 | `#92400E` | `#FDE68A` | `#FEF3C7` / `#78350F` |
| Severity badge (low) | `text-xs font-medium` | 12px | 500 | `#065F46` | `#A7F3D0` | `#D1FAE5` / `#064E3B` |

---

### `components/diagnostics/AnomalyDetection.tsx` / `components/diagnostics/common/AnomalyList.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Section title | `text-lg font-semibold` | 18px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Anomaly name | `text-sm font-medium` | 14px | 500 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Anomaly description | `text-sm` | 14px | 400 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Confidence % | `text-sm font-bold` | 14px | 700 | `#2563EB` (blue-600) | `#60A5FA` (blue-400) | — |
| Severity badge | `text-xs font-medium` | 12px | 500 | varies | varies | varies |

---

### `components/diagnostics/TreatmentDuration.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Duration value | `text-2xl font-bold` | 24px | 700 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Duration unit | `text-sm` | 14px | 400 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Phase label | `text-sm font-medium` | 14px | 500 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Timeline marker | `text-xs font-bold` | 12px | 700 | `#FFFFFF` | `#FFFFFF` | `#2563EB` (blue-600) |

---

## AI Tools

### `pages/AITools.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Page title | `text-2xl font-bold` | 24px | 700 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Tab label | `text-sm font-medium` | 14px | 500 | varies | varies | — |

---

### `components/ai-tools/AIDashboard.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Section title | `text-lg font-semibold` | 18px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| AI model name | `text-base font-semibold` | 16px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Accuracy metric | `text-3xl font-bold` | 30px | 700 | `#2563EB` (blue-600) | `#60A5FA` (blue-400) | — |
| Metric label | `text-sm` | 14px | 400 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Status badge (active) | `text-xs font-medium` | 12px | 500 | `#065F46` | `#A7F3D0` | `#D1FAE5` / `#064E3B` |
| Last updated | `text-xs` | 12px | 400 | `#9CA3AF` (gray-400) | `#6B7280` (gray-500) | — |

---

### `components/ai-tools/common/AIInsightCard.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Insight title | `text-sm font-semibold` | 14px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Insight description | `text-sm` | 14px | 400 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Confidence label | `text-xs font-medium` | 12px | 500 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Confidence value | `text-xs font-bold` | 12px | 700 | `#2563EB` (blue-600) | `#60A5FA` (blue-400) | — |
| Priority badge | `text-xs font-medium` | 12px | 500 | varies | varies | varies |
| Card container | — | — | — | — | — | `#FFFFFF` / `#1F2937` |

---

### `components/ai-tools/common/CaseAnalysisCard.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Patient name | `text-sm font-semibold` | 14px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Risk level badge | `text-xs font-bold` | 12px | 700 | varies | varies | varies |
| Analysis summary | `text-sm` | 14px | 400 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Score value | `text-2xl font-bold` | 24px | 700 | varies | varies | — |
| Score label | `text-xs` | 12px | 400 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |

---

### `components/ai-tools/TreatmentRecommendations.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Section title | `text-lg font-semibold` | 18px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Recommendation title | `text-sm font-semibold` | 14px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Recommendation body | `text-sm` | 14px | 400 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Confidence bar label | `text-xs font-medium` | 12px | 500 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Priority badge | `text-xs font-medium` | 12px | 500 | varies | varies | varies |

---

### `components/ai-tools/ProblemDetection.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Section title | `text-lg font-semibold` | 18px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Problem name | `text-sm font-semibold` | 14px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Problem description | `text-sm` | 14px | 400 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Severity badge | `text-xs font-medium` | 12px | 500 | varies | varies | varies |
| Detection date | `text-xs` | 12px | 400 | `#9CA3AF` (gray-400) | `#6B7280` (gray-500) | — |

---

### `components/ai-tools/ScheduleOptimization.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Section title | `text-lg font-semibold` | 18px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Slot time | `text-sm font-semibold` | 14px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Efficiency score | `text-2xl font-bold` | 24px | 700 | `#10B981` (green-500) | `#34D399` (green-400) | — |
| Suggestion text | `text-sm` | 14px | 400 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |

---

### `components/ai-tools/MLAnalysisEngine.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Engine title | `text-lg font-semibold` | 18px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Model name | `text-sm font-medium` | 14px | 500 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Accuracy % | `text-xl font-bold` | 20px | 700 | `#2563EB` (blue-600) | `#60A5FA` (blue-400) | — |
| Status indicator | `text-xs font-medium` | 12px | 500 | varies | varies | varies |
| Progress label | `text-xs` | 12px | 400 | `#9CA3AF` (gray-400) | `#6B7280` (gray-500) | — |

---

## Treatment Tracking

### `pages/TreatmentTracking.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Page title | `text-2xl font-bold` | 24px | 700 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Tab label | `text-sm font-medium` | 14px | 500 | varies | varies | — |

---

### `pages/TreatmentDetails.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Treatment name | `text-2xl font-bold` | 24px | 700 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Section title | `text-lg font-semibold` | 18px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Detail label | `text-sm font-medium` | 14px | 500 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Detail value | `text-sm` | 14px | 400 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Progress % | `text-sm font-bold` | 14px | 700 | `#2563EB` (blue-600) | `#60A5FA` (blue-400) | — |
| Notes text | `text-sm` | 14px | 400 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | `#F9FAFB` / `#374151` |

---

### `components/treatments/EvolutionTracking.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Section title | `text-lg font-semibold` | 18px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Measurement label | `text-sm font-medium` | 14px | 500 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Measurement value | `text-base font-bold` | 16px | 700 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Date label | `text-xs` | 12px | 400 | `#9CA3AF` (gray-400) | `#6B7280` (gray-500) | — |
| Chart axis | `text-xs` | 12px | 400 | `#9CA3AF` (gray-400) | `#6B7280` (gray-500) | — |

---

### `components/treatments/common/TimelineView.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Timeline event title | `text-sm font-semibold` | 14px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Timeline event date | `text-xs` | 12px | 400 | `#9CA3AF` (gray-400) | `#6B7280` (gray-500) | — |
| Timeline event description | `text-sm` | 14px | 400 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Timeline connector | — | — | — | `#E5E7EB` (gray-200) | `#374151` (gray-700) | — |
| Event dot | — | — | — | — | — | `#2563EB` (blue-600) |

---

### `components/treatments/NotificationManagement.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Section title | `text-lg font-semibold` | 18px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Notification title | `text-sm font-medium` | 14px | 500 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Notification body | `text-sm` | 14px | 400 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Schedule label | `text-xs font-medium` | 12px | 500 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Channel badge | `text-xs font-medium` | 12px | 500 | `#1E40AF` | `#BFDBFE` | `#DBEAFE` / `#1E3A8A` |

---

### `components/treatments/ReportGeneration.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Section title | `text-lg font-semibold` | 18px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Report type label | `text-sm font-medium` | 14px | 500 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Form label | `text-sm font-medium` | 14px | 500 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Input text | `text-sm` | 14px | 400 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | `#FFFFFF` / `#374151` |
| Generate button | `text-sm font-medium` | 14px | 500 | `#FFFFFF` | `#FFFFFF` | `#2563EB` (blue-600) |

---

## User Management

### `pages/UserManagement.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Page title | `text-2xl font-bold` | 24px | 700 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Tab label | `text-sm font-medium` | 14px | 500 | varies | varies | — |

---

### `components/users/UsersList.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Table header | `text-xs font-semibold uppercase tracking-wider` | 12px | 600 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | `#F9FAFB` / `#374151` |
| User name | `text-sm font-medium` | 14px | 500 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Email | `text-sm` | 14px | 400 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Role badge | `text-xs font-medium` | 12px | 500 | `#1E40AF` | `#BFDBFE` | `#DBEAFE` / `#1E3A8A` |
| Status badge | `text-xs font-medium` | 12px | 500 | varies | varies | varies |
| Last login | `text-xs` | 12px | 400 | `#9CA3AF` (gray-400) | `#6B7280` (gray-500) | — |

---

### `components/users/UserCreate.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Page/modal title | `text-xl font-semibold` | 20px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Section heading | `text-base font-semibold` | 16px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Form label | `text-sm font-medium` | 14px | 500 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Input text | `text-sm` | 14px | 400 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | `#FFFFFF` / `#374151` |
| Permission checkbox label | `text-sm` | 14px | 400 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Role select | `text-sm` | 14px | 400 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | `#FFFFFF` / `#374151` |

---

### `components/users/UserPermissions.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Section title | `text-lg font-semibold` | 18px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Permission group label | `text-sm font-semibold` | 14px | 600 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Permission item label | `text-sm` | 14px | 400 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Permission description | `text-xs` | 12px | 400 | `#9CA3AF` (gray-400) | `#6B7280` (gray-500) | — |
| Toggle label | `text-sm font-medium` | 14px | 500 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |

---

### `components/users/ActivityLogs.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Section title | `text-lg font-semibold` | 18px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Log entry — action | `text-sm font-medium` | 14px | 500 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Log entry — user | `text-sm` | 14px | 400 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Log entry — timestamp | `text-xs font-mono` | 12px | 400 | `#9CA3AF` (gray-400) | `#6B7280` (gray-500) | — |
| Log entry — IP | `text-xs font-mono` | 12px | 400 | `#9CA3AF` (gray-400) | `#6B7280` (gray-500) | — |
| Action type badge | `text-xs font-medium` | 12px | 500 | varies | varies | varies |

---

### `components/users/SecuritySettings.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Section title | `text-lg font-semibold` | 18px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Setting label | `text-sm font-medium` | 14px | 500 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Setting description | `text-xs` | 12px | 400 | `#9CA3AF` (gray-400) | `#6B7280` (gray-500) | — |
| Warning text | `text-sm` | 14px | 400 | `#92400E` (amber-800) | `#FDE68A` (amber-200) | `#FEF3C7` (amber-50) / `#78350F` |
| Input text | `text-sm` | 14px | 400 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | `#FFFFFF` / `#374151` |

---

## Settings & Profile

### `pages/Settings.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Page title | `text-2xl font-bold` | 24px | 700 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Section title | `text-lg font-semibold` | 18px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Setting label | `text-sm font-medium` | 14px | 500 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Setting description | `text-xs` | 12px | 400 | `#9CA3AF` (gray-400) | `#6B7280` (gray-500) | — |
| Input text | `text-sm` | 14px | 400 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | `#FFFFFF` / `#374151` |
| Select text | `text-sm` | 14px | 400 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | `#FFFFFF` / `#374151` |
| Toggle label | `text-sm font-medium` | 14px | 500 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Save button | `text-sm font-medium` | 14px | 500 | `#FFFFFF` | `#FFFFFF` | `#2563EB` (blue-600) |
| Danger zone text | `text-sm` | 14px | 400 | `#991B1B` (red-800) | `#FCA5A5` (red-300) | `#FEF2F2` (red-50) / `#7F1D1D` |
| Danger button | `text-sm font-medium` | 14px | 500 | `#FFFFFF` | `#FFFFFF` | `#EF4444` (red-500) |

---

### `pages/Profile.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| User name | `text-2xl font-bold` | 24px | 700 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| User role | `text-base font-medium` | 16px | 500 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Section title | `text-lg font-semibold` | 18px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Detail label | `text-sm font-medium` | 14px | 500 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Detail value | `text-sm` | 14px | 400 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Bio text | `text-sm` | 14px | 400 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | `#F9FAFB` / `#374151` |
| Avatar initials | `text-3xl font-bold` | 30px | 700 | `#FFFFFF` | `#FFFFFF` | `#2563EB` (blue-600) |
| Edit button | `text-sm font-medium` | 14px | 500 | `#FFFFFF` | `#FFFFFF` | `#2563EB` (blue-600) |

---

## Notifications & Communication

### `pages/Notifications.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Page title | `text-2xl font-bold` | 24px | 700 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Notification title (unread) | `text-sm font-semibold` | 14px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | `#EFF6FF` (blue-50) / `#1E3A5F` |
| Notification title (read) | `text-sm font-medium` | 14px | 500 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Notification body | `text-sm` | 14px | 400 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Timestamp | `text-xs` | 12px | 400 | `#9CA3AF` (gray-400) | `#6B7280` (gray-500) | — |
| Type badge | `text-xs font-medium` | 12px | 500 | varies | varies | varies |
| Unread dot | — | — | — | — | — | `#2563EB` (blue-600) |

---

### `pages/Communication.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Page title | `text-2xl font-bold` | 24px | 700 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Message sender | `text-sm font-semibold` | 14px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Message body | `text-sm` | 14px | 400 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Message timestamp | `text-xs` | 12px | 400 | `#9CA3AF` (gray-400) | `#6B7280` (gray-500) | — |
| Message bubble (sent) | `text-sm` | 14px | 400 | `#FFFFFF` | `#FFFFFF` | `#2563EB` (blue-600) |
| Message bubble (received) | `text-sm` | 14px | 400 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | `#F3F4F6` (gray-100) / `#374151` |
| Input placeholder | `text-sm` | 14px | 400 | `#9CA3AF` (gray-400) | `#6B7280` (gray-500) | — |

---

## Imagerie (Image Editor)

### `pages/Imagerie/ImageEditor.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Editor title | `text-base font-semibold` | 16px | 600 | `#F9FAFB` (gray-50) | `#F9FAFB` (gray-50) | — |
| Filename | `text-sm` | 14px | 400 | `#D1D5DB` (gray-300) | `#D1D5DB` (gray-300) | — |
| Panel bg | — | — | — | — | — | `#1F2937` (gray-800) |

---

### `components/imagerie/EditorTopBar.tsx`

| Element | Class(es) | Font Size | Weight | Color | BG |
|---|---|---|---|---|---|
| File name | `text-sm font-medium` | 14px | 500 | `#F9FAFB` (gray-50) | `#111827` (gray-900) |
| Action button label | `text-xs font-medium` | 12px | 500 | `#D1D5DB` (gray-300) | `#1F2937` (gray-800) |
| Zoom % | `text-sm font-mono` | 14px | 400 | `#D1D5DB` (gray-300) | — |
| Top bar container | — | — | — | — | `#111827` (gray-900) |

---

### `components/imagerie/EditorToolbar.tsx`

| Element | Class(es) | Font Size | Weight | Color | BG |
|---|---|---|---|---|---|
| Tool label | `text-xs` | 12px | 400 | `#9CA3AF` (gray-400) | — |
| Tool label (active) | `text-xs font-medium` | 12px | 500 | `#60A5FA` (blue-400) | `#1E3A5F` (blue-900/50) |
| Toolbar container | — | — | — | — | `#1F2937` (gray-800) |

---

### `components/imagerie/EditorSettingsPanel.tsx`

| Element | Class(es) | Font Size | Weight | Color | BG |
|---|---|---|---|---|---|
| Panel title | `text-sm font-semibold` | 14px | 600 | `#F9FAFB` (gray-50) | — |
| Setting label | `text-xs font-medium` | 12px | 500 | `#9CA3AF` (gray-400) | — |
| Input value | `text-xs` | 12px | 400 | `#F9FAFB` (gray-50) | `#374151` (gray-700) |
| Panel container | — | — | — | — | `#1F2937` (gray-800) |

---

### `components/imagerie/layers/LayerPanel.tsx` / `LayerItem.tsx`

| Element | Class(es) | Font Size | Weight | Color | BG |
|---|---|---|---|---|---|
| Panel title | `text-sm font-semibold` | 14px | 600 | `#F9FAFB` (gray-50) | — |
| Layer name | `text-xs font-medium` | 12px | 500 | `#D1D5DB` (gray-300) | — |
| Layer name (selected) | `text-xs font-semibold` | 12px | 600 | `#60A5FA` (blue-400) | `#1E3A5F` (blue-900/30) |
| Opacity label | `text-xs` | 12px | 400 | `#9CA3AF` (gray-400) | — |
| Blend mode label | `text-xs` | 12px | 400 | `#9CA3AF` (gray-400) | — |
| Panel container | — | — | — | — | `#1F2937` (gray-800) |

---

## Gamification

### `components/gamification/DoctorLevel.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Level number | `text-4xl font-black` | 36px | 900 | `#2563EB` (blue-600) | `#60A5FA` (blue-400) | — |
| Level label | `text-sm font-semibold` | 14px | 600 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| XP value | `text-lg font-bold` | 18px | 700 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| XP label | `text-xs` | 12px | 400 | `#9CA3AF` (gray-400) | `#6B7280` (gray-500) | — |
| Progress bar label | `text-xs font-medium` | 12px | 500 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Rank title | `text-base font-bold` | 16px | 700 | `#D97706` (amber-600) | `#FCD34D` (amber-300) | — |

---

### `components/gamification/AchievementBadge.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Badge name | `text-sm font-semibold` | 14px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Badge description | `text-xs` | 12px | 400 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Badge date | `text-xs` | 12px | 400 | `#9CA3AF` (gray-400) | `#6B7280` (gray-500) | — |
| Locked text | `text-xs font-medium` | 12px | 500 | `#9CA3AF` (gray-400) | `#6B7280` (gray-500) | — |

---

### `components/gamification/StreakCounter.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Streak count | `text-5xl font-black` | 48px | 900 | `#D97706` (amber-600) | `#FCD34D` (amber-300) | — |
| Streak label | `text-sm font-semibold` | 14px | 600 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Day indicator (active) | `text-xs font-bold` | 12px | 700 | `#FFFFFF` | `#FFFFFF` | `#D97706` (amber-600) |
| Day indicator (inactive) | `text-xs` | 12px | 400 | `#9CA3AF` (gray-400) | `#6B7280` (gray-500) | `#E5E7EB` / `#374151` |

---

### `components/gamification/BadgeShowcase.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Section title | `text-lg font-semibold` | 18px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Badge count | `text-2xl font-bold` | 24px | 700 | `#2563EB` (blue-600) | `#60A5FA` (blue-400) | — |
| Category label | `text-xs font-semibold uppercase` | 12px | 600 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |

---

## Clinical Examination

### `pages/ExamenClinique.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Page title | `text-2xl font-bold` | 24px | 700 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Section title | `text-lg font-semibold` | 18px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Form label | `text-sm font-medium` | 14px | 500 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Input text | `text-sm` | 14px | 400 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | `#FFFFFF` / `#374151` |
| Textarea text | `text-sm` | 14px | 400 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | `#FFFFFF` / `#374151` |
| Finding label | `text-sm font-medium` | 14px | 500 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Finding value | `text-sm` | 14px | 400 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Score indicator | `text-2xl font-bold` | 24px | 700 | varies | varies | — |

---

## Accounting / Finance Pages

### `pages/ComptabiliteTunisienne.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Page title | `text-2xl font-bold` | 24px | 700 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Tab label | `text-sm font-medium` | 14px | 500 | varies | varies | — |
| Account code | `text-sm font-mono` | 14px | 400 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Account name | `text-sm font-medium` | 14px | 500 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Debit/Credit amount | `text-sm font-semibold` | 14px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Balance (positive) | `text-sm font-bold` | 14px | 700 | `#10B981` (green-500) | `#34D399` (green-400) | — |
| Balance (negative) | `text-sm font-bold` | 14px | 700 | `#EF4444` (red-500) | `#F87171` (red-400) | — |
| Table header | `text-xs font-semibold uppercase tracking-wider` | 12px | 600 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | `#F9FAFB` / `#374151` |

---

### `pages/FSEDetails.tsx` / `pages/NouvelleFSE.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Page title | `text-2xl font-bold` | 24px | 700 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Section title | `text-lg font-semibold` | 18px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Form label | `text-sm font-medium` | 14px | 500 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Input text | `text-sm` | 14px | 400 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | `#FFFFFF` / `#374151` |
| Code CCAM | `text-sm font-mono font-semibold` | 14px | 600 | `#1E40AF` (blue-800) | `#BFDBFE` (blue-200) | `#DBEAFE` (blue-50) / `#1E3A8A` |
| Amount | `text-base font-bold` | 16px | 700 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Status badge | `text-xs font-medium` | 12px | 500 | varies | varies | varies |

---

### `pages/ReimbursementDetails.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Page title | `text-2xl font-bold` | 24px | 700 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Reimbursement amount | `text-3xl font-bold` | 30px | 700 | `#10B981` (green-500) | `#34D399` (green-400) | — |
| Detail label | `text-sm font-medium` | 14px | 500 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Detail value | `text-sm` | 14px | 400 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Status badge | `text-xs font-medium` | 12px | 500 | varies | varies | varies |

---

## Form Pages (New Record Forms)

> The following pages share a consistent form typography pattern:
> `pages/NouvelHonoraire.tsx`, `pages/NouvelActif.tsx`, `pages/NouveauLienPaiement.tsx`,
> `pages/NouveauMouvementTresorerie.tsx`, `pages/NouveauPlanPaiement.tsx`,
> `pages/NouvelleCouverture.tsx`, `pages/NouvelleDeclaration.tsx`,
> `pages/NouvelleDemandeConge.tsx`, `pages/NouvelleEvaluation.tsx`,
> `pages/NouvelleEvaluationTraitement.tsx`, `pages/NouvelleNoteTraitement.tsx`,
> `pages/NouveauContrat.tsx`, `pages/NouveauPersonnel.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Page title | `text-2xl font-bold` | 24px | 700 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Section heading | `text-lg font-semibold` | 18px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Form label | `text-sm font-medium` | 14px | 500 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Input text | `text-sm` | 14px | 400 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | `#FFFFFF` / `#374151` |
| Input placeholder | `text-sm` | 14px | 400 | `#9CA3AF` (gray-400) | `#6B7280` (gray-500) | — |
| Select text | `text-sm` | 14px | 400 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | `#FFFFFF` / `#374151` |
| Textarea text | `text-sm` | 14px | 400 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | `#FFFFFF` / `#374151` |
| Required asterisk | — | — | — | `#EF4444` (red-500) | `#F87171` (red-400) | — |
| Validation error | `text-xs` | 12px | 400 | `#EF4444` (red-500) | `#F87171` (red-400) | — |
| Helper text | `text-xs` | 12px | 400 | `#9CA3AF` (gray-400) | `#6B7280` (gray-500) | — |
| Submit button | `text-sm font-medium` | 14px | 500 | `#FFFFFF` | `#FFFFFF` | `#2563EB` (blue-600) |
| Cancel / secondary button | `text-sm font-medium` | 14px | 500 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | `#FFFFFF` / `#374151` |
| Card container | — | — | — | — | — | `#FFFFFF` / `#1F2937` |
| Page background | — | — | — | — | — | `#F9FAFB` / `#111827` |

---

## Practitioner Console

### `pages/ConsolePraticien.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Page title | `text-2xl font-bold` | 24px | 700 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Patient name (active) | `text-lg font-semibold` | 18px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Section title | `text-base font-semibold` | 16px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Note text | `text-sm` | 14px | 400 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Quick action label | `text-sm font-medium` | 14px | 500 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Timer display | `text-3xl font-mono font-bold` | 30px | 700 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Status indicator | `text-xs font-medium` | 12px | 500 | varies | varies | varies |

---

## Articles

### `pages/Articles.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Page title | `text-2xl font-bold` | 24px | 700 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Article title | `text-lg font-semibold` | 18px | 600 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| Article excerpt | `text-sm` | 14px | 400 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |
| Category badge | `text-xs font-medium` | 12px | 500 | `#1E40AF` | `#BFDBFE` | `#DBEAFE` / `#1E3A8A` |
| Publish date | `text-xs` | 12px | 400 | `#9CA3AF` (gray-400) | `#6B7280` (gray-500) | — |
| Read more link | `text-sm font-medium` | 14px | 500 | `#2563EB` (blue-600) | `#60A5FA` (blue-400) | — |
| Author name | `text-sm font-medium` | 14px | 500 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |

---

## Shared / Common Components

### `components/common/AppLogo.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Logo text | `text-xl font-bold` | 20px | 700 | `#1D4ED8` (blue-700) | `#93C5FD` (blue-300) | — |
| Tagline | `text-xs` | 12px | 400 | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | — |

---

### `components/language/LanguageSelector.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Selected language | `text-sm font-medium` | 14px | 500 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Dropdown option | `text-sm` | 14px | 400 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | `#FFFFFF` / `#1F2937` |
| Dropdown option (active) | `text-sm font-medium` | 14px | 500 | `#2563EB` (blue-600) | `#60A5FA` (blue-400) | `#EFF6FF` / `#1E3A5F` |

---

### `components/documents/DocumentUpload.tsx` / `components/photos/PhotoUpload.tsx`

| Element | Class(es) | Font Size | Weight | Color (light) | Color (dark) | BG |
|---|---|---|---|---|---|---|
| Upload area label | `text-sm font-medium` | 14px | 500 | `#374151` (gray-700) | `#D1D5DB` (gray-300) | — |
| Upload hint | `text-xs` | 12px | 400 | `#9CA3AF` (gray-400) | `#6B7280` (gray-500) | — |
| File name | `text-sm` | 14px | 400 | `#111827` (gray-900) | `#F9FAFB` (gray-50) | — |
| File size | `text-xs` | 12px | 400 | `#9CA3AF` (gray-400) | `#6B7280` (gray-500) | — |
| Upload zone border | — | — | — | `#D1D5DB` (gray-300) dashed | `#4B5563` (gray-600) dashed | `#F9FAFB` / `#374151` |
| Upload zone (drag over) | — | — | — | `#2563EB` (blue-600) dashed | `#60A5FA` (blue-400) dashed | `#EFF6FF` / `#1E3A5F` |

---

## Typography Scale Summary

| Scale Name | Tailwind Class | px | Weight | Typical Use |
|---|---|---|---|---|
| Display | `text-5xl font-black` | 48px | 900 | Streak counter, hero numbers |
| H1 | `text-3xl font-bold` | 30px | 700 | KPI values, large metrics |
| H2 | `text-2xl font-bold` | 24px | 700 | Page titles, section KPIs |
| H3 | `text-xl font-semibold` | 20px | 600 | Modal titles, card headings |
| H4 | `text-lg font-semibold` | 18px | 600 | Section headings |
| H5 | `text-base font-semibold` | 16px | 600 | Sub-section headings, amounts |
| Body Strong | `text-sm font-semibold` | 14px | 600 | Invoice numbers, key values |
| Body Medium | `text-sm font-medium` | 14px | 500 | Table primary cells, labels |
| Body | `text-sm` | 14px | 400 | General body text, descriptions |
| Caption Strong | `text-xs font-semibold` | 12px | 600 | Table headers (uppercase) |
| Caption Medium | `text-xs font-medium` | 12px | 500 | Badges, status pills |
| Caption | `text-xs` | 12px | 400 | Timestamps, helper text, metadata |
| Mono | `text-sm font-mono` | 14px | 400 | IDs, codes, timestamps |

---

## Color Palette Summary

| Token | Light Mode | Dark Mode | Usage |
|---|---|---|---|
| Text Primary | `#111827` (gray-900) | `#F9FAFB` (gray-50) | Main content |
| Text Secondary | `#374151` (gray-700) | `#D1D5DB` (gray-300) | Supporting text |
| Text Muted | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | Labels, metadata |
| Text Disabled | `#9CA3AF` (gray-400) | `#6B7280` (gray-500) | Placeholders, disabled |
| Brand Blue | `#2563EB` (blue-600) | `#60A5FA` (blue-400) | Primary actions, links |
| Brand Blue Dark | `#1D4ED8` (blue-700) | `#93C5FD` (blue-300) | Logo, nav active |
| Success | `#10B981` (green-500) | `#34D399` (green-400) | Positive trends, paid |
| Warning | `#D97706` (amber-600) | `#FCD34D` (amber-300) | Alerts, expiry |
| Danger | `#EF4444` (red-500) | `#F87171` (red-400) | Errors, cancelled |
| Surface | `#FFFFFF` | `#1F2937` (gray-800) | Cards, modals |
| Surface Alt | `#F9FAFB` (gray-50) | `#374151` (gray-700) | Table headers, inputs |
| Border | `#E5E7EB` (gray-200) | `#374151` (gray-700) | Dividers, input borders |
| Editor Dark | `#111827` (gray-900) | `#111827` | Image editor panels |

---

*This document was auto-generated from a full codebase audit. All Tailwind classes map to the default Tailwind v3 color scale. No custom font families are configured — the app uses the Tailwind default system font stack.*
