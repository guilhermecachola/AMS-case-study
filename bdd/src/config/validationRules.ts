export const CURRENT_OWNER = "Current User";
export const BUDGET_JUSTIFICATION_THRESHOLD = 100_000;
export const MIN_JUSTIFICATION_LENGTH = 20;
export const ALLOWED_FILE_TYPES = ["PDF", "DOCX"] as const;
export const STORAGE_KEY = "slice-b-submissions";

export const VALIDATION_RULES = {
  mandatoryFields: "REQ-002 Mandatory Field Validation",
  budgetJustification: "REQ-003 Budget Justification Rule",
  highRiskEvidence: "REQ-004 High Risk Evidence Rule",
  invalidState: "REQ-007 Invalid State Classification",
  evidenceMetadata: "NFR-004 Evidence Metadata Requirement",
} as const;
