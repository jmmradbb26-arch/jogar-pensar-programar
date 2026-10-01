<!--
Sync Impact Report
Version change: 1.0.0 → 1.1.0 (material expansion of pedagogical and technical principles)
Modified principles:
- I. Learning Through Play → I. Pedagogical Centrality
- II. Reasoning Before Syntax → II. Integration of Computing and Physical Education
- III. Progressive, Verifiable Challenges → III. Age-Appropriate Design
- IV. Inclusive and Accessible Experiences → IV. Learning Progression
- V. Privacy and Safe Defaults → V. Learning Through Experimentation
- Product Commitments and Delivery and Review → Principles VI–XVIII
Added sections: Product Scope and Learning Progression; Development and Review
Removed sections: none
Follow-up items: none
-->
# Jogar, Pensar e Programar — Desafios de Jogos, Estratégias e Algoritmos Constitution

## Core Principles

### I. Centralidade Pedagógica
Toda funcionalidade MUST contribuir para a aprendizagem ou para a experiência necessária a essa aprendizagem. Requisitos de produto e decisões de implementação MUST ser avaliados por sua contribuição pedagógica.

### II. Integração entre Computação e Educação Física
Desafios de jogos, estratégias e regras MUST oferecer contexto para desenvolver pensamento algorítmico. O projeto MUST articular a habilidade de Computação EF03CO01 — identificar, analisar e criar algoritmos simples para problemas do cotidiano ou em jogos — com a habilidade de Educação Física EF35EF01 — experimentar e fruir jogos de matriz indígena e africana e recriar jogos tradicionais.

### III. Adequação ao 3º, 4º e 5º Ano
Linguagem, instruções, interface, exemplos e dificuldade MUST ser apropriados a estudantes do 3º ao 5º ano do Ensino Fundamental — Anos Iniciais. As atividades MUST explicar termos e regras necessários sem presumir conhecimentos não apresentados.

### IV. Progressão da Aprendizagem
A aprendizagem MUST progredir de identificar para analisar e então criar algoritmos. As experiências MUST apresentar objetivos e critérios de conclusão compreensíveis para cada etapa.

### V. Aprendizagem por Experimentação
O estudante MUST poder testar uma sequência, observar seu resultado, corrigir erros e tentar novamente. A interação MUST tornar os efeitos das decisões visíveis o bastante para apoiar a aprendizagem.

### VI. Feedback Pedagógico
O sistema MUST explicar ou orientar o estudante sobre resultados e próximos passos. Feedback MUST ir além de indicar apenas certo ou errado e MUST apoiar a compreensão sem retirar do estudante a oportunidade de pensar.

### VII. Autonomia do Estudante
As atividades MUST permitir que o estudante tome decisões e construa estratégias próprias dentro das regras do desafio. A interface MUST deixar claras as escolhas e suas consequências.

### VIII. Interface Simples e Intuitiva
A interface MUST apresentar instruções, controles e estado do desafio de forma clara e consistente. A navegação MUST reduzir distrações que dificultem a compreensão da atividade.

### IX. Acessibilidade e Inclusão
As experiências MUST buscar uso acessível por estudantes com diferentes capacidades e necessidades. Informação e instruções MUST estar disponíveis sem depender exclusivamente de cor, som ou interação precisa; conteúdo e controles MUST ser compatíveis com recursos de acessibilidade pertinentes à plataforma escolhida.

### X. Valorização Cultural
Referências a jogos de matriz indígena e africana MUST ser apresentadas de modo respeitoso, educativo e sem estereótipos. O projeto MUST contextualizar essas referências com cuidado e MUST evitar atribuir origem, significado ou práticas culturais sem base adequada.

### XI. Responsividade
A aplicação MUST funcionar em computador, tablet e smartphone. Conteúdo, controles e desafios MUST permanecer compreensíveis e operáveis em diferentes tamanhos de tela.

### XII. Simplicidade Técnica
A solução MUST ser adequada à publicação pelo GitHub Pages. O projeto MUST priorizar soluções simples e evitar dependências desnecessárias. As tecnologias específicas da aplicação serão definidas posteriormente nos artefatos de Specify, Clarify e Plan.

