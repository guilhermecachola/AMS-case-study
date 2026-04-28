export type RiskLevel = "Low" | "High";

export type IntakeStatus = "Incomplete" | "Invalid" | "Ready to Decide";

export type EvidenceFileType = "PDF" | "DOCX";

export interface EvidenceMetadata {
  uploadDate: string;
  owner: string;
}

export interface EvidenceRecord {
  id: string;
  fileName: string;
  fileType: EvidenceFileType;
  metadata: EvidenceMetadata;
}

export interface IntakeFormData {
  projectName: string;
  budget: string;
  riskLevel: RiskLevel;
  justification: string;
  evidence: EvidenceRecord[];
}

export interface ValidationIssue {
  field: string;
  rule: string;
  message: string;
}

export interface ValidationResult {
  status: IntakeStatus;
  issues: ValidationIssue[];
  validationLog: string[];
  validatedInMs: number;
}

export interface SavedSubmission {
  intakeId: string;
  savedAt: string;
  data: IntakeFormData;
  validation: ValidationResult;
}
