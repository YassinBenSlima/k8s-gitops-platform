# Cardiology Project - Tables, Fields, and Relationships Explanation

This document explains each table/class present in the generated diagram in docs/cardiology-class-diagram.md.

## 1) Patient
Purpose:
- Master patient profile and global selection context used by all modules.

Key fields:
- id (string): unique patient identifier.
- name (string): display and join key used in many modules.
- age (number), gender (M/F).
- dossier (string): chart/record number.
- riskLevel (Faible/Modere/Eleve/Critique).
- diagnosis (string): primary condition summary.
- insurance? (string): optional insurer/mutuelle.
- lastVisit (string): last consultation date.

Relationships:
- 1:N with PatientProtocol, ECGRecord, ImagingStudy, BillingRecord, FSERecord, CardioFSE, CardioInsurance, PaymentLink, PaymentPlan, DevisRecord.
- Note: In current codebase, relationship is mostly by patient name string (semantic relation), not strict FK id.

## 2) Protocol
Purpose:
- Defines standard care pathway templates.

Key fields:
- id (string): protocol id.
- name, category, description.
- steps (number), stepDetails (detailed stage list).
- duration, status (active/draft/archived).
- activePatients, completedPatients.

Relationships:
- 1:N with PatientProtocol via protocol name.

## 3) PatientProtocol
Purpose:
- Tracks protocol execution progress for a patient.

Key fields:
- id (string).
- patient (string), protocol (string).
- currentStep, totalSteps, progress.
- startDate, nextAction.
- status (on_track/delayed/completed/paused).

Relationships:
- N:1 to Patient (semantic by patient).
- N:1 to Protocol (semantic by protocol).

## 4) CardiacAnomaly
Purpose:
- Captures anomaly detected by diagnostics workflows.

Key fields:
- id (string), type (string).
- severity (faible/moderee/severe).
- location, description.
- detected (datetime/string), confidence (number).

Relationships:
- 1:N with FollowUpPlan via anomalyId.

## 5) FollowUpPlan
Purpose:
- Planned follow-up actions generated from detected anomalies.

Key fields:
- id (string), anomalyId (string).
- anomalyType, severity.
- scheduledDate, scheduledTime.
- followUpType, specialist, channel.
- reminderDays, notes.
- createdAt, updatedAt.

Relationships:
- N:1 to CardiacAnomaly via anomalyId.

## 6) TreatmentPlan
Purpose:
- Active/planned therapeutic plan in diagnostics module.

Key fields:
- id, title, category.
- priority (urgent/elevee/normale/surveillance).
- status (en_cours/planifie/termine).
- startDate, duration, nextReview.
- medications[] and procedures[].

Relationships:
- N:1 to Patient context (operational relationship by selected/current patient).

## 7) ECGRecord
Purpose:
- Stores ECG exam summary and interpretation data.

Key fields:
- id, patient, age, date, time.
- type (Repos/Holter/Effort...), cardiologue.
- status (Normal/Anormal/Critique).
- heartRate, prInterval, qrsDuration, qtInterval.
- diagnosis, recommendations[], notes.
- ecgImageSrc? (optional waveform image).

Relationships:
- N:1 to Patient (semantic by patient).
- 1:N with ECGImageAnnotation.

## 8) ECGImageAnnotation
Purpose:
- Geometric/text marks over ECG images.

Key fields:
- id, type (rect/circle/line/arrow/freehand/text).
- color, strokeWidth.
- x, y and optional geometry fields (width/height/endX/endY).
- text?, points?.

Relationships:
- N:1 to ECGRecord.

## 9) ImagingStudy
Purpose:
- Cardiac imaging study entity (Echo, IRM, Scanner, Angiographie).

Key fields:
- id (number), patient (string), age.
- modality, date.
- ef?, lvDimension?, wallThickness?.
- findings, severity, status.
- aiFindings[].
- dicomFile?, dicomImageUrl?.

Relationships:
- N:1 to Patient.
- 1:N with DicomTag.
- 1:0..1 with DicomMeta.

## 10) DicomTag
Purpose:
- Flexible DICOM tag storage for each imaging study.

Key fields:
- tag, name, vr, value.

