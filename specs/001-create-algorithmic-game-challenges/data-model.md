# Data Model: Desafios de Jogos, Estratégias e Algoritmos

This feature has static authored challenge content and transient in-memory attempts. It has no account, student profile, personal information, or persistent progress record. Static resources are cached by the browser only to support offline use.

## Entities

### CulturalGame

Describes the cultural context and the specific game variant used by one or more challenges.

| Field | Meaning and validation |
|---|---|
| `id` | Stable unique content identifier; referenced by challenges. |
| `displayName` | Reviewed public name, such as Jogo da Onça/Adugo or Yoté. |
| `matrix` | Required category: `indigenous` or `african`; each must occur for at least one initial game. |
| `communityOrRegion` | Specific community, people, or region only when supported by reviewed sources; no unsupported general attribution. |
| `variant` | The defined rule variant used in the app; MUST distinguish it from other variants. |
| `context` | Age-appropriate explanation of the game and its context, approved by the team. |
| `sources` | One or more source titles and URLs supporting factual claims and selected rules. |
| `reviewStatus` | `draft`, `in-review`, or `approved`; only approved content can ship. |

### Challenge

A self-contained activity linking one game context to a learning level and a verifiable goal.

| Field | Meaning and validation |
|---|---|
| `id` | Stable unique challenge identifier. |
| `gameId` | Required reference to a `CulturalGame`. |
| `level` | Exactly one of `identify`, `analyze`, `create`, or `final`. |
| `curriculumSkills` | Required list of applicable curriculum skill codes, including `EF03CO01` and `EF35EF01` for this integrated feature. |
| `title`, `instructions` | Clear Portuguese wording for grades 3–5; all rules needed for the activity are available before execution. |
| `board` | Reference or embedded definition of the board graph and initial state. |
| `goal` | Learner-visible target state or outcome. |
| `allowedCommands` | Finite set of commands valid for this challenge and game variant. |
| `successRule` | Deterministic test of whether the goal was met; accepts all valid solutions. |
| `providedSequence` | Required for `analyze`; finite sequence with at least one intentional, explainable issue. |
| `choices` | Required for `identify`; contains offered sequences including a solution. |
| `analysisChoices` | Required for `analyze`; finite selectable targets that reference either a command step in `providedSequence` or an observed outcome from its execution. Each target has a learner-readable label and deterministic correctness against the trace. |
| `feedback` | Child-readable success, invalid-action, and retry guidance tied to observable outcomes. |

### BoardDefinition

A board is represented as playable cells or points and permitted connections, so square and non-square traditional layouts can share the same rule evaluator.

| Field | Meaning and validation |
|---|---|
| `id` | Unique board identifier within authored content. |
| `cells` | Set of playable positions with stable IDs and optional semantic labels. |
| `connections` | Legal adjacent moves; direction and jump/capture relations are explicit rather than inferred from color or layout. |
| `blockedCells` | Optional positions unavailable in the challenge. |
| `initialPieces` | Starting pieces and roles; rendered with both shape/label and visual styling. |

### CommandSequence

The learner's finite, ordered algorithm for a single attempt.

| Field | Meaning and validation |
|---|---|
| `steps` | Ordered list of atomic commands; no loops, repetition constructs, branches, or conditions. An empty list is allowed as an incomplete attempt and receives guidance. |
| `currentStep` | Runtime index of the next command during execution. |
| `source` | `choice`, `provided`, or `learner` according to level; not identity-bearing. |

### AttemptResult

Transient result of executing one sequence against a challenge.

| Field | Meaning and validation |
|---|---|
| `status` | `ready`, `running`, `success`, or `retry`. |
| `observedState` | Board position and pieces after each executed step, retained in memory for review. |
| `stoppedAt` | Optional step index where a rule violation or terminal outcome occurred. |
| `feedback` | Explanation linked to the actual outcome and next possible action. |

### OfflineReadiness

Runtime status for static-resource availability, not learner data.

| State | Meaning |
|---|---|
| `checking` | Initial app load or cache verification is in progress. |
| `ready` | The service worker has installed and all essential local resources are cached. |
| `unavailable` | The worker is unsupported or required resources could not be cached; show a reconnect/retry explanation. |

## Relationships

- One `CulturalGame` can have multiple `Challenge` records; every challenge references exactly one game and one level.
- A `Challenge` references one `BoardDefinition` and one success rule.
- A `CommandSequence` is created or selected for one `Challenge`; execution creates one transient `AttemptResult`.
- `OfflineReadiness` describes availability of the application shell and all static game/challenge resources; it does not own challenge attempts.

## State Transitions

```text
OfflineReadiness: checking → ready
OfflineReadiness: checking → unavailable → checking (after reconnect/retry)
AttemptResult: ready → running → success
AttemptResult: ready → running → retry → running (edited or new attempt)
```

A new or edited attempt resets only the transient sequence/evaluation state. Leaving or reloading the app may discard attempt progress. No transition records a student's identity or history.

## Validation Rules

1. All IDs are unique within their entity type; every foreign reference resolves.
2. The content set includes all four levels and at least one complete challenge per level.
3. At least one approved `CulturalGame` with each required matrix (`indigenous`, `african`) is referenced by a challenge before release.
4. Cultural content with status other than `approved` cannot be released.
5. Every challenge has rules, commands, initial board, visible goal, deterministic success rule, and feedback for success and retry.
6. Every challenge includes `curriculumSkills` and one of the four defined pedagogical levels; its goal and success rule are objectively verifiable.
7. Analyze challenges include selectable targets referencing a command step or observed execution outcome; at least one accepted target matches the actual trace.
8. Every sequence is finite and contains only commands allowed by its challenge; no repetition/condition command exists.
9. Board moves resolve only over declared legal connections; out-of-board, blocked, and invalid moves stop safely and produce feedback.
10. Success is determined by the stated goal, not by one canonical sequence; multiple valid sequences MUST be accepted.
11. Every authored challenge has at least one valid and one invalid deterministic fixture used to verify its success rule and explanatory feedback.
12. Content and essential assets are same-origin static resources included in the offline precache set.
13. Only static resources enter Cache Storage. Attempts, result history, identifiers, and personal data do not.
