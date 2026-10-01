# Tasks: Desafios de Jogos, Estratégias e Algoritmos

**Input**: Design documents from `/specs/001-create-algorithmic-game-challenges/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/learner-interaction.md`, `quickstart.md`

**Tests**: Includes deterministic tests for board/sequence rules because the specification's plan and quickstart require them. Browser and usability checks are manual acceptance work.

**Organization**: Tasks are grouped by user story, ordered by priority. US1 is the MVP; US5 is also P1 and adds the access, responsive, and offline behavior needed across levels.

## Format: `[ID] [P?] [Story?] Description with file path`

- **[P]**: Different files and no dependencies on unfinished tasks.
- **[Story]**: User-story trace label; omitted for setup, foundational, and polish tasks.
- Each task identifies the file to create, update, or use for validation.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the planned static-site entry point and source files without a build system or runtime packages.

- [X] T001 Create semantic Portuguese entry-page shell with relative stylesheet/module references and level-navigation landmark in `index.html`
- [X] T002 [P] Create base responsive styles, visible focus, readable typography, and reduced-motion handling in `assets/css/app.css`
- [X] T003 Create browser application bootstrap module and mount-point wiring in `assets/js/app.mjs`
- [X] T004 [P] Create parseable JSON file shells for cultural game contexts and challenge content in `assets/data/games.json` and `assets/data/challenges.json`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Build shared deterministic rules, feedback, initial content, content validation, and rule fixtures required by all stories.

**?? CRITICAL**: Finish this phase before story work. Candidate cultural records remain `in-review`; team approval is required before release.

- [X] T005 Implement board representation with playable cells using stable IDs, explicit legal connections and direction/jump/capture relations, blocked cells, initial pieces and roles, and shape/label rendering in `assets/js/board.mjs`
- [X] T006 Implement finite ordered command evaluation and goal evaluation using board rules; reject repetition and condition commands in `assets/js/sequence.mjs`
- [X] T007 [P] Implement shared age-appropriate success, retry, invalid-action, and incomplete-sequence feedback in `assets/js/feedback.mjs`
- [X] T008 [P] Author candidate Jogo da Onça/Adugo and Yoté records with stable IDs, specific rule variants, one or more source titles and URLs supporting factual claims and selected rules, community/region attribution only when supported by reviewed sources, and `reviewStatus: "in-review"` in `assets/data/games.json`
- [X] T009 Author at least one challenge per level in clear Portuguese appropriate for grades 3–5, with stable IDs, `curriculumSkills` including `EF03CO01` and `EF35EF01`, a resolved `gameId`, board, visible rules and goal, finite allowed commands, deterministic success rule, and child-readable success, invalid-action, and retry feedback tied to observable outcomes in `assets/data/challenges.json`; include a finite flawed `providedSequence` and finite `analysisChoices` for Analisar, where each choice has a learner-readable label, references a command step or observed outcome, and has correctness determined against the execution trace; include offered finite `choices` with a valid solution for Identificar
- [X] T010 Load and validate stable unique challenge and game IDs, resolved game references, applicable curriculum skill codes, all four levels, required game matrices, required board and challenge fields, finite commands, analysis-choice labels and trace references with deterministic correctness, and prevent release of cultural records whose `reviewStatus` is not `approved` in `assets/js/app.mjs`
- [X] T011 Add deterministic board and sequence cases, including at least one valid and one invalid finite sequence fixture for every authored challenge, and verify stated-goal outcomes in `tests/sequence.test.mjs`
- [X] T012 Revisão e aprovação da equipe — Princípio XV — Human-in-the-Loop: Antes da implementação final e da publicação, a equipe responsável deverá revisar e aprovar as decisões pedagógicas, técnicas, conteúdos dos desafios, regras dos jogos, feedbacks, acessibilidade e demais artefatos produzidos com apoio de IA. Nenhuma decisão proposta pelo agente deverá ser considerada automaticamente aprovada. Registrar a aprovação, as pendências e as alterações solicitadas em `specs/001-create-algorithmic-game-challenges/plan.md`, na seção `Human Review Record`. Esta aprovação é distinta da revisão cultural de T035.

