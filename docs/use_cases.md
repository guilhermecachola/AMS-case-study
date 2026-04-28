# Use Cases — Lab 5

## UC-04 — Execute Cross-Field Consistency Checks
- **Primary actor:** System / Data Steward
- **Goal:** Ensure data consistency across multiple fields and attached evidence.
- **Preconditions:** Mandatory fields are completed (State != Incomplete).
- **Trigger:** Submission of intake or document upload.
- **Postconditions (success):** State changed to "Ready to Decide" (REQ-008).
- **Postconditions (failure):** State changed to "Invalid" (REQ-007).
- **Related requirements:** REQ-003, REQ-004, REQ-005, REQ-007

### Main flow (happy path)
1. System checks Project Budget.
2. Budget <= 100k OR (Budget > 100k AND Justification length >= 20 chars).
3. System checks Risk Level.
4. Risk != "High" OR (Risk == "High" AND at least one Evidence file exists).
5. System checks Project Duration.
6. Duration <= 12 months OR (Duration > 12 months AND Milestone Plan exists).
7. System marks Intake as "Ready to Decide".

### Alternative flows
A1. **Validation Re-run:** If a user uploads a missing document for an "Invalid" intake, the system automatically re-triggers these steps.

### Exceptions / errors
E1. **Rule Violation:** If any condition in steps 2, 4, or 6 fails, the system logs the specific rule violation (NFR-003) and sets the state to "Invalid".

---

## UC-05 — Flag Intake as "Invalid State"
- **Primary actor:** Data Steward
- **Goal:** Identify and isolate intakes that violate quality rules to prevent decision-making on bad data.
- **Preconditions:** Validation engine has detected a cross-field discrepancy.
- **Trigger:** Cross-field validation failure.
- **Postconditions (success):** Intake is locked from further progression until fixed.
- **Postconditions (failure):** Intake remains in an uncertain state.
- **Related requirements:** REQ-007, REQ-008, NFR-003

### Main flow
1. System detects a rule violation (e.g., High Risk without Evidence).
2. System blocks the "Ready to Decide" transition.
3. System records the failure in the Validation Log.
4. Data Steward receives a notification/view of the "Invalid" intake.
5. System displays the clear error message (NFR-003) to the Contributor.

### Exceptions / errors
E1. **Missing Metadata:** If a document is uploaded but lacks "Date" or "Owner", the system flags it as Invalid (NFR-004).
