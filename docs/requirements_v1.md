# Requirements v1 — Lab 3 (AMS)

## EPIC-1 — Intake Submission & Mandatory Validation

### REQ-001 — Intake Submission
**Description:**  
The system shall allow submission of an intake form containing project metadata (name, budget, risk level, duration, integrations).

**Objective:**  
Ensure structured collection of essential project information.

**Acceptance Criteria (draft):**
- Intake cannot be submitted without mandatory fields.
- Submitted data is stored for validation processing.
- System assigns an intake identifier.

**Variant impact:** No


### REQ-002 — Mandatory Field Validation
**Description:**  
The system shall validate that all mandatory fields are completed before processing the intake.

**Objective:**  
Prevent incomplete submissions from progressing.

**Acceptance Criteria (draft):**
- Missing required fields trigger an “Incomplete” state.
- Error message identifies each missing field.
- Submission cannot proceed while incomplete.

**Variant impact:** Yes


---

## EPIC-2 — Cross-Field Consistency Rules (Variant Core)

### REQ-003 — Budget Justification Rule
**Description:**  
If budget exceeds 100,000€, the system shall require a justification field to be completed.

**Objective:**  
Ensure high-budget projects are supported by rationale.

**Acceptance Criteria (draft):**
- Budget >100,000€ without justification → status = Invalid.
- Justification field must contain at least 20 characters.
- When justification is added, validation re-runs automatically.

**Variant impact:** Yes


### REQ-004 — High Risk Evidence Rule
**Description:**  
If risk level is marked as “High”, at least one supporting evidence document must be attached.

**Objective:**  
Ensure risk classification is supported by documentation.

**Acceptance Criteria (draft):**
- High risk without attachment → Invalid.
- At least one document is required.
- Evidence metadata (date + owner) must be provided.

**Variant impact:** Yes


### REQ-005 — Long Duration Planning Rule
**Description:**  
If project duration exceeds 12 months, a milestone plan document must be attached.

**Objective:**  
Ensure long-term initiatives have structured planning.

**Acceptance Criteria (draft):**
- Duration >12 months without milestone plan → Invalid.
- Uploaded milestone plan must include a version date.
- Revalidation occurs after document upload.

**Variant impact:** Yes


---

## EPIC-3 — Intake State Classification

### REQ-006 — Incomplete State
**Description:**  
The system shall classify the intake as “Incomplete” when mandatory fields are missing.

**Objective:**  
Differentiate missing data from inconsistent data.

**Acceptance Criteria (draft):**
- Missing required field → Incomplete.
- Incomplete intakes cannot be marked Ready to Decide.
- Error summary is displayed.

**Variant impact:** Yes


### REQ-007 — Invalid State
**Description:**  
The system shall classify the intake as “Invalid” when cross-field validation rules fail.

**Objective:**  
Ensure inconsistent or contradictory data is clearly identified.

**Acceptance Criteria (draft):**
- Cross-field rule violation → Invalid.
- Invalid intakes cannot move forward.
- Validation log records the failed rule.

**Variant impact:** Yes


### REQ-008 — Ready to Decide Classification
**Description:**  
The system shall classify the intake as “Ready to Decide” only when all validation rules pass.

**Objective:**  
Ensure decision-making occurs only on consistent data.

**Acceptance Criteria (draft):**
- No missing mandatory fields.
- No cross-field rule violations.
- All required documents attached.

**Variant impact:** Yes


---

# Non-Functional Requirements

### NFR-001 — Deterministic Validation
Validation results shall be deterministic: identical input shall always produce identical validation outcomes.

**Variant impact:** Yes


### NFR-002 — Validation Performance (Measurable)
Validation processing shall complete in ≤ 2 seconds for 95% of submissions under normal operational load (≤ 50 concurrent submissions).  
Measurement: automated timing tests.

**Variant impact:** No


### NFR-003 — Error Message Clarity
Validation error messages shall explicitly identify the field and violated rule.

**Variant impact:** Yes


### NFR-004 — Evidence Metadata Requirement (Measurable)
Evidence documents shall include metadata (upload date and responsible owner). Submissions missing metadata shall be rejected.  
Measurement: validation rule check.

**Variant impact:** Yes


### NFR-005 — Validation Rule Centralization
All validation rules shall be centrally defined and documented in a single configuration module.

**Variant impact:** Yes


### NFR-006 — Availability (Measurable)
The intake validation service shall maintain 99% availability per calendar month.  
Measurement: system uptime logs.

**Variant impact:** No