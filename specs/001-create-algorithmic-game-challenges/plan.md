# Implementation Plan: Desafios de Jogos, Estratégias e Algoritmos

**Branch**: `001-create-algorithmic-game-challenges` | **Date**: 2026-10-01 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification for the PROFEducatec educational game challenges.

## Summary

Build a static, single-player browser application for four freely accessible learning levels. It uses Jogo da Onça/Adugo and Yoté as initial board-game contexts, with culturally reviewed content, finite command sequences, immediate board-state feedback, and offline use after all local content has loaded. In Analisar, learners select a problematic command or observed outcome from the execution trace. Each authored challenge is checked with valid and invalid deterministic examples. Use browser-native HTML, CSS, JavaScript modules, JSON content, and a service worker; avoid runtime packages, accounts, external APIs, and remote assets.

## Technical Context

**Language/Version**: HTML Living Standard, CSS, and browser JavaScript modules (ES2022 baseline).

**Primary Dependencies**: No third-party runtime dependencies. Browser APIs: ES modules, Fetch, Service Worker, and Cache Storage. Node.js built-in test runner for pure sequence and board-rule tests only.

**Storage**: Cache Storage holds versioned static application assets and challenge data for offline use. Attempt and board state remain in memory; no learner identity, profile, progress, or analytics are persisted by the application.

**Testing**: Node built-in tests for deterministic sequence and board rules, including at least one valid and one invalid example for every authored challenge; manual browser acceptance checks for all user flows, cultural content review, keyboard and touch access, responsive layout, offline readiness, cache update, and GitHub Pages subpath deployment.

**Target Platform**: Current evergreen desktop and mobile browsers that support JavaScript modules and service workers; GitHub Pages over HTTPS. The deployed site is a project site under a repository path, so all resources and navigation MUST work below a subpath.

**Project Type**: Static client-side web application; no server-side component or account system.

**Performance Goals**: All sequence evaluation and feedback MUST be local and MUST NOT depend on a network round trip. After offline readiness, all four levels and their required content MUST be available without network access. The feature has no server throughput or concurrent-user target.

**Constraints**: GitHub Pages static hosting; first successful load requires connectivity; all essential content and assets must be local and precached before the app reports offline-ready; no third-party runtime packages, CDN resources, application-level personal-data collection, or unsupported cultural claims. Cache eviction or user-cleared browser storage requires a clear reconnect/reload recovery message. GitHub Pages may log visitor IP addresses as hosting security metadata; this provider-level processing is outside the application's own collection and must be reflected in applicable project/school privacy information.

**Scale/Scope**: One learner at a time; four levels available from the beginning; at least one complete challenge per level; one reviewed game context from each required matrix; finite, linear command sequences only; no persistent learner records.

## Constitution Check

**Pre-research gate: PASS.** The selected scope advances learning and explicitly maps to EF03CO01 and EF35EF01. It preserves age-appropriate progression, experimentation, explanatory feedback, learner choice, accessibility, responsiveness, privacy, and verifiable outcomes.

**Design gates**:

- **Pedagogy and progression — PASS**: Four levels remain open; the suggested learning order is visible; every level uses a finite command sequence and a stated goal.
- **Learner control and feedback — PASS**: Learners can select, inspect, construct, execute, revise, and retry sequences; valid alternative solutions are accepted and outcomes are explained.
- **Accessibility and devices — PASS**: WCAG 2.2 AA is the baseline; keyboard operation, visible focus, non-color status, no drag-only interaction, reflow and touch usability are design requirements. A 44 CSS-pixel target is an additional project usability target, beyond the WCAG 2.2 AA 24 CSS-pixel minimum.
- **Cultural care — PASS WITH REVIEW GATE**: Initial contexts are Jogo da Onça/Adugo and Yoté. Sources inform candidate variants; the team MUST review exact attribution, rules, vocabulary, and child-facing explanations before publication.
- **Technical simplicity and privacy — PASS**: Static browser-native application, no third-party runtime dependencies or external service calls, no account, and no learner-data persistence. Service-worker cache stores application content only. The privacy boundary distinguishes app behavior from GitHub Pages access logging.
- **Maintainability, verification, and traceability — PASS**: Separate app interaction, board/sequence rules, and reviewed JSON content; each authored challenge has valid/invalid deterministic verification; requirement-to-design traceability is recorded in these artifacts. Human team approval remains required for AI-assisted decisions.

