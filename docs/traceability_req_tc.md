# Traceability — Requirements ↔ Test Cases (Lab 9)

## Selected requirements (8)
- **REQ-002:** Mandatory Field Validation (FR)
- **REQ-003:** Budget Justification Rule (FR)
- **REQ-004:** High Risk Evidence Rule (FR)
- **REQ-007:** Invalid State Classification (FR)
- **NFR-002:** Validation Performance (NFR)
- **NFR-004:** Evidence Metadata Requirement (NFR)
- **REQ-001:** Intake Submission (Other - FR)
- **REQ-006:** Incomplete State (Other - FR)

## Mapping (REQ → TC)

| Requirement (REQ-###) | Test Cases (TC-###) | Notes |
|---|---|---|
| REQ-002 | TC-001, TC-002 | Validação de campos vazios e estado Incomplete. |
| REQ-003 | TC-003, TC-008 | Regra de orçamento e teste de limite (Boundary). |
| REQ-004 | TC-004, TC-005 | Risco High exige anexo (Negative test incluído). |
| REQ-007 | TC-004, TC-005 | Classificação de estado Inválido. |
| NFR-002 | TC-006 | Medição de performance da validação. |
| NFR-004 | TC-007 | Verificação de metadados automáticos (Audit). |
| REQ-001 | TC-001 | Submissão base do formulário. |
| REQ-006 | TC-002 | Transição para estado Incomplete. |