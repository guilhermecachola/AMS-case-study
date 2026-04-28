# Acceptance Criteria — Lab 7

## REQ-002 — Mandatory Field Validation
- **AC-1:** O sistema deve impedir a submissão se campos como 'Name' ou 'Budget' estiverem vazios.
- **AC-2:** Mensagens de erro devem aparecer junto a cada campo em falta, realçadas a vermelho.
- **AC-3:** O estado do intake deve ser "Incomplete" enquanto houver campos obrigatórios vazios.

## REQ-003 — Budget Justification Rule (Given/When/Then)
- **Given** que o utilizador inseriu um orçamento superior a 100.000€
- **When** tenta submeter o formulário sem preencher o campo "Justification"
- **Then** o sistema deve marcar o intake como "Invalid" e exibir um erro exigindo a justificação.
- **And** a justificação deve ter pelo menos 20 caracteres de texto legível.

## REQ-004 — High Risk Evidence Rule
- **AC-1 (Variant):** Se o risco for "High", o sistema deve obrigatoriamente exigir o upload de pelo menos um ficheiro (PDF/DOCX).
- **AC-2 (Variant):** O ficheiro deve incluir metadados de 'Owner' e 'Upload Date' para ser aceite no processo de auditoria.
- **AC-3:** Se o utilizador alterar o risco de "High" para "Low", a obrigatoriedade do documento deve ser removida.

## REQ-008 — Ready to Decide Classification (Given/When/Then)
- **Given** que todos os campos obrigatórios estão preenchidos
- **And** todas as regras de consistência (orçamento, risco, duração) foram validadas com sucesso
- **When** o processo de validação termina
- **Then** o estado do intake deve ser atualizado para "Ready to Decide" e o utilizador deve ser notificado.

## NFR-002 — Validation Performance
- **AC-1:** O tempo de resposta medido entre o clique em "Validar" e o resultado final deve ser inferior a 2 segundos em condições normais.
- **AC-2:** Testes automatizados de carga devem confirmar que 95 em cada 100 pedidos cumprem este limite.

## NFR-006 — Availability
- **AC-1:** O dashboard de monitorização deve registar o tempo de atividade (uptime) do serviço.
- **AC-2:** No final de cada mês civil, o rácio (tempo_online / tempo_total) deve ser ≥ 0.99.
