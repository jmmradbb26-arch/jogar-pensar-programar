# Feature Specification: Desafios de Jogos, Estratégias e Algoritmos

**Feature Branch**: `001-create-algorithmic-game-challenges`

**Created**: 2026-10-01

**Status**: Draft

**Input**: User description: Aplicação educacional do PROFEducatec para estudantes do 3º ao 5º ano, que integra Computação EF03CO01 e Educação Física EF35EF01 por meio de desafios de jogos de território ou tabuleiro. Os desafios progridem por identificar, analisar, criar e um desafio final. A aplicação deve apoiar experimentação, feedback pedagógico, autonomia, acessibilidade, valorização cultural e privacidade.

## Clarifications

### Session 2026-10-01

- Q: A versão inicial deve incluir pelo menos um jogo de matriz indígena e um jogo de matriz africana, ambos identificados e contextualizados? → A: A versão inicial inclui ao menos um jogo de matriz indígena e um jogo de matriz africana, ambos identificados e contextualizados, escolhidos e revisados pela equipe.
- Q: Como os estudantes devem acessar os quatro níveis: em sequência obrigatória ou com todos disponíveis desde o início? → A: Todos os níveis ficam disponíveis desde o início, com indicação da ordem pedagógica recomendada.
- Q: Os desafios de criação e o desafio final devem incluir comandos de repetição, como “repita”, ou trabalhar apenas com sequências simples de comandos? → A: Usar apenas sequências simples, sem repetição ou condição.
- Q: Os desafios precisam continuar funcionando sem conexão com a internet depois que a aplicação for aberta? → A: Depois da abertura, todos os níveis e desafios permanecem utilizáveis sem conexão.
- Q: No nível Analisar, como o estudante deve indicar o problema na sequência existente? → A: Selecionar um comando problemático ou o resultado observado.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Identificar uma sequência (Priority: P1)

Como estudante, quero escolher uma sequência de comandos para resolver um desafio em um tabuleiro ou território, para compreender como instruções ordenadas levam a um resultado.

**Why this priority**: Identificar algoritmos é a primeira etapa da progressão e permite que o estudante comece sem precisar criar comandos próprios.

**Independent Test**: Apresentar um desafio com objetivo e alternativas de sequências; verificar que o estudante seleciona uma alternativa, observa a simulação e recebe resultado explicado.

**Acceptance Scenarios**:

1. **Given** um desafio com regras, objetivo e alternativas descritos em linguagem apropriada à faixa etária, **When** o estudante escolhe uma sequência e solicita sua execução, **Then** o sistema demonstra os comandos no tabuleiro e informa se o objetivo foi alcançado.
2. **Given** uma sequência que não alcança o objetivo, **When** sua execução termina, **Then** o sistema mostra o resultado observado e oferece orientação para uma nova tentativa.

---

### User Story 2 - Analisar uma sequência (Priority: P2)

Como estudante, quero examinar uma sequência já montada e apontar onde ela falha, para aprender a reconhecer erros e melhorar algoritmos existentes.

**Why this priority**: A análise constrói a ponte entre reconhecer uma solução e criar uma sequência própria.

**Independent Test**: Apresentar uma sequência com um erro observável; verificar que o estudante identifica o problema, recebe explicação e pode tentar novamente.

**Acceptance Scenarios**:

1. **Given** uma sequência que contém um erro ou não conclui o objetivo, **When** o estudante seleciona o comando problemático ou o resultado observado, **Then** o sistema confirma ou orienta sua análise com base no que ocorreu.
2. **Given** uma resposta incorreta, **When** o estudante tenta novamente, **Then** o sistema mantém o desafio disponível e fornece uma pista pedagógica sem revelar automaticamente toda a resposta.

---

### User Story 3 - Criar uma sequência (Priority: P2)

Como estudante, quero montar e executar minha própria sequência de comandos, para planejar uma estratégia e verificar se ela resolve o desafio.

**Why this priority**: Criar algoritmos é objetivo explícito da habilidade EF03CO01 e promove autonomia após as etapas de identificação e análise.

**Independent Test**: Permitir que o estudante construa uma sequência, execute-a e observe se alcança o objetivo, inclusive após editar e tentar novamente.

**Acceptance Scenarios**:

1. **Given** um desafio aberto de criação, **When** o estudante adiciona comandos e executa a sequência, **Then** o sistema apresenta cada ação no tabuleiro e o resultado final.
2. **Given** uma tentativa que não resolve o desafio, **When** o estudante altera a sequência e executa novamente, **Then** o sistema avalia a nova sequência sem apagar o contexto necessário para a revisão.

---

### User Story 4 - Resolver o desafio final (Priority: P3)

Como estudante, quero resolver uma situação final que combine estratégia de jogo e criação de algoritmo, para aplicar o que pratiquei nas etapas anteriores.

**Why this priority**: O desafio final integra as aprendizagens dos níveis anteriores e permite observar sua aplicação conjunta.

