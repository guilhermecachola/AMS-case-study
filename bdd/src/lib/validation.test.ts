import { describe, expect, it } from "vitest";
import { validateIntake } from "./validation";
import type { IntakeFormData } from "../types";

const createBaseData = (): IntakeFormData => ({
  projectName: "Audit Modernization",
  budget: "50000",
  riskLevel: "Low",
  justification: "",
  evidence: [],
});

describe("validateIntake", () => {
  it("returns Incomplete when mandatory fields are missing", () => {
    const result = validateIntake({
      ...createBaseData(),
      projectName: "",
      budget: "",
    });

    expect(result.status).toBe("Incomplete");
    expect(result.issues).toHaveLength(2);
  });

  it("returns Invalid when high budget has a short justification", () => {
    const result = validateIntake({
      ...createBaseData(),
      budget: "125000",
      justification: "too short",
    });

    expect(result.status).toBe("Invalid");
    expect(result.issues.some((issue) => issue.field === "justification")).toBe(true);
  });

  it("returns Invalid when high risk has no evidence", () => {
    const result = validateIntake({
      ...createBaseData(),
      riskLevel: "High",
    });

    expect(result.status).toBe("Invalid");
    expect(result.issues.some((issue) => issue.field === "evidence")).toBe(true);
  });

  it("returns Ready to Decide when all rules pass", () => {
    const result = validateIntake({
      ...createBaseData(),
      budget: "125000",
      justification: "This budget covers audit tooling, migration and training.",
      riskLevel: "High",
      evidence: [
        {
          id: "1",
          fileName: "risk-assessment.pdf",
          fileType: "PDF",
          metadata: {
            uploadDate: "2026-04-28T08:00:00.000Z",
            owner: "Current User",
          },
        },
      ],
    });

    expect(result.status).toBe("Ready to Decide");
    expect(result.issues).toHaveLength(0);
  });
});