### XIII. Código Organizado e Manutenível
O código MUST ser legível, organizado e de fácil manutenção. Nomes, estrutura e comentários, quando necessários, MUST ajudar a equipe a compreender o comportamento e a intenção do código.

### XIV. Verificabilidade
Requisitos e funcionalidades MUST ser formulados de modo que seu atendimento possa ser verificado objetivamente. Mudanças MUST incluir critérios ou procedimentos de verificação apropriados ao comportamento alterado.

### XV. Human-in-the-Loop
O agente de IA MAY apoiar análise, planejamento e desenvolvimento. Decisões pedagógicas e técnicas MUST permanecer sob responsabilidade da equipe do projeto, que MUST revisar e aprovar as alterações propostas antes de incorporá-las aos artefatos ou à implementação.

### XVI. Rastreabilidade
Decisões e alterações importantes MUST permanecer registradas nos artefatos do projeto. Mudanças de escopo, critérios pedagógicos ou comportamento MUST ter justificativa e vínculo rastreável com os requisitos pertinentes.

### XVII. Privacidade
A aplicação MUST funcionar sem exigir cadastro ou autenticação e MUST evitar coleta desnecessária de dados. Qualquer tratamento de dados que venha a ser necessário MUST ser justificado, limitado e documentado antes da implementação.

### XVIII. Coerência dos Artefatos
Constitution, Specification, Clarifications, Plan, Tasks e implementação MUST permanecer coerentes. Divergências identificadas MUST ser resolvidas e registradas nos artefatos pertinentes antes de considerar concluída a mudança relacionada.

## Product Scope and Learning Progression

O projeto do PROFEducatec destina-se a estudantes do 3º ao 5º ano do Ensino Fundamental — Anos Iniciais. A aplicação utilizará desafios de jogos de território ou tabuleiro para trabalhar algoritmos e estratégias, articulando EF03CO01 e EF35EF01.

A progressão pedagógica MUST contemplar estas etapas:

1. **Nível 1 — Identificar:** escolher uma sequência de comandos que resolve um desafio.
2. **Nível 2 — Analisar:** identificar erros ou problemas em uma sequência existente.
3. **Nível 3 — Criar:** montar uma sequência própria para resolver um desafio.
4. **Nível 4 — Desafio final:** resolver uma situação usando estratégia e criação de algoritmo.

A ordem e o propósito dessas etapas MUST ser preservados ao detalhar atividades. Regras, tabuleiros, comandos e condições de sucesso MUST ser definidos de modo verificável nos artefatos de especificação e planejamento.

## Development and Review

A equipe MUST definir tecnologias e detalhes de implementação nos artefatos de Specify, Clarify e Plan, respeitando os princípios desta Constitution e a adequação ao GitHub Pages. Nenhuma tecnologia específica é fixada por esta Constitution.

Revisões MUST verificar alinhamento pedagógico, adequação etária, acessibilidade, privacidade, critérios de aceitação e coerência entre artefatos e implementação, conforme o escopo da mudança. Comportamentos MUST ser testados por critérios objetivos; quando a verificação automatizada não for adequada ou disponível, a mudança MUST registrar passos reproduzíveis para verificação manual. A equipe MUST revisar decisões e conteúdo culturalmente referenciados antes da publicação.

## Governance

Esta Constitution rege as decisões pedagógicas e técnicas do projeto. Alterações MUST ser registradas com justificativa e impacto nos princípios, requisitos e artefatos afetados, e MUST ser revisadas pela equipe responsável. A versão MUST seguir versionamento semântico: MAJOR para remoção, redefinição incompatível ou mudança de obrigação; MINOR para novos princípios ou expansão material de compromissos; PATCH para esclarecimentos sem mudança de obrigação. Revisões de Specification, Clarifications, Plan, Tasks e implementação MUST avaliar conformidade com esta Constitution. Exceções MUST registrar justificativa, escopo e responsável pela decisão. Divergências entre esta Constitution e outros artefatos MUST ser resolvidas por meio de atualização rastreável antes de concluir o trabalho afetado.

**Version**: 1.1.0 | **Ratified**: 2026-10-01 | **Last Amended**: 2026-10-01


