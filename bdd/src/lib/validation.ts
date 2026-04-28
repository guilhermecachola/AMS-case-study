import {
  BUDGET_JUSTIFICATION_THRESHOLD,
  MIN_JUSTIFICATION_LENGTH,
  VALIDATION_RULES,
} from "../config/validationRules";
import type { IntakeFormData, ValidationIssue, ValidationResult } from "../types";

const addIssue = (
  issues: ValidationIssue[],
  validationLog: string[],
  field: string,
  rule: string,
  message: string,
) => {
  issues.push({ field, rule, message });
  validationLog.push(`${rule}: ${message}`);
};

export const validateIntake = (data: IntakeFormData): ValidationResult => {
  const startedAt = performance.now();
  const issues: ValidationIssue[] = [];
  const validationLog: string[] = [];

  if (!data.projectName.trim()) {
    addIssue(
      issues,
      validationLog,
      "projectName",
      VALIDATION_RULES.mandatoryFields,
      "Project Name is required.",
    );
  }

  if (!data.budget.trim()) {
    addIssue(
      issues,
      validationLog,
      "budget",
      VALIDATION_RULES.mandatoryFields,
      "Budget is required.",
    );
  }

  const numericBudget = Number(data.budget);
  if (data.budget.trim() && Number.isNaN(numericBudget)) {
    addIssue(
      issues,
      validationLog,
      "budget",
      VALIDATION_RULES.mandatoryFields,
      "Budget must be a valid numeric value.",
    );
  }

  const hasMissingMandatoryFields = issues.some(
    (issue) => issue.rule === VALIDATION_RULES.mandatoryFields,
  );

  if (!hasMissingMandatoryFields && numericBudget > BUDGET_JUSTIFICATION_THRESHOLD) {
    if (data.justification.trim().length < MIN_JUSTIFICATION_LENGTH) {
      addIssue(
        issues,
        validationLog,
        "justification",
        VALIDATION_RULES.budgetJustification,
        `Justification must contain at least ${MIN_JUSTIFICATION_LENGTH} characters when budget exceeds 100000 EUR.`,
      );
    }
  }

  if (data.riskLevel === "High" && data.evidence.length === 0) {
    addIssue(
      issues,
      validationLog,
      "evidence",
      VALIDATION_RULES.highRiskEvidence,
      "At least one evidence document is required for High risk submissions.",
    );
  }

  data.evidence.forEach((item, index) => {
    if (!item.metadata.uploadDate) {
      addIssue(
        issues,
        validationLog,
        `evidence[${index}].uploadDate`,
        VALIDATION_RULES.evidenceMetadata,
        `Evidence ${item.fileName} is missing Upload Date metadata.`,
      );
    }

    if (!item.metadata.owner.trim()) {
      addIssue(
        issues,
        validationLog,
        `evidence[${index}].owner`,
        VALIDATION_RULES.evidenceMetadata,
        `Evidence ${item.fileName} is missing Responsible Owner metadata.`,
      );
    }
  });

  const status =
    hasMissingMandatoryFields
      ? "Incomplete"
      : issues.length > 0
        ? "Invalid"
        : "Ready to Decide";

  return {
    status,
    issues,
    validationLog:
      validationLog.length > 0
        ? validationLog
        : ["All mandatory and cross-field validation rules passed."],
    validatedInMs: Math.round((performance.now() - startedAt) * 100) / 100,
  };
};
