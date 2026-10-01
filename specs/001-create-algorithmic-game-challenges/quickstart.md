# Quickstart and Validation Guide

This guide explains how to run and validate the implemented static application. Its verification record distinguishes automated checks already completed from browser, deployment, and human review steps that remain pending.

## Prerequisites

- A current browser with JavaScript modules and service-worker support.
- Python 3 for a local static HTTP server (`py` launcher on Windows, or `python3` elsewhere); localhost is treated as a secure context for service workers.
- Node.js for the built-in deterministic rule tests. No test package is required.

## Start locally

From the repository root:

```powershell
py -m http.server 8000
```

On systems without the Windows Python launcher:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000/`. Use a local HTTP server rather than a `file://` URL so browser modules and service workers behave as they do on the hosted site.

## Deterministic rules

After implementation, run:

```sh
node --test tests/sequence.test.mjs
```

Expected result: all cases pass for legal and illegal moves, finite sequence evaluation, each learning-level input shape, goal detection, and acceptance of every valid solution represented in fixtures. The deterministic suite evaluates every authored challenge with at least one valid and one invalid sequence and confirms the stated-goal outcome for each. Verify the displayed explanatory feedback for those attempts in the browser acceptance walkthrough.

## End-to-end acceptance walkthrough

1. Open the app with a network connection and wait for the explicit offline-ready status.
2. Confirm the level selector shows all four levels immediately and marks the recommended order without locking later levels.
3. Complete at least one challenge in each level: choose a sequence, analyze a flawed sequence, construct/edit/run a sequence, and complete the final strategy challenge.
4. Run the usability evaluation described by SC-003 with at least 10 students representative of grades 3Ã¢â‚¬â€œ5; at least 8 must start and finish one attempt in each level without help understanding the main controls. Arrange school/family authorization under the project's applicable process and retain only aggregate, non-identifying results.
5. For each authored challenge, run at least one valid and one invalid sequence. Confirm the valid sequence reaches the stated goal, invalid execution produces an observable result and explanatory feedback, and an alternate valid sequence is accepted where the rules allow it. Also try an empty sequence and a blocked/out-of-board move; confirm clear continuation guidance and safe stop/feedback.
6. In each analyze challenge, select a problematic command and/or an observed outcome from the execution trace. Confirm the selection is evaluated against that trace and an incorrect selection receives a useful retry clue.
7. Turn off network access. Confirm all four levels, board interactions, retries, and feedback still work. Refresh/reopen the app offline after the service worker controls the page; all essential content must remain available.
8. Use keyboard only. Check logical focus order, visible focus, command arrangement without dragging, and readable success/error messages.
9. Check a 320 CSS-pixel viewport and 400% zoom. Instructions and controls must remain usable; the board's own spatial area may scroll if necessary.
10. Check computer, tablet, and smartphone touch/pointer use; confirm project target size and reduced-motion behavior.
11. Review Jogo da OnÃƒÂ§a/Adugo and YotÃƒÂ© attribution, rule variants, terms, sources, and learner-facing wording with the project team before release.
12. Test the deployed GitHub Pages project URL under its repository subpath. Confirm the entry page, worker, JSON, and all assets resolve without origin-root assumptions.

## Privacy and hosting note

The application itself does not add identity, progress, analytics, or personal-data collection. GitHub Pages may log visitors' IP addresses as hosting security metadata; this platform-level processing is outside the application's client-side storage behavior and should be considered in the project's applicable privacy information and school deployment review.

## Expected outcomes

These are the acceptance criteria for the implemented app. Automated deterministic rules currently pass; browser, responsive, offline-reload, deployed-path, cultural, and student-usability checks remain pending, so full conformance has not yet been established.

## Implementation verification record

- Deterministic rules: **PASS** on 2026-10-01 with Node.js v24.21.0 (`node --test tests/sequence.test.mjs`): 7 tests passed, 0 failed. Coverage includes every authored challenge with valid and invalid sequences, goal checking, invalid moves, unsupported command types, identify choices, analyze command and observed-outcome selections, retries, and an alternate final solution.
- Privacy inspection: the application source and service worker contain no account, identity, learner-progress, analytics, third-party API, CDN, or remote-asset requests. Static challenge and game files are same-origin. Attempts stay in JavaScript memory; Cache Storage contains only the application shell and static files. GitHub Pages IP logging remains a hosting-level boundary described above.
- The cultural review (T035) was approved by the team on 2026-10-01. Deployed Pages subpath verification (T036), browser/device/offline/accessibility walkthrough (T038), and student usability evaluation (T039) remain pending. Do not publish until the remaining required release checks are complete.

