# Requirements v0 — Lab 2 (AMS)

| Item | Requirement | Type | Stakeholder | Priority | Variant? |
|---:|---|---|---|---|---|
| 1 | The system shall allow submission of an intake form containing project metadata. | FR | Transition Lead | H | No |
| 2 | The system shall validate that all mandatory fields are completed before processing. | FR | Data Steward | H | Yes |
| 3 | The system shall classify submissions with missing mandatory fields as “Incomplete”. | FR | Data Steward | H | Yes |
| 4 | The system shall require a justification field when budget exceeds 100,000€. | FR | Finance Owner | H | Yes |
| 5 | The system shall require supporting evidence when risk level is marked as “High”. | FR | Data Steward | H | Yes |
| 6 | The system shall mark the intake as “Invalid” if cross-field validation rules fail. | FR | Data Steward | H | Yes |
| 7 | The system shall require a milestone plan when project duration exceeds 12 months. | FR | Project Manager | M | Yes |
| 8 | Validation results shall be deterministic and reproducible. | NFR | Quality Manager | H | Yes |
| 9 | The system shall display clear validation error messages identifying the incorrect field. | NFR | End User | H | No |
|10 | Validation processing shall complete in less than 2 seconds under normal load. | NFR | Operations | M | No |

## Ambiguity rewrite (min. 5)

1) Original: "The system should validate data properly."
   Rewritten: "The system shall validate mandatory fields and enforce defined cross-field rules before classifying the intake."

2) Original: "High-risk projects need evidence."
   Rewritten: "If risk level is marked as 'High', the system shall require at least one supporting document before submission is accepted."

3) Original: "Long projects need planning."
   Rewritten: "If project duration exceeds 12 months, the system shall require an uploaded milestone plan document."

4) Original: "The system should prevent inconsistent data."
   Rewritten: "The system shall mark the intake as 'Invalid' if risk level is 'Low' and critical integrations are declared."

5) Original: "Validation must be fast."
   Rewritten: "Validation processing shall complete in less than 2 seconds under standard operational conditions."