**Checkpoint**: Shared rules and all four challenge shapes can be validated; team approval in T012 is required before story implementation, and cultural content remains unpublished until its separate approval.

---

## Phase 3: User Story 1 — Identificar uma sequência (Priority: P1) — MVP

**Goal**: Let the learner select a command sequence, watch it execute on a board, and understand the observed result.

**Independent Test**: Load an identify challenge from `assets/data/challenges.json`; select valid and invalid offered sequences; confirm step-by-step board simulation, goal evaluation, explanatory feedback, and retry.

### Tests for User Story 1

- [X] T013 [P] [US1] Add identify-level cases for a successful choice, an unsuccessful choice, and retry guidance in `tests/sequence.test.mjs`

### Implementation for User Story 1

- [X] T014 [P] [US1] Render identify challenge instructions, game context, rules, commands, objective, board, and selectable sequence alternatives in `assets/js/app.mjs`
- [X] T015 [US1] Connect sequence selection to step-by-step board execution and outcome display in `assets/js/app.mjs` and `assets/js/board.mjs`
- [X] T016 [US1] Show observed result, relation to the goal, next-step guidance, and retry action for each identify attempt in `assets/js/feedback.mjs` and `assets/js/app.mjs`

**Checkpoint**: US1 works independently using at least one identify challenge.

---

## Phase 4: User Story 5 — Acessar e compreender os desafios (Priority: P1)

**Goal**: Make all levels understandable and operable on desktop, tablet, and phone, including offline after a successful online load.

**Independent Test**: Navigate all four levels without unlocking, operate a challenge by keyboard and touch at different viewport sizes, then disconnect after offline-ready and repeat essential flows.

### Acceptance Preparation and Implementation for User Story 5

- [X] T017 [P] [US5] Record acceptance steps for all-level availability, recommended order, keyboard/focus, non-color status, command arrangement without dragging, 320 CSS-pixel reflow, 400% zoom, touch controls, reduced motion, and offline operation in `specs/001-create-algorithmic-game-challenges/quickstart.md`
- [X] T018 [P] [US5] Present the four always-available levels with recommended order and semantic keyboard-operable navigation in `index.html` and `assets/js/app.mjs`
- [X] T019 [P] [US5] Implement responsive challenge, board, instruction, and control layouts with text/shape status and practical 44×44 CSS-pixel controls in `assets/css/app.css`
- [X] T020 [US5] Register a subpath-safe service worker and precache the entry page, modules, styles, game data, and challenge data in `assets/js/app.mjs` and `service-worker.js`
- [X] T021 [US5] Report checking, offline-ready, and unavailable states only after verifying essential cached resources; provide reconnect/retry guidance in `assets/js/app.mjs` and `index.html`
- [X] T022 [US5] Handle missing or evicted cache resources without stale readiness claims and keep attempts transient in `service-worker.js` and `assets/js/app.mjs`

**Checkpoint**: Essential learning flows work across screen sizes and remain available offline after successful preparation.

---

## Phase 5: User Story 2 — Analisar uma sequência (Priority: P2)

**Goal**: Let the learner inspect an existing flawed sequence, select its problematic command or an observed outcome, and retry with a useful hint.

**Independent Test**: Open an analyze challenge; select a problematic command or observed outcome, submit an incorrect selection and retry, then select an accepted target and inspect the explanation.

### Tests for User Story 2

- [X] T023 [P] [US2] Add analysis cases for command-step targets, observed-outcome targets, incorrect selections, and retry hints in `tests/sequence.test.mjs`

### Implementation for User Story 2

- [X] T024 [P] [US2] Render the provided analyze sequence with selectable command steps and observed execution outcomes in `assets/js/app.mjs`
- [X] T025 [US2] Evaluate analysis selections against trace-referenced `analysisChoices` and preserve retry context in `assets/js/app.mjs` and `assets/js/sequence.mjs`
- [X] T026 [US2] Give a progressive, child-readable clue after an incorrect selection without automatically revealing the full solution in `assets/js/feedback.mjs`

