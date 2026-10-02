# Jogar, Pensar e Programar

## Projeto Final — Aplicação educacional orientada por especificação

**Programa:** Mestrado Profissional em Processos e Tecnologias Educacionais (EDUCATEC)  
**Autoria:** Jannes Mary Muniz Rabelo  
**Público-alvo:** estudantes dos anos iniciais do Ensino Fundamental, com foco no 3º ao 5º ano  
**Componentes:** Computação e Educação Física

### Habilidade central

**BNCC Computação EF03CO01:** identificar, analisar e criar algoritmos simples para resolver problemas do cotidiano ou em jogos.

A proposta também estabelece relação com a **EF35EF01**, referente à experimentação e fruição de jogos de matriz indígena e africana.

### Problema pedagógico

A aplicação foi desenvolvida para apoiar estudantes na compreensão inicial de sequências de comandos e algoritmos por meio de desafios de jogos. A interação foi organizada em progressão: **Identificar → Analisar → Criar → Desafio final**.

### O que o estudante faz

- reconhece comandos e trajetórias;
- observa sequências;
- identifica o comando que interrompe um caminho;
- cria sequências simples;
- testa, recebe feedback e revisa suas escolhas.

### Feedback e progressão

A aplicação apresenta feedback após as respostas e oferece orientação para continuidade, incluindo opções como tentar novamente, visualizar a sequência e resultado, avançar para o próximo nível e concluir o percurso.

### Tecnologias

Aplicação web estática baseada em HTML, CSS e JavaScript, compatível com GitHub Pages. O projeto utiliza Service Worker para preparação do uso offline após o carregamento inicial.

### Uso do agente de codificação

O desenvolvimento foi conduzido com fluxo orientado por especificação (Spec Kit), mantendo decisões humanas antes e durante a implementação. O agente foi utilizado para implementar tarefas, analisar inconsistências, propor correções e atualizar testes. A equipe revisou e aprovou as decisões pedagógicas, técnicas, culturais, de acessibilidade e de publicação antes da incorporação.

### Principais decisões humanas

- foco em algoritmos simples;
- níveis disponíveis desde o início, com ordem pedagógica recomendada;
- ausência de repetição e condicionais na primeira versão;
- pelo menos um jogo de matriz indígena e um de matriz africana;
- funcionamento offline após o carregamento;
- no nível Analisar, o estudante identifica o comando que interrompe o caminho;
- revisão cultural humana antes da publicação;
- preservação do controle humano sobre decisões produzidas com apoio de IA.

### Testes e correções

Foram realizados testes funcionais do fluxo, navegação, feedback, progressão e uso offline. Durante a revisão, foram corrigidos:
1. bloqueio por revisão cultural após a equipe confirmar a aprovação;
2. controle do Service Worker e preparação offline;
3. ausência de ação de continuidade após desafios concluídos;
4. redação do nível Analisar;
5. cache antigo do navegador, com atualização da versão do cache para v6.

Os testes automatizados finais registrados no processo chegaram a **12 testes aprovados e 0 falhas**.

A versão pública também foi verificada em três ambientes:
- **Desktop — aprovado**
- **Celular — aprovado**
- **Tablet — aprovado**

Foram observados carregamento, legibilidade, interação com os desafios, Nível 2, feedback e progressão.

### Publicação

**Aplicação:** https://jmmradbb26-arch.github.io/jogar-pensar-programar/  
**Repositório:** https://github.com/jmmradbb26-arch/jogar-pensar-programar

### Execução local

```powershell
cd "C:\Users\admlocal\Documents\jogar-pensar-programar"
python -m http.server 8000
```

Abrir no navegador:

`http://localhost:8000/`

### GitHub Pages

A aplicação foi publicada pelo GitHub Pages a partir do repositório público. A versão pública foi verificada no navegador após o envio das correções.

### Limites da validação

A validação realizada no desenvolvimento é funcional/técnica. Não foram inferidos resultados de aprendizagem de estudantes a partir desses testes. A verificação formal em diferentes tamanhos de tela deve ser registrada no roteiro específico de testes antes da entrega, caso ainda não tenha sido documentada.

## Documentação final do projeto

Os materiais complementares e as evidências finais estão na pasta `docs/`:

- [Manual do Professor](docs/Manual_do_Professor_Jogar_Pensar_e_Programar.docx)
- [Produto Acadêmico](docs/Produto_Academico_Jogar_Pensar_e_Programar.docx)
- [Documentação do Produto](docs/Documentacao_Jogar_Pensar_e_Programar.docx)
- [Reflexão Crítica (300–500 palavras)](docs/Reflexao_Critica_300_500_palavras.md)
- [Converge / Revisão Final](docs/Converge_Revisao_Final.docx)
- [Roteiro de Testes Desktop, Tablet e Celular](docs/Roteiro_de_Testes_Desktop_Tablet_Celular.docx)
- [Dossiê Final do Projeto](docs/Dossie_Final_Projeto.docx)
- [Apresentação do Projeto Final](docs/Apresentacao_Projeto_Final.pptx)

### Publicação
- Aplicação: https://jmmradbb26-arch.github.io/jogar-pensar-programar/
- Repositório: https://github.com/jmmradbb26-arch/jogar-pensar-programar
