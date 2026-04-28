# Requirements Validation — Lab 3 (AMS)

Este documento identifica o subconjunto de requisitos selecionados para o processo de validação, garantindo a cobertura de funcionalidades core, regras de negócio baseadas em variantes e métricas de desempenho do sistema.

## 1. Requisitos Selecionados

| ID | Tipo | Nome | Descrição Resumida | Variant Impact |
| :--- | :--- | :--- | :--- | :--- |
| **REQ-002** | Funcional | Mandatory Field Validation | O sistema deve validar se todos os campos obrigatórios estão preenchidos antes de permitir o avanço. | **Yes** |
| **REQ-003** | Funcional | Budget Justification Rule | Se o orçamento for > 100.000€, o sistema exige uma justificação (mín. 20 caracteres). | **Yes** |
| **REQ-004** | Funcional | High Risk Evidence Rule | Projetos marcados como "High Risk" devem obrigatoriamente conter pelo menos um documento anexo. | **Yes** |
| **REQ-008** | Funcional | Ready to Decide Classification | O estado "Ready to Decide" só é atribuído se todas as validações (obrigatórias e cruzadas) passarem. | **Yes** |
| **NFR-002** | Não-Funcional | Validation Performance | O processamento da validação deve ser concluído em ≤ 2 segundos para 95% das submissões. | No |
| **NFR-006** | Não-Funcional | Availability | O serviço de validação deve garantir uma disponibilidade mínima de 99% por mês civil. | No |

## 2. Critérios de Seleção (Resumo)

* **Total de itens:** 6 requisitos.
* **Distribuição:** 4 Requisitos Funcionais e 2 Requisitos Não-Funcionais.
* **Foco em Variantes:** Foram selecionados 4 requisitos com impacto de variante (*Variant-driven*), cumprindo a regra de um mínimo de 2.
* **Objetivo da Validação:** Assegurar que o motor de regras consegue distinguir estados de erro (Incompleto/Inválido) e manter a performance sob carga.