**Checkpoint**: An analyze challenge accepts trace-supported selections and allows another attempt after a mistake.

---

## Phase 6: User Story 3 — Criar uma sequência (Priority: P2)

**Goal**: Let the learner assemble, reorder, execute, inspect, edit, and retry a finite sequence of commands.

**Independent Test**: Build a sequence using controls, run it, inspect success or failure, edit it, and run again; confirm repetition and condition commands are unavailable.

### Tests for User Story 3

- [X] T027 [P] [US3] Add cases for learner-authored sequences, empty input, edit/retry, and unsupported commands in `tests/sequence.test.mjs`

### Implementation for User Story 3

- [X] T028 [P] [US3] Provide accessible add, remove, and reorder controls for allowed atomic commands without requiring dragging in `assets/js/app.mjs` and `index.html`
- [X] T029 [US3] Execute learner-authored sequences, retain the current attempt for review, and reset only transient evaluation state on edits in `assets/js/app.mjs` and `assets/js/sequence.mjs`
- [X] T030 [US3] Explain empty, incomplete, invalid, and unsuccessful sequences using observed outcomes and next-step guidance in `assets/js/feedback.mjs`

**Checkpoint**: Learners can create and revise a solution using keyboard or pointer/touch controls.

---

## Phase 7: User Story 4 — Resolver o desafio final (Priority: P3)

**Goal**: Combine strategy selection with learner-created finite algorithms in a final situation with explicit rules and success criteria.

**Independent Test**: Open the final challenge directly, construct and run a strategy, then confirm success/failure feedback reflects the observed decisions and permits review.

### Tests for User Story 4

- [X] T031 [P] [US4] Add final-level cases for strategy sequences, goal evaluation, alternative valid solutions, and review feedback in `tests/sequence.test.mjs`

### Implementation for User Story 4

- [X] T032 [P] [US4] Render the final challenge's explicit rules, goal, strategy context, and available command types in `assets/js/app.mjs`
- [X] T033 [US4] Connect final strategy construction and board execution to the shared deterministic evaluator while accepting every valid solution in `assets/js/app.mjs` and `assets/js/sequence.mjs`
- [X] T034 [US4] Relate final feedback to learner decisions and allow sequence review and another attempt in `assets/js/feedback.mjs` and `assets/js/app.mjs`

**Checkpoint**: The final challenge is directly accessible and uses the shared rules and feedback patterns.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Complete release validation, human review, deployment-path checks, and project documentation.

- [X] T035 Team reports cultural review and approval of exact game variants, sources, attribution, terminology, and child-facing cultural context; approval recorded in `assets/data/games.json` on 2026-10-01
- [ ] T036 Verify the GitHub Pages project subpath resolves the entry page, service worker, modules, styles, and JSON without origin-root assumptions in `specs/001-create-algorithmic-game-challenges/quickstart.md`
- [X] T037 Run deterministic sequence and board tests, including valid and invalid cases for every authored challenge, and record results in `tests/sequence.test.mjs` and `specs/001-create-algorithmic-game-challenges/quickstart.md`
- [ ] T038 Complete the browser/device, offline, accessibility, and cultural release walkthrough; for every authored challenge, confirm that valid and invalid attempts show age-appropriate explanatory feedback tied to observed outcomes; record outcomes without learner-identifying data in `specs/001-create-algorithmic-game-challenges/quickstart.md`
- [ ] T039 Conduct SC-003 usability evaluation with at least 10 representative students; verify at least 8 can start and finish one attempt in each level without help understanding main controls, and record aggregate-only results in `specs/001-create-algorithmic-game-challenges/quickstart.md`
- [X] T040 Inspect `assets/js/app.mjs` and `service-worker.js` to confirm the application makes no account, identity, progress, analytics, external API, CDN, or remote-asset requests; document the platform-level GitHub Pages IP logging boundary in `specs/001-create-algorithmic-game-challenges/quickstart.md`
- [X] T041 Update the service-worker cache version and resource list after final application and content assets are stable in `service-worker.js`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; creates the planned static-site structure.
- **Foundational (Phase 2)**: Depends on setup; provides rules, shared feedback, content, validation, and fixtures. T012 is a mandatory human approval gate before story implementation.
- **User Stories (Phases 3–7)**: Depend on foundation. Implement in priority order because stories share `app.mjs`, the evaluator/feedback modules, and the planned single test file.
- **Polish (Phase 8)**: Depends on all story flows and final content; cultural team approval is a release gate.

