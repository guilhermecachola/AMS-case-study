# REM v1 — Lab 4 (AMS)

## REQ-002 — Mandatory Field Validation

- Stakeholder: Data Steward
- Type: FR
- Priority: H
- Description:
  The system shall validate that all mandatory intake fields are completed before processing.
- Objective:
  Ensure no incomplete data progresses to evaluation.
- Objective Link: OBJ-1
- CSF Link: CSF-1
- Acceptance Criteria:
  - Missing mandatory field → Intake state = Incomplete.
  - Error message identifies each missing field.
  - Intake cannot be marked Ready to Decide while incomplete.
- Validation Method:
  Unit test verifying behavior when required fields are missing.
- Variant impact: Yes

Preconditions:
- Intake form is available.
- Mandatory fields are predefined in system configuration.

Postconditions:
- Intake is classified as Incomplete if fields are missing.
- Validation error is recorded.


---

## REQ-003 — Budget Justification Rule

- Stakeholder: Finance Owner
- Type: FR
- Priority: H
- Description:
  If budget exceeds 100,000€, a justification must be provided.
- Objective:
  Ensure high-budget projects include proper rationale.
- Objective Link: OBJ-2
- CSF Link: CSF-2
- Acceptance Criteria:
  - Budget >100,000€ without justification → Intake state = Invalid.
  - Justification text must contain at least 20 characters.
  - Validation re-executes after justification is added.
- Validation Method:
  Parameterized test with different budget values.
- Variant impact: Yes

Preconditions:
- Budget field contains a numeric value.
- Threshold value (100,000€) is configured.

Postconditions:
- Intake marked Invalid if rule is violated.
- Intake marked valid if justification satisfies rule.


---

## REQ-004 — High Risk Evidence Rule

- Stakeholder: Data Steward
- Type: FR
- Priority: H
- Description:
  If risk level is marked as “High”, at least one supporting document must be attached.
- Objective:
  Ensure high-risk classification is supported by evidence.
- Objective Link: OBJ-2
- CSF Link: CSF-2
- Acceptance Criteria:
  - High risk with no attachment → Invalid.
  - Evidence must include upload date and responsible owner.
  - System prevents Ready to Decide state without evidence.
- Validation Method:
  Unit test verifying attachment presence and metadata.
- Variant impact: Yes

Preconditions:
- Risk level has been selected.

Postconditions:
- Intake classified as Invalid if evidence missing.
- Intake validated successfully when evidence exists.


---

## REQ-005 — Long Duration Planning Rule

- Stakeholder: Project Manager
- Type: FR
- Priority: M
- Description:
  If project duration exceeds 12 months, a milestone plan document must be attached.
- Objective:
  Ensure long-term projects include structured planning.
- Objective Link: OBJ-2
- CSF Link: CSF-2
- Acceptance Criteria:
  - Duration >12 months without milestone plan → Invalid.
  - Uploaded milestone plan must include a version date.
- Validation Method:
  Scenario-based test with varying duration values.
- Variant impact: Yes

Preconditions:
- Project duration is defined in months.

Postconditions:
- Intake marked Invalid if milestone plan missing.


---

## REQ-006 — Incomplete State Classification

- Stakeholder: Data Steward
- Type: FR
- Priority: H
- Description:
  The system shall classify the intake as “Incomplete” when mandatory fields are missing.
- Objective:
  Distinguish missing data from inconsistent data.
- Objective Link: OBJ-1
- CSF Link: CSF-1
- Acceptance Criteria:
  - Missing required field → Intake state = Incomplete.
  - Incomplete intakes cannot transition to Ready to Decide.
- Validation Method:
  Unit test verifying state classification logic.
- Variant impact: Yes

Preconditions:
- Mandatory fields are defined.

Postconditions:
- Intake status updated to Incomplete.


---

## REQ-007 — Invalid State Classification

- Stakeholder: Quality Manager
- Type: FR
- Priority: H
- Description:
  The system shall classify the intake as “Invalid” when cross-field validation rules fail.
- Objective:
  Prevent inconsistent data from progressing.
- Objective Link: OBJ-2
- CSF Link: CSF-2
- Acceptance Criteria:
  - Cross-field rule violation → Intake state = Invalid.
  - Failed rule is logged.
- Validation Method:
  Rule-based validation unit test.
- Variant impact: Yes

Preconditions:
- Cross-field validation rules are defined.

Postconditions:
- Intake marked Invalid.
- Validation log updated.


---

## NFR-002 — Validation Performance

- Stakeholder: Operations
- Type: NFR
- Priority: M
- Description:
  Validation shall complete in ≤ 2 seconds for 95% of submissions under normal operational load (≤ 50 concurrent submissions).
- Objective:
  Ensure timely validation feedback.
- Objective Link: OBJ-3
- CSF Link: CSF-3
- Acceptance Criteria:
  - 95% of validation executions complete within 2 seconds.
- Validation Method:
  Performance measurement tests with timing instrumentation.
- Variant impact: No


---

## NFR-003 — Error Message Clarity

- Stakeholder: End User
- Type: NFR
- Priority: H
- Description:
  Validation error messages shall explicitly identify the field and violated rule.
- Objective:
  Enable users to correct invalid submissions efficiently.
- Objective Link: OBJ-3
- CSF Link: CSF-3
- Acceptance Criteria:
  - Error message includes field name.
  - Error message references the violated validation rule.
- Validation Method:
  Functional test verifying error message format.
- Variant impact: Yes