No constitution violations or additional project complexity require justification.

## Human Review Record

**Gate**: Mandatory before final implementation and publication. The responsible team reviews pedagogical and technical decisions; challenge content; game rules and representations; feedback criteria; accessibility; and other artifacts produced with AI support. No decision proposed by the AI agent is automatically approved.

**Separate cultural gate**: The cultural review of attribution, sources, terminology, exact variants, and child-facing context is recorded separately under T035 in `tasks.md`.

**Team outcome**: **Approved** — the responsible team reports that it reviewed and approved the specification and the decisions covered by this gate on 2026-10-01. No pending items or requested changes were reported.

**Cultural review outcome**: **Approved** — the team reports that it reviewed and approved the game content and variants on 2026-10-01. The approval status is recorded in `assets/data/games.json`; no changes to game content, rules, challenges, or cultural data were requested or made.

## Project Structure

### Documentation (this feature)

```text
specs/001-create-algorithmic-game-challenges/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── learner-interaction.md
└── tasks.md                 # Generated later by $speckit-tasks
```

### Source Code (repository root)

```text
index.html
service-worker.js
assets/
├── css/
│   └── app.css
├── js/
│   ├── app.mjs
│   ├── board.mjs
│   ├── sequence.mjs
│   └── feedback.mjs
└── data/
    ├── games.json
    └── challenges.json
tests/
└── sequence.test.mjs
```

**Structure Decision**: A flat static site keeps the GitHub Pages entry point at the published site root and avoids a build pipeline. Browser modules separate interaction from deterministic rules. JSON keeps reviewed game and challenge content editable without changing rule code. The root service worker can control the project-site subpath; registrations, asset URLs, and cache requests MUST resolve relative to the deployed scope, never the origin root. No installable-app manifest or server is required by this feature.

## Requirements Traceability

| Specification items | Design artifacts and verification |
|---|---|
| FR-001–FR-004, FR-016, SC-001, SC-005 | `CulturalGame` and `Challenge` data in [data-model.md](data-model.md); cultural release gate and level availability in [learner-interaction.md](contracts/learner-interaction.md); team review in [quickstart.md](quickstart.md). |
| FR-005, FR-007–FR-008 | `Challenge`, `CommandSequence`, and `AttemptResult` in [data-model.md](data-model.md); level interactions and sequence outcomes in [learner-interaction.md](contracts/learner-interaction.md). |
| FR-006 | `providedSequence` and `analysisChoices` in [data-model.md](data-model.md); selection of a problematic command or observed outcome in [learner-interaction.md](contracts/learner-interaction.md); retry and trace checks in [quickstart.md](quickstart.md). |
| SC-002 | Per-challenge valid/invalid fixtures and deterministic checks in [data-model.md](data-model.md) and [quickstart.md](quickstart.md). |
| FR-009–FR-013 | Challenge view, execution, feedback, retry, and valid-solution acceptance in [learner-interaction.md](contracts/learner-interaction.md), backed by [data-model.md](data-model.md). |
| FR-014–FR-015, SC-004 | Accessibility and responsive behavior in [learner-interaction.md](contracts/learner-interaction.md); viewport, keyboard, pointer, and device checks in [quickstart.md](quickstart.md). |
| FR-017, SC-006 | No account or learner record in Technical Context, [data-model.md](data-model.md), and [learner-interaction.md](contracts/learner-interaction.md). |
| FR-018 | `curriculumSkills`, level, goal, and success-rule validation in [data-model.md](data-model.md); the requirement-to-design matrix in this plan links each requirement to artifacts and verification. |
| FR-019, SC-007 | Offline cache readiness and recovery in Technical Context and [learner-interaction.md](contracts/learner-interaction.md); network-interruption walkthrough in [quickstart.md](quickstart.md); technical rationale in [research.md](research.md). |
| SC-003 | Target-user usability evaluation and aggregate-only results in [quickstart.md](quickstart.md). |

## Complexity Tracking

No constitution violations or complexity additions to justify.
