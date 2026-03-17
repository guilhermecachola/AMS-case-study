UC-03 — Validar Regras Cross-Field

Primary actor: Sistema / Data Steward

Goal: Garantir que se um campo X for preenchido, o campo Y (evidência) seja obrigatório.

Preconditions: Contributor submeteu o formulário de intake.

Trigger: Clique no botão "Finalizar".

Postconditions (success): Status do Intake definido como "Validado".

Postconditions (failure): Status definido como "Incompleto/Inválido".

Related requirements: REQ-DQ-01, REQ-DQ-02

Main flow (happy path)

O sistema lê as respostas do formulário.

O sistema verifica a regra: "Se Resposta = SIM, então Evidência = OBRIGATÓRIO".

O sistema confirma que o arquivo de evidência foi anexado.

O sistema marca o campo como "Consistente".

Alternative flows
A1. Evidência Opcional: Se a resposta for "NÃO", o sistema ignora a obrigatoriedade do anexo e valida o campo.

Exceptions / errors
E1. Violação de Consistência: Se a resposta for "SIM" e o anexo estiver vazio, o sistema bloqueia a submissão e altera o estado para "Estado Inválido".
