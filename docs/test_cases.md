# Test Cases — Lab 9

## TC-001 — Happy Path: Standard Submission
- **Type:** System / Acceptance
- **Priority:** H
- **Related requirements:** REQ-001, REQ-002
- **Preconditions:** System is at the intake form page.
- **Test data:** Name: "Test Project", Budget: "50000", Risk: "Low".
- **Steps:**
  1. Fill all mandatory fields with valid data.
  2. Click "Validate".
  3. Click "Submit".
- **Expected results:**
  - Validation status changes to "Ready to Decide".
  - Success message with Intake ID is displayed.

## TC-002 — Negative Path: Missing Mandatory Fields
- **Type:** System
- **Priority:** H
- **Related requirements:** REQ-002, REQ-006
- **Preconditions:** Form is empty.
- **Steps:**
  1. Leave "Project Name" empty.
  2. Fill Budget with "1000".
  3. Click "Validate".
- **Expected results:**
  - Validation status is "Incomplete".
  - Field "Project Name" is highlighted with an error message.

## TC-003 — Alternative Flow: High Budget Justification
- **Type:** Acceptance
- **Priority:** M
- **Related requirements:** REQ-003
- **Preconditions:** Budget is above 100,000€.
- **Steps:**
  1. Enter Budget "150000".
  2. Verify that "Justification" field appears.
  3. Enter 25 characters in justification.
  4. Click "Validate".
- **Expected results:**
  - System accepts justification and marks as "Ready to Decide" (if other fields are OK).

## TC-004 — Negative Path: High Risk without Evidence
- **Type:** System
- **Priority:** H
- **Related requirements:** REQ-004, REQ-007
- **Preconditions:** Risk Level is set to "High".
- **Steps:**
  1. Select Risk Level "High".
  2. Do NOT upload any file.
  3. Click "Validate".
- **Expected results:**
  - Status is "Invalid".
  - Error log specifies: "Evidence required for High Risk projects".

## TC-005 — Alternative Flow: Valid High Risk Submission
- **Type:** System
- **Priority:** H
- **Related requirements:** REQ-004
- **Steps:**
  1. Select Risk Level "High".
  2. Upload a valid PDF file.
  3. Click "Validate".
- **Expected results:**
  - System accepts the upload.
  - Status becomes "Ready to Decide".

## TC-006 — Performance: Validation Speed (NFR)
- **Type:** System
- **Priority:** M
- **Related requirements:** NFR-002
- **Steps:**
  1. Fill a complete valid form.
  2. Click "Validate" while monitoring the "Validated in Ms" timer.
- **Expected results:**
  - The time measured must be ≤ 2000ms (2 seconds).

## TC-007 — Audit: Evidence Metadata Capture
- **Type:** System
- **Priority:** M
- **Related requirements:** NFR-004
- **Steps:**
  1. Upload any PDF/DOCX file.
  2. Inspect the attached file list.
- **Expected results:**
  - File shows "Upload Date" (current date).
  - File shows "Responsible Owner" (Current User/Admin).

## TC-008 — Boundary Test: Minimum Justification Length
- **Type:** System
- **Priority:** L
- **Related requirements:** REQ-003
- **Steps:**
  1. Set Budget to "100001".
  2. Enter exactly 19 characters in Justification.
  3. Click "Validate".
  4. Add 1 more character (total 20).
  5. Click "Validate".
- **Expected results:**
  - At 19 chars: Status "Invalid" (Too short).
  - At 20 chars: Status "Ready to Decide".