**Independent Test**: Apresentar uma situação com regras e objetivo próprios; verificar que o estudante escolhe uma estratégia, cria uma sequência e recebe resultado e feedback.

**Acceptance Scenarios**:

1. **Given** a situação do desafio final, **When** o estudante planeja e executa sua sequência, **Then** o sistema avalia a solução segundo regras e condições de sucesso apresentadas.
2. **Given** o estudante conclui ou não conclui o objetivo, **When** a avaliação é apresentada, **Then** o feedback relaciona o resultado às decisões tomadas e permite revisar a estratégia.

---

### User Story 5 - Acessar e compreender os desafios (Priority: P1)

Como estudante do 3º ao 5º ano, quero entender as instruções e operar os desafios em diferentes dispositivos, para participar da atividade sem barreiras desnecessárias.

**Why this priority**: A compreensão e o acesso são necessários para que estudantes possam realizar qualquer uma das etapas pedagógicas.

**Independent Test**: Percorrer instruções e um desafio em computador, tablet e smartphone, usando diferentes formas de interação e verificando legibilidade, operabilidade e compreensão.

**Acceptance Scenarios**:

1. **Given** a aplicação aberta em computador, tablet ou smartphone, **When** o estudante acessa um desafio, **Then** instruções e controles permanecem visíveis, compreensíveis e utilizáveis sem conteúdo cortado que impeça a atividade.
2. **Given** a aplicação aberta, **When** o estudante consulta os níveis, **Then** todos os quatro estão disponíveis desde o início e a ordem pedagógica recomendada está indicada.
3. **Given** a aplicação e os desafios carregados com conexão, **When** a conexão é interrompida, **Then** o estudante continua acessando os quatro níveis, executando e revisando sequências e recebendo feedback sem conexão.
4. **Given** uma informação necessária para concluir um desafio, **When** o estudante consulta essa informação, **Then** ela não depende exclusivamente de cor, som ou interação precisa para ser percebida.

### Edge Cases

- Uma sequência vazia ou incompleta MUST produzir orientação compreensível e permitir que o estudante continue.
- Um comando que leve para fora do tabuleiro, atravesse um obstáculo ou viole uma regra MUST ter seu efeito explicado sem quebrar o desafio.
- Quando mais de uma sequência alcançar o objetivo, o sistema MUST aceitar as soluções válidas conforme as regras do desafio.
- Uma sequência pode falhar antes de consumir todos os comandos; o resultado MUST indicar onde a execução parou e permitir revisão.
- Repetir, editar ou reiniciar uma tentativa MUST manter regras e objetivo visíveis e não exigir cadastro.
- Em telas menores, os elementos necessários para ler instruções e operar o tabuleiro MUST continuar acessíveis.
- Se a conexão for interrompida depois que a aplicação e seus desafios forem carregados, o estudante MUST poder continuar a atividade sem perder acesso às tentativas disponíveis; a primeira abertura requer conexão.
- Referências culturais sem contexto confiável ou que possam induzir estereótipos MUST ser revisadas antes de serem apresentadas como informação factual.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: A aplicação MUST apresentar desafios adequados a estudantes do 3º ao 5º ano do Ensino Fundamental — Anos Iniciais, com instruções, regras e objetivos em linguagem clara.
- **FR-002**: Os desafios MUST usar situações de jogos de território ou tabuleiro para relacionar estratégia de jogo à criação, análise ou identificação de algoritmos simples.
- **FR-003**: A experiência MUST articular EF03CO01 e EF35EF01 por meio de desafios que trabalhem algoritmos e adaptem contextos de jogos tradicionais para situações de estratégia em tabuleiro ou território; o conjunto da versão inicial MUST incluir ao menos um jogo de matriz indígena e um jogo de matriz africana, identificados e contextualizados.
- **FR-004**: A aplicação MUST organizar a progressão pedagógica em quatro níveis: identificar uma sequência; analisar uma sequência existente; criar uma sequência própria; e resolver um desafio final usando estratégia e criação de algoritmo. Todos os níveis MUST estar disponíveis desde o início, com a ordem recomendada indicada, sem exigir conclusão prévia para acessá-los. As sequências de algoritmos dos desafios MUST ser lineares, sem comandos de repetição ou condição.
- **FR-005**: No nível Identificar, o estudante MUST poder selecionar uma sequência de comandos e verificar sua execução para resolver o objetivo apresentado.
- **FR-006**: No nível Analisar, o estudante MUST poder examinar uma sequência existente e selecionar o comando problemático ou o resultado observado em relação às regras e ao objetivo do desafio.
- **FR-007**: No nível Criar, o estudante MUST poder montar, executar, revisar e tentar novamente uma sequência própria de comandos.
- **FR-008**: O desafio final MUST permitir que o estudante aplique estratégia de jogo e criação de algoritmo em uma situação com regras, objetivo e critérios de sucesso explícitos.
- **FR-009**: Antes de executar cada desafio, o estudante MUST poder consultar seu objetivo, regras e comandos disponíveis.
- **FR-010**: Ao executar uma sequência, a aplicação MUST mostrar as ações e o resultado no tabuleiro ou território de modo que o estudante possa relacionar comandos e consequências.
- **FR-011**: Após cada tentativa, a aplicação MUST informar se o objetivo foi alcançado e fornecer explicação ou orientação relacionada às ações realizadas; não basta informar somente certo ou errado.
- **FR-012**: A aplicação MUST permitir corrigir ou substituir uma tentativa sem exigir cadastro ou autenticação.
- **FR-013**: Os desafios MUST permitir decisões estratégicas do estudante e aceitar toda sequência que satisfaça as regras e condições de sucesso definidas para aquele desafio.
- **FR-014**: Instruções, estado do desafio e controles MUST permanecer compreensíveis e operáveis em computador, tablet e smartphone.
- **FR-015**: Informações necessárias aos desafios MUST ser comunicadas sem depender exclusivamente de cor, som ou interação precisa; controles e conteúdo MUST apoiar o uso de recursos de acessibilidade pertinentes.
- **FR-016**: Referências a jogos de matriz indígena e africana e a jogos tradicionais MUST ser educativas, respeitosas e livres de estereótipos; cada jogo nomeado MUST ter seu contexto e suas afirmações factuais sobre origem revisados pela equipe antes da publicação.
- **FR-017**: A aplicação MUST funcionar sem exigir cadastro ou autenticação e MUST NOT solicitar dados pessoais desnecessários para realizar os desafios.
- **FR-018**: Requisitos de produto e conteúdo MUST poder ser relacionados às habilidades curriculares, aos níveis pedagógicos e a critérios objetivos de verificação.
- **FR-019**: Depois de uma abertura bem-sucedida com conexão, a aplicação MUST permitir acesso aos quatro níveis, execução e revisão de sequências e feedback sem conexão ativa durante a atividade.

