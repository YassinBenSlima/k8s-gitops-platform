# Multi-Specialty Medical Practice Management System
## Comprehensive Architecture & Implementation Guide

---

## 📋 Table of Contents

1. [Executive Summary](#executive-summary)
2. [System Architecture Overview](#system-architecture-overview)
3. [Technology Stack](#technology-stack)
4. [Configuration-Driven Architecture](#configuration-driven-architecture)
5. [Implementation Guide](#implementation-guide)
6. [Specialty Configuration Examples](#specialty-configuration-examples)
7. [Best Practices & Patterns](#best-practices--patterns)
8. [Migration Strategy](#migration-strategy)
9. [Testing & Quality Assurance](#testing--quality-assurance)
10. [Deployment & Maintenance](#deployment--maintenance)

---

## 1. Executive Summary

### 1.1 Project Overview

This document provides a comprehensive architectural guide for transforming your current React-based medical practice management system into a **multi-specialty, configuration-driven platform** using Angular and Formly. The system will support:

- **Orthodontists** (current implementation)
- **General Dentists**
- **Ophthalmologists**
- **General Medicine Practitioners**
- **Gynecologists**
- **Other medical specialties**

### 1.2 Key Objectives

✅ **Single Codebase**: One application serving multiple specialties
✅ **JSON Configuration**: All UI/UX driven by specialty-specific JSON configs
✅ **Dynamic Forms**: Formly-based forms that adapt to specialty requirements
✅ **Flexible Layouts**: Dashboard cards, grids, and widgets configurable per specialty
✅ **Scalability**: Easy addition of new specialties without code changes
✅ **Maintainability**: Centralized configuration management

---

## 2. System Architecture Overview

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Angular Application                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌────────────────┐  ┌──────────────────┐  ┌─────────────┐ │
│  │  Core Module   │  │  Shared Module   │  │ Config API  │ │
│  │  - Auth        │  │  - Components    │  │ - Loader    │ │
│  │  - Guards      │  │  - Directives    │  │ - Validator │ │
│  │  - Interceptors│  │  - Pipes         │  │ - Cache     │ │
│  └────────────────┘  └──────────────────┘  └─────────────┘ │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Specialty Configuration Layer                │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌─────────┐│   │
│  │  │Orthodontic│ │ Dentist  │ │Ophthalmo │ │ General ││   │
│  │  │  Config   │ │  Config  │ │  Config  │ │ Medicine││   │
│  │  └──────────┘ └──────────┘ └──────────┘ └─────────┘│   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Dynamic Rendering Engine                     │   │
│  │  ┌─────────────┐ ┌──────────────┐ ┌──────────────┐ │   │
│  │  │   Formly    │ │ Grid Renderer│ │Card Renderer │ │   │
│  │  │   Engine    │ │   (ag-Grid)  │ │   Engine     │ │   │
│  │  └─────────────┘ └──────────────┘ └──────────────┘ │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Feature Modules                         │   │
│  │  - Patients  - Appointments  - Diagnostics           │   │
│  │  - Treatments - Administration - Stock               │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend Services                          │
│  - REST API  - Configuration Service  - Database            │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Core Architectural Principles

#### 2.2.1 Separation of Concerns

```typescript
// Clear separation between:
- Configuration (JSON)
- Business Logic (Services)
- Presentation (Components)
- Data Management (State)
```

#### 2.2.2 Configuration-First Design

```typescript
// Everything driven by configuration:
- Forms → Formly JSON Schema
- Grids → Column Definitions JSON
- Dashboards → Widget Configuration JSON
- Navigation → Menu Configuration JSON
- Workflows → Process Configuration JSON
```

#### 2.2.3 Composition Over Inheritance

```typescript
// Build complex UIs from simple, reusable components
- Base components + Configuration = Specialty-specific UI
```

---

## 3. Technology Stack

### 3.1 Frontend Stack

```json
{
  "core": {
    "framework": "Angular 17+",
    "language": "TypeScript 5+",
    "styling": "Tailwind CSS 3.4+"
  },
  "forms": {
    "library": "@ngx-formly/core",
    "ui": "@ngx-formly/material",
    "validation": "@ngx-formly/core/json-schema"
  },
  "dataGrid": {
    "library": "ag-Grid Enterprise",
    "alternative": "PrimeNG Table (if budget constrained)"
  },
  "stateManagement": {
    "primary": "@ngrx/store",
    "effects": "@ngrx/effects",
    "devtools": "@ngrx/store-devtools"
  },
  "utilities": {
    "http": "@angular/common/http",
    "routing": "@angular/router",
    "animations": "@angular/animations",
    "i18n": "@ngx-translate/core"
  }
}
```

### 3.2 Backend Requirements

```json
{
  "api": {
    "type": "RESTful API",
    "framework": "Node.js/NestJS or .NET Core",
    "authentication": "JWT + OAuth2"
  },
  "database": {
    "primary": "PostgreSQL",
    "cache": "Redis",
    "documents": "MongoDB (for configurations)"
  },
  "storage": {
    "files": "AWS S3 or Azure Blob Storage",
    "configurations": "MongoDB or PostgreSQL JSONB"
  }
}
```

---

## 4. Configuration-Driven Architecture

### 4.1 Configuration Schema Structure

```typescript
// src/app/core/models/specialty-config.interface.ts

export interface SpecialtyConfiguration {
  metadata: SpecialtyMetadata;
  dashboard: DashboardConfiguration;
  modules: ModuleConfiguration[];
  forms: FormConfiguration[];
  grids: GridConfiguration[];
  navigation: NavigationConfiguration;
  workflows: WorkflowConfiguration[];
  terminology: TerminologyConfiguration;
  features: FeatureFlags;
}

export interface SpecialtyMetadata {
  id: string;
  name: string;
  code: 'ORTHO' | 'DENT' | 'OPHTHALMO' | 'GENERAL' | 'GYNECO';
  version: string;
  description: string;
  icon: string;
  color: string;
  locale: string;
}

export interface DashboardConfiguration {
  layout: 'grid' | 'flex' | 'masonry';
  cards: DashboardCard[];
  quickActions: QuickAction[];
  statistics: StatisticWidget[];
}

export interface DashboardCard {
  id: string;
  type: 'stat' | 'chart' | 'list' | 'calendar' | 'custom';
  title: string;
  position: { row: number; col: number; width: number; height: number };
  visible: boolean;
  permissions: string[];
  config: any; // Card-specific configuration
}
```

### 4.2 Configuration Storage Strategy

#### 4.2.1 File-Based Configuration (Development)

```
src/
  assets/
    configs/
      specialties/
        orthodontist/
          dashboard.json
          patient-form.json
          appointment-grid.json
          navigation.json
          terminology.json
        dentist/
          dashboard.json
          patient-form.json
          ...
        ophthalmologist/
          ...
```

#### 4.2.2 Database Configuration (Production)

```sql
-- PostgreSQL Schema
CREATE TABLE specialty_configurations (
  id UUID PRIMARY KEY,
  specialty_code VARCHAR(50) NOT NULL,
  config_type VARCHAR(50) NOT NULL, -- 'dashboard', 'form', 'grid', etc.
  config_name VARCHAR(100) NOT NULL,
  config_data JSONB NOT NULL,
  version VARCHAR(20) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(specialty_code, config_type, config_name, version)
);

CREATE INDEX idx_specialty_config ON specialty_configurations(specialty_code, config_type, is_active);
```

---

## 5. Implementation Guide

### 5.1 Project Structure

```
medical-practice-app/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── services/
│   │   │   │   ├── config.service.ts
│   │   │   │   ├── specialty.service.ts
│   │   │   │   └── auth.service.ts
│   │   │   ├── guards/
│   │   │   │   ├── auth.guard.ts
│   │   │   │   └── specialty.guard.ts
│   │   │   ├── interceptors/
│   │   │   │   └── specialty.interceptor.ts
│   │   │   ├── models/
│   │   │   │   ├── specialty-config.interface.ts
│   │   │   │   └── user.interface.ts
│   │   │   └── core.module.ts
│   │   │
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   │   ├── dynamic-form/
│   │   │   │   │   └── dynamic-form.component.ts
│   │   │   │   ├── dynamic-grid/
│   │   │   │   │   └── dynamic-grid.component.ts
│   │   │   │   ├── dynamic-card/
│   │   │   │   │   └── dynamic-card.component.ts
│   │   │   │   └── dynamic-dashboard/
│   │   │   │       └── dynamic-dashboard.component.ts
│   │   │   ├── directives/
│   │   │   ├── pipes/
│   │   │   └── shared.module.ts
│   │   │
│   │   ├── features/
│   │   │   ├── patients/
│   │   │   │   ├── components/
│   │   │   │   ├── services/
│   │   │   │   └── patients.module.ts
│   │   │   ├── appointments/
│   │   │   ├── diagnostics/
│   │   │   ├── treatments/
│   │   │   └── administration/
│   │   │
│   │   ├── config/
│   │   │   ├── formly/
│   │   │   │   ├── formly.config.ts
│   │   │   │   └── custom-types/
│   │   │   └── ag-grid/
│   │   │       └── ag-grid.config.ts
│   │   │
│   │   └── app.component.ts
│   │
│   └── assets/
│       └── configs/
│           └── specialties/
│
├── angular.json
├── package.json
└── tsconfig.json
```

### 5.2 Core Services Implementation

#### 5.2.1 Configuration Service

```typescript
// src/app/core/services/config.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, tap, catchError, shareReplay } from 'rxjs/operators';
import { SpecialtyConfiguration } from '../models/specialty-config.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private configCache = new Map<string, Observable<any>>();
  private currentSpecialty$ = new BehaviorSubject<string>('orthodontist');

  constructor(private http: HttpClient) {}

  /**
   * Load complete specialty configuration
   */
  loadSpecialtyConfig(specialtyCode: string): Observable<SpecialtyConfiguration> {
    const cacheKey = `specialty_${specialtyCode}`;
    
    if (!this.configCache.has(cacheKey)) {
      const config$ = this.http
        .get<SpecialtyConfiguration>(`/api/configs/specialty/${specialtyCode}`)
        .pipe(
          tap(config => this.validateConfig(config)),
          shareReplay(1),
          catchError(error => {
            console.error(`Failed to load config for ${specialtyCode}`, error);
            return this.loadFallbackConfig(specialtyCode);
          })
        );
      
      this.configCache.set(cacheKey, config$);
    }
    
    return this.configCache.get(cacheKey)!;
  }

  /**
   * Load specific configuration type
   */
  loadConfig<T>(
    specialtyCode: string, 
    configType: 'dashboard' | 'form' | 'grid' | 'navigation',
    configName?: string
  ): Observable<T> {
    const cacheKey = `${specialtyCode}_${configType}_${configName || 'default'}`;
    
    if (!this.configCache.has(cacheKey)) {
      const url = configName
        ? `/api/configs/${specialtyCode}/${configType}/${configName}`
        : `/api/configs/${specialtyCode}/${configType}`;
      
      const config$ = this.http.get<T>(url).pipe(
        shareReplay(1),
        catchError(error => {
          console.error(`Failed to load ${configType} config`, error);
          return this.loadFallbackConfigByType<T>(specialtyCode, configType, configName);
        })
      );
      
      this.configCache.set(cacheKey, config$);
    }
    
    return this.configCache.get(cacheKey)!;
  }

  /**
   * Set current specialty
   */
  setSpecialty(specialtyCode: string): void {
    this.currentSpecialty$.next(specialtyCode);
  }

  /**
   * Get current specialty
   */
  getCurrentSpecialty(): Observable<string> {
    return this.currentSpecialty$.asObservable();
  }

  /**
   * Clear configuration cache
   */
  clearCache(): void {
    this.configCache.clear();
  }

  /**
   * Validate configuration schema
   */
  private validateConfig(config: SpecialtyConfiguration): void {
    if (!config.metadata || !config.metadata.code) {
      throw new Error('Invalid configuration: missing metadata');
    }
    // Add more validation as needed
  }

  /**
   * Load fallback configuration from assets
   */
  private loadFallbackConfig(specialtyCode: string): Observable<SpecialtyConfiguration> {
    return this.http.get<SpecialtyConfiguration>(
      `/assets/configs/specialties/${specialtyCode}/config.json`
    );
  }

  /**
   * Load fallback configuration by type
   */
  private loadFallbackConfigByType<T>(
    specialtyCode: string,
    configType: string,
    configName?: string
  ): Observable<T> {
    const fileName = configName ? `${configName}.json` : `${configType}.json`;
    return this.http.get<T>(
      `/assets/configs/specialties/${specialtyCode}/${fileName}`
    );
  }
}
```

#### 5.2.2 Specialty Service

```typescript
// src/app/core/services/specialty.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { SpecialtyConfiguration, SpecialtyMetadata } from '../models/specialty-config.interface';

export interface Specialty {
  code: string;
  name: string;
  icon: string;
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {
  private availableSpecialties: Specialty[] = [
    { code: 'ORTHO', name: 'Orthodontiste', icon: 'tooth', color: '#8B5CF6' },
    { code: 'DENT', name: 'Dentiste', icon: 'dental', color: '#3B82F6' },
    { code: 'OPHTHALMO', name: 'Ophtalmologiste', icon: 'eye', color: '#10B981' },
    { code: 'GENERAL', name: 'Médecine Générale', icon: 'stethoscope', color: '#F59E0B' },
    { code: 'GYNECO', name: 'Gynécologue', icon: 'female', color: '#EC4899' }
  ];

  private currentSpecialty$ = new BehaviorSubject<Specialty>(this.availableSpecialties[0]);
  private specialtyConfig$ = new BehaviorSubject<SpecialtyConfiguration | null>(null);

  constructor(private configService: ConfigService) {
    this.initializeSpecialty();
  }

  /**
   * Initialize specialty from user preferences or default
   */
  private initializeSpecialty(): void {
    const savedSpecialty = localStorage.getItem('selectedSpecialty');
    if (savedSpecialty) {
      const specialty = this.availableSpecialties.find(s => s.code === savedSpecialty);
      if (specialty) {
        this.setSpecialty(specialty.code);
      }
    }
  }

  /**
   * Get available specialties
   */
  getAvailableSpecialties(): Specialty[] {
    return this.availableSpecialties;
  }

  /**
   * Get current specialty
   */
  getCurrentSpecialty(): Observable<Specialty> {
    return this.currentSpecialty$.asObservable();
  }

  /**
   * Get current specialty configuration
   */
  getCurrentConfig(): Observable<SpecialtyConfiguration | null> {
    return this.specialtyConfig$.asObservable();
  }

  /**
   * Set active specialty
   */
  setSpecialty(specialtyCode: string): void {
    const specialty = this.availableSpecialties.find(s => s.code === specialtyCode);
    if (!specialty) {
      console.error(`Specialty ${specialtyCode} not found`);
      return;
    }

    this.currentSpecialty$.next(specialty);
    localStorage.setItem('selectedSpecialty', specialtyCode);
    
    // Load specialty configuration
    this.configService.loadSpecialtyConfig(specialtyCode.toLowerCase()).subscribe(
      config => {
        this.specialtyConfig$.next(config);
        this.configService.setSpecialty(specialtyCode.toLowerCase());
      },
      error => {
        console.error('Failed to load specialty configuration', error);
      }
    );
  }

  /**
   * Check if feature is enabled for current specialty
   */
  isFeatureEnabled(featureName: string): Observable<boolean> {
    return this.specialtyConfig$.pipe(
      map(config => {
        if (!config || !config.features) return false;
        return config.features[featureName] === true;
      })
    );
  }

  /**
   * Get terminology for current specialty
   */
  getTerminology(key: string): Observable<string> {
    return this.specialtyConfig$.pipe(
      map(config => {
        if (!config || !config.terminology) return key;
        return config.terminology[key] || key;
      })
    );
  }
}
```

### 5.3 Dynamic Form Implementation with Formly

#### 5.3.1 Formly Configuration

```typescript
// src/app/config/formly/formly.config.ts

import { ConfigOption } from '@ngx-formly/core';
import { FormlyFieldConfig } from '@ngx-formly/core';

export const formlyConfig: ConfigOption = {
  types: [
    {
      name: 'specialty-input',
      component: SpecialtyInputComponent,
      wrappers: ['form-field']
    },
    {
      name: 'medical-date',
      component: MedicalDateComponent,
      wrappers: ['form-field']
    },
    {
      name: 'diagnosis-select',
      component: DiagnosisSelectComponent,
      wrappers: ['form-field']
    },
    {
      name: 'treatment-plan',
      component: TreatmentPlanComponent
    }
  ],
  validators: [
    { name: 'medical-id', validation: medicalIdValidator },
    { name: 'appointment-date', validation: appointmentDateValidator }
  ],
  validationMessages: [
    { name: 'required', message: 'Ce champ est obligatoire' },
    { name: 'medical-id', message: 'Format d\'identifiant médical invalide' }
  ]
};

// Custom validators
export function medicalIdValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;
  
  const pattern = /^[A-Z]{2}\d{6}$/;
  return pattern.test(value) ? null : { 'medical-id': true };
}

export function appointmentDateValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;
  
  const selectedDate = new Date(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return selectedDate >= today ? null : { 'appointment-date': true };
}
```

#### 5.3.2 Dynamic Form Component

```typescript
// src/app/shared/components/dynamic-form/dynamic-form.component.ts

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ConfigService } from '../../../core/services/config.service';
import { SpecialtyService } from '../../../core/services/specialty.service';

@Component({
  selector: 'app-dynamic-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <formly-form
        [form]="form"
        [fields]="fields"
        [model]="model"
        [options]="options">
      </formly-form>
      
      <div class="form-actions mt-6 flex justify-end space-x-3">
        <button
          type="button"
          (click)="onCancel()"
          class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
          Annuler
        </button>
        <button
          type="submit"
          [disabled]="!form.valid || isSubmitting"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
          {{ submitLabel }}
        </button>
      </div>
    </form>
  `
})
export class DynamicFormComponent implements OnInit {
  @Input() formName!: string;
  @Input() model: any = {};
  @Input() submitLabel = 'Enregistrer';
  @Output() formSubmit = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<void>();

  form = new FormGroup({});
  fields: FormlyFieldConfig[] = [];
  options: FormlyFormOptions = {};
  isSubmitting = false;

  constructor(
    private configService: ConfigService,
    private specialtyService: SpecialtyService
  ) {}

  ngOnInit(): void {
    this.loadFormConfiguration();
  }

  private loadFormConfiguration(): void {
    this.specialtyService.getCurrentSpecialty().subscribe(specialty => {
      this.configService
        .loadConfig<FormlyFieldConfig[]>(specialty.code.toLowerCase(), 'form', this.formName)
        .subscribe(
          fields => {
            this.fields = fields;
          },
          error => {
            console.error('Failed to load form configuration', error);
          }
        );
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.isSubmitting = true;
      this.formSubmit.emit(this.model);
    }
  }

  onCancel(): void {
    this.formCancel.emit();
  }

  resetForm(): void {
    this.form.reset();
    this.model = {};
    this.isSubmitting = false;
  }
}
```

### 5.4 Dynamic Grid Implementation with ag-Grid

#### 5.4.1 Grid Configuration Interface

```typescript
// src/app/core/models/grid-config.interface.ts

export interface GridConfiguration {
  id: string;
  columns: ColumnDefinition[];
  defaultColDef: any;
  rowSelection: 'single' | 'multiple';
  pagination: boolean;
  paginationPageSize: number;
  enableSorting: boolean;
  enableFiltering: boolean;
  enableGrouping: boolean;
  contextMenu: ContextMenuItem[];
  toolbarActions: ToolbarAction[];
}

export interface ColumnDefinition {
  field: string;
  headerName: string;
  type?: 'text' | 'number' | 'date' | 'boolean' | 'custom';
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  hide?: boolean;
  sortable?: boolean;
  filter?: boolean | string;
  editable?: boolean;
  cellRenderer?: string;
  cellEditor?: string;
  valueFormatter?: string;
  valueGetter?: string;
  pinned?: 'left' | 'right';
  checkboxSelection?: boolean;
  headerCheckboxSelection?: boolean;
}

export interface ContextMenuItem {
  name: string;
  action: string;
  icon?: string;
  disabled?: boolean;
}

export interface ToolbarAction {
  name: string;
  label: string;
  icon: string;
  action: string;
  primary?: boolean;
}
```

#### 5.4.2 Dynamic Grid Component

```typescript
// src/app/shared/components/dynamic-grid/dynamic-grid.component.ts

import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions, ColDef, GridReadyEvent } from 'ag-grid-community';
import { ConfigService } from '../../../core/services/config.service';
import { SpecialtyService } from '../../../core/services/specialty.service';
import { GridConfiguration } from '../../../core/models/grid-config.interface';

@Component({
  selector: 'app-dynamic-grid',
  template: `
    <div class="grid-container">
      <!-- Toolbar -->
      <div class="grid-toolbar flex justify-between items-center mb-4 p-4 bg-white rounded-lg shadow">
        <div class="toolbar-left flex space-x-2">
          <button
            *ngFor="let action of toolbarActions"
            (click)="onToolbarAction(action.action)"
            [class.primary]="action.primary"
            class="px-4 py-2 rounded-lg transition-colors"
            [ngClass]="{
              'bg-blue-600 text-white hover:bg-blue-700': action.primary,
              'border border-gray-300 text-gray-700 hover:bg-gray-50': !action.primary
            }">
            <i [class]="action.icon" class="mr-2"></i>
            {{ action.label }}
          </button>
        </div>
        
        <div class="toolbar-right">
          <input
            type="text"
            placeholder="Rechercher..."
            (input)="onQuickFilterChanged($event)"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
        </div>
      </div>

      <!-- Grid -->
      <ag-grid-angular
        #agGrid
        class="ag-theme-alpine"
        [style.height.px]="gridHeight"
        [gridOptions]="gridOptions"
        [columnDefs]="columnDefs"
        [rowData]="rowData"
        [defaultColDef]="defaultColDef"
        (gridReady)="onGridReady($event)"
        (selectionChanged)="onSelectionChanged()"
        (cellClicked)="onCellClicked($event)"
        (cellDoubleClicked)="onCellDoubleClicked($event)">
      </ag-grid-angular>
    </div>
  `,
  styles: [`
    .grid-container {
      width: 100%;
    }
    
    ::ng-deep .ag-theme-alpine {
      --ag-border-color: #e5e7eb;
      --ag-header-background-color: #f9fafb;
      --ag-odd-row-background-color: #ffffff;
      --ag-row-hover-color: #f3f4f6;
    }
  `]
})
export class DynamicGridComponent implements OnInit {
  @ViewChild('agGrid') agGrid!: AgGridAngular;
  
  @Input() gridName!: string;
  @Input() rowData: any[] = [];
  @Input() gridHeight = 600;
  @Output() rowSelected = new EventEmitter<any>();
  @Output() rowDoubleClicked = new EventEmitter<any>();
  @Output() toolbarActionClicked = new EventEmitter<string>();

  gridOptions: GridOptions = {};
  columnDefs: ColDef[] = [];
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 100
  };
  toolbarActions: any[] = [];

  constructor(
    private configService: ConfigService,
    private specialtyService: SpecialtyService
  ) {}

  ngOnInit(): void {
    this.loadGridConfiguration();
  }

  private loadGridConfiguration(): void {
    this.specialtyService.getCurrentSpecialty().subscribe(specialty => {
      this.configService
        .loadConfig<GridConfiguration>(specialty.code.toLowerCase(), 'grid', this.gridName)
        .subscribe(
          config => {
            this.applyGridConfiguration(config);
          },
          error => {
            console.error('Failed to load grid configuration', error);
          }
        );
    });
  }

  private applyGridConfiguration(config: GridConfiguration): void {
    // Apply column definitions
    this.columnDefs = config.columns.map(col => this.mapColumnDefinition(col));
    
    // Apply grid options
    this.gridOptions = {
      ...this.gridOptions,
      rowSelection: config.rowSelection,
      pagination: config.pagination,
      paginationPageSize: config.paginationPageSize,
      enableSorting: config.enableSorting,
      enableFilter: config.enableFiltering,
      getContextMenuItems: () => this.getContextMenuItems(config.contextMenu)
    };

    // Apply default column definition
    if (config.defaultColDef) {
      this.defaultColDef = { ...this.defaultColDef, ...config.defaultColDef };
    }

    // Set toolbar actions
    this.toolbarActions = config.toolbarActions || [];
  }

  private mapColumnDefinition(col: any): ColDef {
    const colDef: ColDef = {
      field: col.field,
      headerName: col.headerName,
      width: col.width,
      minWidth: col.minWidth,
      maxWidth: col.maxWidth,
      hide: col.hide,
      sortable: col.sortable,
      filter: col.filter,
      editable: col.editable,
      pinned: col.pinned,
      checkboxSelection: col.checkboxSelection,
      headerCheckboxSelection: col.headerCheckboxSelection
    };

    // Apply cell renderer if specified
    if (col.cellRenderer) {
      colDef.cellRenderer = this.getCellRenderer(col.cellRenderer);
    }

    // Apply value formatter if specified
    if (col.valueFormatter) {
      colDef.valueFormatter = this.getValueFormatter(col.valueFormatter);
    }

    return colDef;
  }

  private getCellRenderer(rendererName: string): any {
    // Map renderer names to actual renderer components
    const renderers: { [key: string]: any } = {
      'status': StatusCellRenderer,
      'date': DateCellRenderer,
      'action': ActionCellRenderer,
      'avatar': AvatarCellRenderer
    };
    return renderers[rendererName];
  }

  private getValueFormatter(formatterName: string): any {
    // Map formatter names to actual formatter functions
    const formatters: { [key: string]: any } = {
      'currency': (params: any) => `${params.value} DT`,
      'percentage': (params: any) => `${params.value}%`,
      'date': (params: any) => new Date(params.value).toLocaleDateString('fr-FR')
    };
    return formatters[formatterName];
  }

  private getContextMenuItems(menuItems: any[]): any[] {
    return menuItems.map(item => ({
      name: item.name,
      action: () => this.onContextMenuAction(item.action),
      icon: item.icon,
      disabled: item.disabled
    }));
  }

  onGridReady(params: GridReadyEvent): void {
    params.api.sizeColumnsToFit();
  }

  onSelectionChanged(): void {
    const selectedRows = this.agGrid.api.getSelectedRows();
    if (selectedRows.length > 0) {
      this.rowSelected.emit(selectedRows[0]);
    }
  }

  onCellClicked(event: any): void {
    // Handle cell click
  }

  onCellDoubleClicked(event: any): void {
    this.rowDoubleClicked.emit(event.data);
  }

  onQuickFilterChanged(event: any): void {
    this.agGrid.api.setQuickFilter(event.target.value);
  }

  onToolbarAction(action: string): void {
    this.toolbarActionClicked.emit(action);
  }

  onContextMenuAction(action: string): void {
    const selectedRows = this.agGrid.api.getSelectedRows();
    console.log(`Context menu action: ${action}`, selectedRows);
  }

  refreshData(): void {
    this.agGrid.api.refreshCells();
  }

  exportToExcel(): void {
    this.agGrid.api.exportDataAsExcel();
  }
}
```

### 5.5 Dynamic Dashboard Implementation

#### 5.5.1 Dashboard Configuration

```typescript
// src/app/core/models/dashboard-config.interface.ts

export interface DashboardConfiguration {
  layout: 'grid' | 'flex' | 'masonry';
  gridColumns: number;
  gap: number;
  cards: DashboardCard[];
  quickActions: QuickAction[];
}

export interface DashboardCard {
  id: string;
  type: 'stat' | 'chart' | 'list' | 'calendar' | 'table' | 'custom';
  title: string;
  subtitle?: string;
  icon?: string;
  position: CardPosition;
  visible: boolean;
  permissions?: string[];
  config: CardConfig;
  refreshInterval?: number;
}

export interface CardPosition {
  row: number;
  col: number;
  width: number; // Grid columns span
  height: number; // Grid rows span
}

export interface CardConfig {
  // Stat card
  value?: string | number;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color?: string;
  
  // Chart card
  chartType?: 'line' | 'bar' | 'pie' | 'doughnut';
  chartData?: any;
  
  // List card
  items?: any[];
  itemTemplate?: string;
  
  // Table card
  columns?: any[];
  data?: any[];
  
  // Custom card
  component?: string;
  props?: any;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  route?: string;
  action?: string;
  color?: string;
  visible: boolean;
  permissions?: string[];
}
```

#### 5.5.2 Dynamic Dashboard Component

```typescript
// src/app/shared/components/dynamic-dashboard/dynamic-dashboard.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfigService } from '../../../core/services/config.service';
import { SpecialtyService } from '../../../core/services/specialty.service';
import { DashboardConfiguration, DashboardCard } from '../../../core/models/dashboard-config.interface';

@Component({
  selector: 'app-dynamic-dashboard',
  template: `
    <div class="dashboard-container p-6">
      <!-- Header -->
      <div class="dashboard-header mb-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <i [class]="currentSpecialty?.icon" class="text-3xl text-white"></i>
            </div>
            <div>
              <h1 class="text-3xl font-bold text-gray-900">
                {{ dashboardTitle }}
              </h1>
              <p class="text-gray-600 mt-1">
                {{ dashboardSubtitle }}
              </p>
            </div>
          </div>
          
          <!-- Quick Actions -->
          <div class="flex space-x-3">
            <button
              *ngFor="let action of quickActions"
              (click)="onQuickAction(action)"
              [style.background-color]="action.color"
              class="px-6 py-3 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
              <i [class]="action.icon" class="mr-2"></i>
              {{ action.label }}
            </button>
          </div>
        </div>
      </div>

      <!-- Dashboard Grid -->
      <div
        class="dashboard-grid"
        [style.display]="'grid'"
        [style.grid-template-columns]="'repeat(' + gridColumns + ', 1fr)'"
        [style.gap.px]="gap">
        
        <app-dashboard-card
          *ngFor="let card of visibleCards"
          [card]="card"
          [style.grid-column]="'span ' + card.position.width"
          [style.grid-row]="'span ' + card.position.height"
          (cardAction)="onCardAction($event)">
        </app-dashboard-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    }
    
    .dashboard-grid {
      width: 100%;
    }
  `]
})
export class DynamicDashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  dashboardConfig?: DashboardConfiguration;
  currentSpecialty: any;
  dashboardTitle = 'Tableau de bord';
  dashboardSubtitle = 'Vue d\'ensemble de votre activité';
  
  gridColumns = 4;
  gap = 24;
  visibleCards: DashboardCard[] = [];
  quickActions: any[] = [];

  constructor(
    private configService: ConfigService,
    private specialtyService: SpecialtyService
  ) {}

  ngOnInit(): void {
    this.loadDashboardConfiguration();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadDashboardConfiguration(): void {
    this.specialtyService.getCurrentSpecialty()
      .pipe(takeUntil(this.destroy$))
      .subscribe(specialty => {
        this.currentSpecialty = specialty;
        
        this.configService
          .loadConfig<DashboardConfiguration>(specialty.code.toLowerCase(), 'dashboard')
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            config => {
              this.applyDashboardConfiguration(config);
            },
            error => {
              console.error('Failed to load dashboard configuration', error);
            }
          );
      });
  }

  private applyDashboardConfiguration(config: DashboardConfiguration): void {
    this.dashboardConfig = config;
    this.gridColumns = config.gridColumns || 4;
    this.gap = config.gap || 24;
    
    // Filter visible cards based on permissions
    this.visibleCards = config.cards.filter(card => {
      if (!card.visible) return false;
      if (card.permissions && card.permissions.length > 0) {
        // Check user permissions here
        return this.hasPermissions(card.permissions);
      }
      return true;
    });

    // Filter visible quick actions
    this.quickActions = config.quickActions.filter(action => {
      if (!action.visible) return false;
      if (action.permissions && action.permissions.length > 0) {
        return this.hasPermissions(action.permissions);
      }
      return true;
    });
  }

  private hasPermissions(permissions: string[]): boolean {
    // Implement permission check logic
    // This would typically check against user's role/permissions
    return true;
  }

  onQuickAction(action: any): void {
    if (action.route) {
      // Navigate to route
      console.log('Navigate to:', action.route);
    } else if (action.action) {
      // Execute action
      console.log('Execute action:', action.action);
    }
  }

  onCardAction(event: any): void {
    console.log('Card action:', event);
  }
}
```

---

## 6. Specialty Configuration Examples

### 6.1 Orthodontist Configuration

#### 6.1.1 Dashboard Configuration

```json
{
  "layout": "grid",
  "gridColumns": 4,
  "gap": 24,
  "cards": [
    {
      "id": "total-patients",
      "type": "stat",
      "title": "Total patients",
      "icon": "users",
      "position": { "row": 1, "col": 1, "width": 1, "height": 1 },
      "visible": true,
      "config": {
        "value": "6",
        "color": "#3B82F6",
        "trend": "up",
        "trendValue": "+2"
      }
    },
    {
      "id": "active-treatments",
      "type": "stat",
      "title": "En traitement",
      "icon": "activity",
      "position": { "row": 1, "col": 2, "width": 1, "height": 1 },
      "visible": true,
      "config": {
        "value": "6",
        "color": "#8B5CF6"
      }
    }
  ],
  "quickActions": [
    {
      "id": "new-patient",
      "label": "Nouveau Patient",
      "icon": "user-plus",
      "route": "/patients/new",
      "color": "#3B82F6",
      "visible": true
    }
  ]
}
```

### 6.2 Patient Form Configuration (Orthodontist)

```json
[
  {
    "key": "personalInfo",
    "type": "stepper",
    "templateOptions": {
      "label": "Informations personnelles"
    },
    "fieldGroup": [
      {
        "key": "firstName",
        "type": "input",
        "templateOptions": {
          "label": "Prénom",
          "required": true
        }
      },
      {
        "key": "treatmentType",
        "type": "select",
        "templateOptions": {
          "label": "Type de traitement",
          "options": [
            { "value": "FIXED", "label": "Appareil fixe" },
            { "value": "INVISIBLE", "label": "Gouttières invisibles" }
          ]
        }
      }
    ]
  }
]
```

---

## 7. Best Practices & Patterns

### 7.1 Configuration Management

- **Version Control**: Track configuration versions
- **Validation**: Validate all configurations against schemas
- **Caching**: Cache configurations for performance
- **Fallbacks**: Always provide fallback configurations

### 7.2 Performance Optimization

- **Lazy Loading**: Load configurations only when needed
- **Code Splitting**: Split by specialty/module
- **Caching Strategy**: Use service workers for offline support
- **Bundle Optimization**: Tree-shake unused code

### 7.3 Security

- **Access Control**: Implement role-based access
- **Sanitization**: Sanitize all configuration inputs
- **Encryption**: Encrypt sensitive configuration data
- **Audit Logging**: Log all configuration changes

---

## 8. Migration Strategy

### 8.1 Migration Phases

**Phase 1: Setup (Weeks 1-2)**
- Set up Angular project
- Install dependencies
- Configure build tools

**Phase 2: Core Components (Weeks 3-4)**
- Implement dynamic components
- Create configuration services
- Set up state management

**Phase 3: Orthodontist Migration (Weeks 5-6)**
- Convert existing features
- Test thoroughly
- Fix bugs

**Phase 4: Additional Specialties (Weeks 7-10)**
- Create specialty configurations
- Test each specialty
- Cross-specialty testing

**Phase 5: Deployment (Weeks 11-12)**
- Testing and QA
- Documentation
- Production deployment

---

## 9. Testing & Quality Assurance

### 9.1 Testing Strategy

- **Unit Tests**: Test individual components and services
- **Integration Tests**: Test component interactions
- **E2E Tests**: Test complete user workflows
- **Configuration Tests**: Validate all configurations

### 9.2 Quality Metrics

- **Code Coverage**: Maintain >80% coverage
- **Performance**: Page load <2s
- **Accessibility**: WCAG 2.1 AA compliance
- **Browser Support**: Modern browsers (last 2 versions)

---

## 10. Deployment & Maintenance

### 10.1 Deployment Strategy

- **Staging Environment**: Test before production
- **Blue-Green Deployment**: Zero-downtime deployments
- **Rollback Plan**: Quick rollback capability
- **Monitoring**: Real-time error tracking

### 10.2 Maintenance Plan

- **Regular Updates**: Monthly dependency updates
- **Performance Monitoring**: Track key metrics
- **User Feedback**: Collect and act on feedback
- **Documentation**: Keep docs up-to-date

---

## 11. Conclusion

This architecture provides a solid foundation for building a scalable, maintainable multi-specialty medical practice management system. The configuration-driven approach ensures flexibility while maintaining code quality and performance.

### Key Benefits

✅ **Single Codebase** for all specialties
✅ **Easy Customization** via JSON configs
✅ **Scalable Architecture** for future growth
✅ **Maintainable Code** with clear separation of concerns
✅ **Fast Development** for new specialties

---

**Document Version**: 1.0.0  
**Last Updated**: 2024  
**Author**: Magic Patterns Architecture Team
