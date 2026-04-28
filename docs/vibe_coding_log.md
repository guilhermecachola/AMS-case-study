# Vibe Coding Log — Lab 8

## Tool used
- **Tool:** Lovable / Cursor (Select yours)
- **Environment/stack:** React + Tailwind CSS (Vite)

## Iteration 1
**Prompt (summary):**
"Cria uma página simples de submissão de projeto em React. O formulário deve ter: Nome, Orçamento, Nível de Risco (Low/High) e um campo de upload de ficheiro. Implementa a regra: se o Risco for 'High', o upload é obrigatório. Se o Orçamento > 100k, mostra um campo de Justificação. O ficheiro deve mostrar automaticamente a data de hoje e o nome do 'Owner' (simulado como 'Current User')."

**Generated output:**
- Formulário funcional com validação básica de campos vazios.
- Lógica condicional para mostrar o campo de justificação.
- Componente de upload que lista o nome do ficheiro.

**Kept (accepted):**
- Lógica de visibilidade condicional da Justificação.
- Captura automática de metadados (Data).

**Rejected (feature drift):**
- A ferramenta tentou criar uma barra lateral de navegação e um gráfico de estatísticas. Removido por estar fora da Slice B.

**Manual verification:**
- **Happy path:** Submissão com Risco Low e sem ficheiro -> Sucesso.
- **Alternative flow:** Risco High com ficheiro -> Sucesso.
- **Exception/error path:** Risco High sem ficheiro -> Erro "Evidence required for High Risk".

---

## Iteration 2
**Prompt (summary):**
"Refina a validação. O campo de Justificação (quando o orçamento > 100k) deve ter no mínimo 20 caracteres. Melhora o feedback visual: se a validação falhar, o estado do formulário deve mudar visualmente para 'Invalid' (borda vermelha) e mostrar o log do erro de acordo com o REQ-007."

**Generated output:**
- Validação de comprimento de string na justificação.
- Banner de erro vermelho com a lista de regras violadas.

**Kept:**
- Banner de erros detalhado.
- Bloqueio do botão de submissão enquanto as regras de variante não forem cumpridas.

**Manual verification:**
- **Happy path:** Orçamento > 100k com justificação longa -> Válido.
- **Alternative flow:** Alterar orçamento para < 100k -> Justificação desaparece e estado passa a Válido.
- **Exception/error path:** Justificação com apenas 5 caracteres -> Erro de validação visível.

---

## Notes (lessons learned)
- **Ambiguidade:** A IA inicialmente não entendeu que o "Owner" devia ser automático e criou um campo de texto. Foi necessário clarificar na Iteração 2.
- **Restrições:** Definir o REQ-007 (Invalid State) ajudou a IA a criar uma estrutura de "Error Log" mais organizada em vez de apenas alertas genéricos.
- **Mudança para o futuro:** Os critérios de aceitação precisam de ser mais específicos quanto ao formato dos metadados dos ficheiros (ex: timestamp exato).
