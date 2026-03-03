# Objectives & Critical Success Factors (CSFs) — Lab 4

## Variant
- Variant number: 4
- Persona: Data Steward / Quality Manager
- Key constraint focus: Data validation and cross-field consistency

---

## Objectives (3)

### OBJ-1 — Ensure Complete Intake Submissions
- Description (why/outcome): Ensure that all required intake information is provided before evaluation begins.
- Stakeholders impacted: Data Steward, Transition Lead
- Success signal (how we know): No intake marked “Ready to Decide” contains missing mandatory fields.
- Variant-driven: Yes

---

### OBJ-2 — Enforce Cross-Field Consistency
- Description: Detect and prevent contradictory or unsupported data combinations within the intake form.
- Stakeholders impacted: Quality Manager, Project Manager
- Success signal: All defined cross-field validation rules are automatically enforced and violations result in an “Invalid” state.
- Variant-driven: Yes

---

### OBJ-3 — Provide Transparent Intake Status Classification
- Description: Ensure every intake submission has a clear, traceable validation status (Incomplete, Invalid, Ready to Decide).
- Stakeholders impacted: Transition Lead, Operations
- Success signal: Every submission is assigned exactly one validation state with documented reasoning.
- Variant-driven: No

---

## Critical Success Factors (3)

### CSF-1 — Mandatory Data Completeness
- Linked objective: OBJ-1
- Definition (what must go right): All mandatory fields must be validated and missing information must block progression.
- Evidence (how we check): System logs show automatic classification as “Incomplete” when required fields are missing.
- Variant-driven: Yes

Linked requirements (3–5):
- REQ-001
- REQ-002
- REQ-006
- REQ-008

---

### CSF-2 — Cross-Field Validation Enforcement
- Linked objective: OBJ-2
- Definition: All defined cross-field rules (budget, risk, duration) must be automatically validated before classification.
- Evidence: Validation results show “Invalid” status when rule conditions are violated.
- Variant-driven: Yes

Linked requirements (3–5):
- REQ-003
- REQ-004
- REQ-005
- REQ-007

---

### CSF-3 — Clear Validation Feedback
- Linked objective: OBJ-3
- Definition: The system must clearly indicate why an intake is Incomplete or Invalid.
- Evidence: Error messages explicitly identify the violated field and rule.
- Variant-driven: Yes

Linked requirements (3–5):
- REQ-006
- REQ-007
- REQ-008
- NFR-003