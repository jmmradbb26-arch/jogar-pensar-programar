# Learner Interaction Contract

This is the user-facing behavior contract for the static application. It exposes no public API or server endpoint.

## Entry and readiness

- The entry page introduces the activity in clear Portuguese, names the four levels, and displays their recommended order.
- All four levels are available immediately. The app does not gate a level on a prior result.
- During first load, the page identifies that offline resources are being prepared. It declares **Pronto para uso offline** only after all required app, game, challenge, and visual resources are available in the local cache.
- If offline preparation fails or a required cached resource is missing, the page explains the state and offers a retry/reconnect action. It does not claim offline readiness.
- No sign-in, registration, or personal information is requested.

## Challenge view

Every challenge view presents, before the learner runs commands:

1. Its title and learning level.
2. The game context, with culturally reviewed name, variant, and short context.
3. Rules, command meanings, and visible goal.
4. The starting board and the learner's role in the scenario.
5. Controls appropriate to the level.

### Level interactions

- **Identificar**: choose one offered finite sequence and run it.
- **Analisar**: inspect a finite provided sequence, select a problematic command or an observed outcome from its execution trace, and receive an explanation/prompt to retry.
- **Criar**: assemble an ordered sequence from allowed atomic commands, remove or reorder commands, run, inspect, edit, and retry.
- **Desafio final**: choose a strategy and create/run a finite sequence using previously introduced command types.
- No challenge sequence uses repetition or conditional commands.

## Execution and feedback

- Running a sequence shows each action on the board and the resulting state.
- Legal sequences satisfying the stated goal succeed even when they differ from the example solution.
- Invalid moves stop safely at the relevant step and explain the rule/outcome in age-appropriate language.
- Analyze selections are checked against the execution trace: a target may identify the problematic command step or an observed outcome; incorrect selections receive a clue for another attempt.
- Success and retry feedback refer to observed actions and the goal; feedback is not limited to a correct/incorrect label.
- Learners can retry without registering or submitting data.

## Accessibility and responsive behavior

- Every action is available through semantic keyboard-operable controls and pointer/touch controls; drag is never the only means to arrange commands.
- Focus remains visible. Success, error, selection, and board-state information use text/shape/pattern in addition to color.
- Controls target 44×44 CSS pixels where practical as the project usability target; no essential control is smaller than the applicable WCAG 2.2 AA requirement without a documented exception.
- Instructions and controls reflow at 320 CSS-pixel viewport width and 400% zoom. A spatial board may keep its own bounded two-dimensional layout, but the challenge remains operable and its instructions/controls remain reflowed and available.
- Nonessential movement respects reduced-motion settings.

## Offline behavior

- After one successful online load and offline-ready status, all four levels, challenge data, local assets, sequence execution, retries, and feedback continue without an active network connection.
- Core gameplay makes no request to an external API, CDN, font host, or analytics service.
- If the browser has cleared/evicted the required cache, the page describes the limitation and asks for a connected reload; it must not show stale offline-ready status.

## Cultural content release gate

- Initial content includes Jogo da Onça/Adugo and Yoté as candidate named contexts for the Indigenous and African matrices respectively.
- Each content record has a specific variant, source, and team review status. Only team-approved factual framing and terminology can be shown to learners.
- No universal origin, sacred meaning, or community practice is stated unless the team has validated a source adequate for that claim.