Relationships:
- N:1 to ImagingStudy.

## 11) DicomMeta
Purpose:
- Structured DICOM metadata header mapped into explicit fields.

Key fields:
- patientName, patientId, patientBirthDate, patientSex.
- studyDate, studyTime, studyDescription, seriesDescription.
- modality, institutionName.
- rows, columns, bitsAllocated.
- windowCenter, windowWidth, transferSyntax.

Relationships:
- 1:1 (optional) to ImagingStudy.

## 12) BillingRecord
Purpose:
- Core billing transaction for cardiology acts.

Key fields:
- id (number), patient, date.
- procedure, cptCode.
- amount (after any applied discount in UI flow).
- insurance.
- status (validated/pending/rejected).

Relationships:
- N:1 to Patient.
- N:1 to CPTCode via cptCode.
- N:1 to InsuranceProvider via insurance.

## 13) CPTCode
Purpose:
- Price and classification catalog for billable acts.

Key fields:
- code (string), description.
- price (number).
- category (ECG, Imagerie, etc.).

Relationships:
- 1:N with BillingRecord.

## 14) InsuranceProvider
Purpose:
- Performance statistics by payer/organism.

Key fields:
- name.
- acceptanceRate.
- avgProcessingDays.
- pendingClaims.
- color.

Relationships:
- 1:N with BillingRecord (semantic by insurance name).

## 15) FSERecord
Purpose:
- Generic feuille de soins electronique record for reimbursement tracking.

Key fields:
- id, patient, date, act.
- amount.
- organism.
- reimbursementStatus.
- reimbursementDate.

Relationships:
- N:1 to Patient.

## 16) CardioFSE
Purpose:
- Cardiology-specific FSE record used in insurance sub-tabs.

Key fields:
- id, patient, date.
- mutuelle.
- amount.
- status (sent/processing/reimbursed/rejected).

Relationships:
- N:1 to Patient.
- 1:N with CardioReimbursement (via fseRef).

## 17) CardioReimbursement
Purpose:
- Reimbursement ledger tied to cardio FSE submissions.

Key fields:
- id, patient, date, mutuelle.
- reimbursedAmount, originalAmount.
- coverage (string).
- fseRef (reference to CardioFSE.id).

Relationships:
- N:1 to CardioFSE via fseRef.
- N:1 to Patient.

## 18) CardioInsurance
Purpose:
- Patient coverage profile and annual limit consumption.

Key fields:
- patient, mutuelle.
- coverageType, coverageRate.
- annualLimit, remainingLimit.
- status (active/inactive/expired).

Relationships:
- N:1 to Patient.

## 19) PaymentLink
Purpose:
- Payment URL generated for patient billing settlement.

Key fields:
- id, patient.
- amount.
- createdDate.
- status (active/expired/used).
- link.

Relationships:
- N:1 to Patient.

## 20) PaymentPlan
Purpose:
- Installment plan for larger amounts.

Key fields:
- id, patient.
- totalAmount, monthlyAmount.
- duration, paidMonths.
- status (active/completed/late).

Relationships:
- N:1 to Patient.

## 21) DevisRecord
Purpose:
- Quotation/estimate before treatment and billing.

Key fields:
- id, number.
- patient, date.
- acts.
- totalAmount.
- status (accepted/pending/rejected).

Relationships:
- N:1 to Patient.

## Relationship Summary
- Patient is the central hub entity across clinical, imaging, pathway, and billing domains.
- BillingRecord is linked to CPTCode and InsuranceProvider by semantic keys (cptCode/name).
- ImagingStudy contains optional, nested DICOM structures (DicomTag and DicomMeta).
- Diagnostics follow-up chain: CardiacAnomaly -> FollowUpPlan.
- Reimbursement chain: CardioFSE -> CardioReimbursement.

## Important Modeling Note
Current interfaces are primarily frontend domain contracts and UI state models. For a production relational database schema, recommended next step is to:
- Introduce technical PK/FK columns (patientId, protocolId, cptCodeId, insuranceProviderId).
- Keep human-readable labels (patient name, protocol name) as denormalized display columns.
- Add audit columns systematically (createdAt, updatedAt, createdBy).