### Key Entities *(include if data is involved)*

- **Desafio**: Atividade com contexto de jogo, regras, objetivo, nível pedagógico, tabuleiro ou território e critérios de sucesso.
- **Sequência de comandos**: Instruções ordenadas escolhidas, analisadas ou montadas pelo estudante e avaliadas conforme as regras do desafio.
- **Estado do tabuleiro**: Posição inicial e mudanças causadas pela execução dos comandos, incluindo obstáculos, limites e resultado observado.
- **Feedback pedagógico**: Explicação ou orientação associada a uma tentativa e destinada a apoiar a compreensão e uma próxima ação.
- **Progressão de aprendizagem**: Organização dos desafios nos níveis Identificar, Analisar, Criar e Desafio final.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Os quatro níveis pedagógicos estão presentes e acessíveis desde o início, com a ordem recomendada indicada; cada nível contém ao menos um desafio completo, com instruções, regras, objetivo e critério de sucesso verificáveis.
- **SC-002**: Em 100% dos desafios, uma sequência válida alcança o resultado esperado e uma sequência inválida produz um resultado observável e feedback pedagógico.
- **SC-003**: Em uma avaliação com pelo menos 10 estudantes representativos do público-alvo, pelo menos 8 conseguem iniciar e concluir uma tentativa em cada nível sem ajuda para entender os controles principais.
- **SC-004**: Os fluxos principais de leitura de instruções, montagem ou seleção de comandos, execução e revisão podem ser concluídos em computador, tablet e smartphone sem perda de controles ou conteúdo essencial.
- **SC-005**: O conjunto inicial inclui ao menos um jogo identificado de cada matriz — indígena e africana — e a revisão de publicação confirma que cada referência tem contexto educativo documentado e aprovação da equipe, sem estereótipos identificados.
- **SC-006**: Um usuário consegue começar e realizar os desafios sem criar conta, autenticar-se ou fornecer dados pessoais.
- **SC-007**: Após abrir a aplicação e carregar os desafios com conexão, 100% dos fluxos essenciais — acessar cada nível, executar e revisar sequências e receber feedback — permanecem operáveis quando a conexão é interrompida.

## Assumptions

- A primeira abertura da aplicação e o carregamento inicial dos desafios requerem conexão; após esse carregamento, a atividade não depende de conexão ativa.
- A aplicação é uma experiência educacional interativa para uso individual por estudantes, com apoio de educadores quando necessário.
- A primeira versão inclui ao menos um desafio completo em cada um dos quatro níveis e ao menos um jogo identificado de cada matriz — indígena e africana. A equipe selecionará os jogos e documentará seus contextos durante o planejamento.
- Os desafios são adaptações digitais de contextos de jogos de território ou tabuleiro e não substituem a vivência corporal dos jogos na Educação Física.
- A equipe validará correção pedagógica, adequação etária e contexto cultural antes da publicação.
- A aplicação não precisa guardar identidade ou histórico individual do estudante para oferecer os desafios.
- Tecnologias e detalhes de implementação permanecem fora desta especificação e serão definidos nos artefatos de planejamento.
