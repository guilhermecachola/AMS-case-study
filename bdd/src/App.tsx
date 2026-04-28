import { useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  ALLOWED_FILE_TYPES,
  BUDGET_JUSTIFICATION_THRESHOLD,
  CURRENT_OWNER,
} from "./config/validationRules";
import { loadSubmissions, saveSubmission } from "./lib/storage";
import { validateIntake } from "./lib/validation";
import type {
  EvidenceFileType,
  EvidenceRecord,
  IntakeFormData,
  SavedSubmission,
  ValidationResult,
} from "./types";

const createEmptyForm = (): IntakeFormData => ({
  projectName: "",
  budget: "",
  riskLevel: "Low",
  justification: "",
  evidence: [],
});

const createInitialValidation = (): ValidationResult => ({
  status: "Incomplete",
  issues: [],
  validationLog: ["Validation has not run yet."],
  validatedInMs: 0,
});

const buildEvidenceRecord = (file: File): EvidenceRecord => ({
  id: crypto.randomUUID(),
  fileName: file.name,
  fileType: file.name.toLowerCase().endsWith(".docx") ? "DOCX" : "PDF",
  metadata: {
    uploadDate: new Date().toISOString(),
    owner: CURRENT_OWNER,
  },
});

const getStatusTone = (status: ValidationResult["status"]) => {
  if (status === "Ready to Decide") {
    return "ready";
  }

  if (status === "Invalid") {
    return "invalid";
  }

  return "incomplete";
};