### User Story Dependencies

- **US1 (P1)**: Starts after foundation; first complete gameplay path and MVP.
- **US5 (P1)**: Starts after foundation; applies accessibility, responsiveness, and offline support across the stories.
- **US2 (P2)**: Starts after foundation; reuses board execution and feedback, while remaining directly testable with an analyze challenge.
- **US3 (P2)**: Starts after foundation; reuses the shared sequence evaluator and board view.
- **US4 (P3)**: Starts after foundation; integrates strategy construction and evaluation established in earlier flows.

### Parallel Opportunities

- Setup T002 and T004 use distinct files and can run in parallel; T003 follows T001 because it wires the page mount point.
- Foundation T007 and T008 use distinct files and can run in parallel after their shared content/rule contracts are agreed. T009 follows T008; T010 follows content creation; T011 follows the rule modules and complete challenge set.
- Within each story, marked test and view/control tasks use separate files and may begin in parallel after the foundation contracts are stable. Tasks that edit the same shared module remain sequential.
- User-story phases should be delivered in priority order; do not parallelize stories that both edit shared modules or `tests/sequence.test.mjs`.

## Parallel Examples

### User Story 1

After foundation, T013 can add test cases in `tests/sequence.test.mjs` while T014 renders the identify view in `assets/js/app.mjs`. T015 and T016 follow because they integrate shared execution and feedback.

### User Story 5

After foundation, T017 can document the acceptance matrix in `quickstart.md`, T018 can implement level navigation in `index.html` and `assets/js/app.mjs`, and T019 can implement layout in `assets/css/app.css`. T020–T022 follow in order because offline readiness depends on worker registration and cache verification.

### User Story 2

After foundation, T023 can add analysis test cases in `tests/sequence.test.mjs` while T024 renders selectable command/outcome targets in `assets/js/app.mjs`. T025–T026 integrate trace evaluation and feedback afterward.

### User Story 3

After foundation, T027 can add creation cases in `tests/sequence.test.mjs` while T028 builds command controls in `assets/js/app.mjs` and `index.html`. T029–T030 integrate execution and guidance.

### User Story 4

After foundation, T031 can add final-level cases in `tests/sequence.test.mjs` while T032 renders the final challenge in `assets/js/app.mjs`. T033–T034 connect shared evaluation and feedback afterward.

## Implementation Strategy

### MVP First (User Story 1)

1. Complete Setup and Foundational phases.
2. Complete US1 and validate selection, visible execution, goal result, explanation, and retry independently.
3. Add US5 to provide accessible, responsive, offline-capable access to all levels.
4. Add US2 and US3, then integrate them in US4.
5. Complete cultural approval and release checks before publication.

### Incremental Delivery

Deliver each user story as an independently accessible level or access capability. All four levels remain open from the beginning; no result locks another level. Preserve the team review gate for cultural content.

## Notes

- `[P]` marks tasks that edit distinct files and have no unfinished dependency.
- Story labels map to `spec.md`; setup, foundation, and polish tasks intentionally have no story label.
- `curriculumSkills` records the applicable curriculum skill codes; attempts remain in memory and only static resources enter Cache Storage.
- Candidate cultural content must not ship as approved until the team completes review.
- Completed tasks are marked `[X]`; deployment, browser/device/offline/accessibility walkthrough, and student-usability evaluation remain unchecked. Do not publish until the remaining required release checks are complete.

