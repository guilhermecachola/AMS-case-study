# Generated Scope — Lab 8

## Selected slice
- **Slice:** B
- **Short description:** Captura de metadados de evidências e validação de regras de integridade (foco em risco e anexos).

## Actors / roles
- **Primary actor:** Project Lead / Submitter
- **Secondary actor:** System Validator (Automated)

## Use Cases implemented
- **UC-01:** Submit Evidence Metadata
- **UC-02:** Validate Cross-field Consistency (Risk vs. Evidence)

## Requirements implemented (max 10)
- **REQ-002:** Mandatory Field Validation
- **REQ-003:** Budget Justification Rule (Validation logic)
- **REQ-004:** High Risk Evidence Rule (Anexo obrigatório para risco High)
- **REQ-007:** Invalid State Classification
- **NFR-002:** Validation Performance (Simulado via UI feedback)
- **NFR-004:** Evidence Metadata Requirement (Data e Owner)

## Variant constraints implemented (min. 2)
- **Constraint 1 (Audit Variant):** Todo o upload de documento deve obrigatoriamente capturar e exibir `Upload Date` e `Responsible Owner`.
- **Constraint 2 (Risk/Budget Variant):** Bloqueio de submissão se o risco for "High" e não existir um ficheiro associado com metadados válidos.

## Out of scope (explicit)
- Persistência real em base de dados (usar local storage ou memória).
- Autenticação de utilizadores (login).
- Workflow de aprovação pós-submissão.
