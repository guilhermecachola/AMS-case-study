# Vibe Coding Log — Lab 8

## Tool used
- **Tool:**  Cursor 
- **Environment/stack:** React + Tailwind CSS (Vite)

Iteration 1 Prompt: "Gera um App.tsx em React que implemente um formulário de Intake. Usa Tailwind para o estilo. Preciso de campos para Nome, Budget, Risco e Upload de ficheiros. Se o Budget for > 100k, exige justificação. Se o Risco for High, o upload é obrigatório."

Iteration 2 Prompt (Refining Metadata): "Melhora a parte dos ficheiros. Cada vez que um ficheiro é carregado, o sistema deve guardar automaticamente o 'Owner' como 'Admin' e a data atual num objeto de metadados. Mostra esses metadados na lista de ficheiros por baixo do upload."

Manual Verification:

Happy Path: Preenchi Nome, Budget de 50k, Risco Low. O botão "Submit" ficou ativo e o ID INTAKE-xxx foi gerado. 

Alternative Flow: Subi o Budget para 150k. O campo de Justificação apareceu imediatamente.  
**REVER**

Exception Path: Mudei o Risco para High sem carregar ficheiro. O estado mudou para "Invalid" e o botão de submissão foi desativado. 
---

## Notes
- **Ambiguidade:** A IA inicialmente não entendeu que o "Owner" devia ser automático e criou um campo de texto. Foi necessário clarificar na Iteração 2.
- **Restrições:** Definir o REQ-007 (Inválido) ajudou a IA a criar uma estrutura de "Error Log" mais organizada em vez de apenas alertas genéricos.
- **extra** Meti uns prompts extra mas foi para estilizar ou para pequenso erros