function App() {
  const [form, setForm] = useState<IntakeFormData>(createEmptyForm);
  const [validation, setValidation] = useState<ValidationResult>(createInitialValidation);
  const [submissions, setSubmissions] = useState<SavedSubmission[]>(() => loadSubmissions());
  const [lastIntakeId, setLastIntakeId] = useState<string | null>(null);

  const liveValidation = useMemo(() => validateIntake(form), [form]);
  const statusTone = getStatusTone(validation.status);
  const showJustification = Number(form.budget) > BUDGET_JUSTIFICATION_THRESHOLD;
  const errorMap = useMemo(() => {
    return liveValidation.issues.reduce<Record<string, string>>((acc, issue) => {
      if (!acc[issue.field]) {
        acc[issue.field] = issue.message;
      }
      return acc;
    }, {});
  }, [liveValidation.issues]);

  const updateField = <K extends keyof IntakeFormData>(field: K, value: IntakeFormData[K]) => {
    setForm((current) => {
      const updated = { ...current, [field]: value };

      if (field === "budget" && Number(value) <= BUDGET_JUSTIFICATION_THRESHOLD) {
        updated.justification = "";
      }

      if (field === "riskLevel" && value === "Low") {
        updated.evidence = [];
      }

      return updated;
    });
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);

    if (selectedFiles.length === 0) {
      return;
    }

    const validFiles = selectedFiles.filter((file) => {
      const extension = file.name.split(".").pop()?.toUpperCase();
      return extension && ALLOWED_FILE_TYPES.includes(extension as EvidenceFileType);
    });

    if (validFiles.length > 0) {
      setForm((current) => ({
        ...current,
        evidence: [...current.evidence, ...validFiles.map(buildEvidenceRecord)],
      }));
    }

    event.target.value = "";
  };

  const handleValidate = () => {
    setValidation(validateIntake(form));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = validateIntake(form);
    setValidation(result);

    if (result.status !== "Ready to Decide") {
      return;
    }

    const submission: SavedSubmission = {
      intakeId: `INTAKE-${Date.now()}`,
      savedAt: new Date().toISOString(),
      data: form,
      validation: result,
    };

    setSubmissions(saveSubmission(submission));
    setLastIntakeId(submission.intakeId);
    setForm(createEmptyForm());
    setValidation({
      ...result,
      validationLog: [`Submission stored successfully with ID ${submission.intakeId}.`],
    });
  };

  return (
    <main className="app-shell">
      <section className="hero">
        <h1>Slice B - Evidence Metadata Intake</h1>
        <p>
          Captura de metadados de evidencias com validacao centralizada para regras
          obrigatorias, justificacao de budget e anexo obrigatorio em risco High.
        </p>
      </section>

      <div className="layout">
        <form className={`card form-card status-${statusTone}`} onSubmit={handleSubmit}>
          <div className="section-title">
            <h2>Project Submission</h2>
            <span className={`pill ${statusTone}`}>
              {validation.status}
            </span>
          </div>

          <div className="grid">
            <div className={`field ${errorMap.projectName ? "has-error" : ""}`}>
              <label htmlFor="projectName">Project Name</label>
              <input
                id="projectName"
                value={form.projectName}
                onChange={(event) => updateField("projectName", event.target.value)}
                placeholder="Fraud Detection Upgrade"
              />
              {errorMap.projectName ? (
                <span className="error-text">{errorMap.projectName}</span>
              ) : (
                <span className="hint">Mandatory field for REQ-002.</span>
              )}
            </div>

            <div className={`field ${errorMap.budget ? "has-error" : ""}`}>
              <label htmlFor="budget">Budget (EUR)</label>
              <input
                id="budget"
                value={form.budget}
                onChange={(event) => updateField("budget", event.target.value)}
                placeholder="125000"
                inputMode="numeric"
              />
              {errorMap.budget ? (
                <span className="error-text">{errorMap.budget}</span>
              ) : (
                <span className="hint">Mandatory field. Over 100000 EUR requires justification.</span>
              )}
            </div>

            <div className="field">
              <label htmlFor="riskLevel">Risk Level</label>
              <select
                id="riskLevel"
                value={form.riskLevel}
                onChange={(event) => updateField("riskLevel", event.target.value as IntakeFormData["riskLevel"])}
              >
                <option value="Low">Low</option>
                <option value="High">High</option>
              </select>
              <span className="hint">High risk triggers mandatory evidence validation.</span>
            </div>

            <div className="field">
              <label>Current Owner</label>
              <input value={CURRENT_OWNER} readOnly />
              <span className="hint">Owner is captured automatically for audit metadata.</span>
            </div>

            {showJustification ? (
              <div className={`field full ${errorMap.justification ? "has-error" : ""}`}>
                <label htmlFor="justification">Budget Justification</label>
                <textarea
                  id="justification"
                  value={form.justification}
                  onChange={(event) => updateField("justification", event.target.value)}
                  placeholder="Explain why this project requires a high budget..."
                />
                {errorMap.justification ? (
                  <span className="error-text">{errorMap.justification}</span>
                ) : (
                  <span className="hint">Minimum 20 characters when budget exceeds threshold.</span>
                )}
              </div>
            ) : null}

            <div className={`field full ${errorMap.evidence ? "has-error" : ""}`}>
              <label htmlFor="evidenceUpload">Evidence Upload</label>
              <div className="evidence-box">
                <input
                  id="evidenceUpload"
                  type="file"
                  accept=".pdf,.docx"
                  multiple
                  onChange={handleFileUpload}
                />
                <span className="hint">
                  Accepted types: PDF and DOCX. Upload Date and Responsible Owner are auto-captured.
                </span>

                {errorMap.evidence ? <span className="error-text">{errorMap.evidence}</span> : null}

                <ul className="evidence-list">
                  {form.evidence.length === 0 ? (
                    <li className="evidence-item">
                      <strong>No evidence attached</strong>
                      <span className="evidence-meta">
                        Evidence becomes mandatory only when Risk Level is High.
                      </span>
                    </li>
                  ) : (
                    form.evidence.map((item) => (
                      <li className="evidence-item" key={item.id}>
                        <strong>
                          {item.fileName} ({item.fileType})
                        </strong>
                        <span className="evidence-meta">
                          Upload Date: {new Date(item.metadata.uploadDate).toLocaleString()}
                        </span>
                        <span className="evidence-meta">
                          Responsible Owner: {item.metadata.owner}
                        </span>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>

          <div className="actions">
            <button className="button secondary" type="button" onClick={handleValidate}>
              Validate
            </button>
            <button
              className="button primary"
              type="submit"
              disabled={liveValidation.status !== "Ready to Decide"}
            >
              Submit Intake
            </button>
          </div>

          <section className="feedback">
            <h3>Validation Summary</h3>
            <p>
              Live state: <strong>{liveValidation.status}</strong> | Last measured validation time:{" "}
              <strong>{validation.validatedInMs.toFixed(2)} ms</strong>
            </p>

            {validation.issues.length > 0 ? (
              <>
                <h4>Issues</h4>
                <ul>
                  {validation.issues.map((issue) => (
                    <li key={`${issue.field}-${issue.rule}`}>{issue.message}</li>
                  ))}
                </ul>
              </>
            ) : null}

            <h4>Validation Log</h4>
            <ul>
              {validation.validationLog.map((entry) => (
                <li key={entry}>{entry}</li>
              ))}
            </ul>
          </section>
        </form>

        <aside className="side-stack">
          <section className="card side-card">
            <h3>Slice B Coverage</h3>
            <div className="metric">
              <span>REQ-002</span>
              <span>Mandatory fields</span>
            </div>
            <div className="metric">
              <span>REQ-003</span>
              <span>Justification on high budget</span>
            </div>
            <div className="metric">
              <span>REQ-004</span>
              <span>Evidence for High risk</span>
            </div>
            <div className="metric">
              <span>REQ-007</span>
              <span>Invalid state + validation log</span>
            </div>
            <div className="metric">
              <span>NFR-004</span>
              <span>Metadata: date and owner</span>
            </div>
            <div className="metric">
              <span>NFR-002</span>
              <span>Measured UI feedback under 2s</span>
            </div>
          </section>

          <section className="card side-card">
            <h3>Latest Submission</h3>
            {lastIntakeId ? (
              <p>{lastIntakeId} was stored in local storage.</p>
            ) : (
              <p>No successful submission yet.</p>
            )}
          </section>

          <section className="card side-card">
            <h3>Stored Submissions</h3>
            <ul className="submission-list">
              {submissions.length === 0 ? (
                <li className="submission-item">No submissions saved yet.</li>
              ) : (
                submissions.map((submission) => (
                  <li className="submission-item" key={submission.intakeId}>
                    <strong>{submission.intakeId}</strong>
                    <p>{submission.data.projectName}</p>
                    <p>Status: {submission.validation.status}</p>
                    <p>Saved at: {new Date(submission.savedAt).toLocaleString()}</p>
                  </li>
                ))
              )}
            </ul>
          </section>
        </aside>
      </div>
    </main>
  );
}

export default App;
