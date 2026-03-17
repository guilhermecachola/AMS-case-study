# Use Case Diagram — Lab 5 (Variante 4: Data Quality)

## System boundary
- **System name:** AMS Data Integrity Engine
- **Slice covered:** Validação de Dados e Consistência de Evidências

## Actors (2)
- **A1: Data Steward** (Persona principal: gerencia regras e estados de erro)
- **A2: Contributor** (Usuário que insere os dados e evidências)

## Use cases (min. 6)
- **UC-01:** Submeter Respostas de Intake (Contributor)
- **UC-02:** Fazer Upload de Evidências (Contributor)
- **UC-03:** Validar Regras Cross-Field (System/Data Steward)
- **UC-04:** Marcar Intake como "Estado Inválido" (System/Data Steward)
- **UC-05:** Revisar Inconsistências de Dados (Data Steward)
- **UC-06:** Gerar Relatório de Erros de Qualidade (Data Steward)

## Diagram file
- Path: `docs/diagrams/use_case_diagram.puml`
