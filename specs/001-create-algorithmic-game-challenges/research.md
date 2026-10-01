# Research: Desafios de Jogos, Estratégias e Algoritmos

**Date**: 2026-10-01
**Feature**: [spec.md](spec.md)

## Decisions

### Static browser-native application

**Decision**: Use semantic HTML, CSS, and browser JavaScript modules with JSON game/challenge content. Use no third-party runtime dependency, framework, build step, backend, or external API.

**Rationale**: The feature is a compact, single-player static experience intended for GitHub Pages. A browser-native implementation reduces setup and dependency burden, works from a static host, and keeps interaction and rules local.

**Alternatives considered**: A frontend framework and bundler could organize a larger application, but add a build and dependency surface without a demonstrated need. A server API conflicts with the static hosting and no-account scope.

### Offline support after the first complete load

**Decision**: Add a same-scope service worker that precaches the app shell, all four levels, game/challenge JSON, and required local assets. Cache versions are explicit and old versions are cleaned only when the new cache is ready. The interface MUST show offline-ready only after precaching succeeds. It MUST explain how to reconnect if required cached content is unavailable.

**Rationale**: GitHub Pages provides static hosting, not offline behavior. Service workers and Cache Storage provide browser-side control of local static responses, but require explicit registration, fetch handling, HTTPS (localhost is an accepted development secure context), scope-aware paths, and cache lifecycle management. Browser storage is best-effort and can be evicted, so the app cannot promise offline access after its cache is cleared.

**Alternatives considered**: Relying only on content already in the open page may keep that tab usable, but does not cover navigation or a later offline reload. A remote API/CDN is incompatible with full offline gameplay. A third-party offline library is unnecessary for this small static asset set.

**Operational decisions**: Keep every essential font, image, script, and content file local. Use URLs resolved relative to the page/worker scope so a Pages project site below `/<repository>/` works. Do not force a new worker version into a running session; activate/update at a safe navigation point and provide a reload prompt when appropriate. Treat missing/evicted cache as an explicit recovery state, not as offline-ready.

### Initial game contexts and cultural review

**Decision**: Use Jogo da Onça/Adugo as the Indigenous-matrix context and Yoté as the African-matrix context for the initial challenge set. Represent a specific source-backed variant for each. Record the source and review status in content data. The PROFEducatec team MUST approve community/region attribution, rules, terms, and educational framing before release; do not publish unsupported universal-origin or symbolic claims.

**Rationale**: Public educational materials from SME Goiânia describe a Jogo da Onça variant as associated with the Bororo and call it Adugo, and describe Yoté as a strategy board game popular in Senegal. They also show that game descriptions/rules vary and that the materials target different grade groups. These sources are useful starting references for rules and candidate contexts, not substitutes for review by the project team or relevant cultural knowledge holders. Jogo da Onça is well suited to movement, adjacency, capture, and encirclement scenarios; Yoté supplies a distinct grid and movement/capture context. Both can be adapted into bounded single-player algorithm challenges without implementing a full two-player match.

**Alternatives considered**: Mancala/Awelé is another documented African board-game family, but its many regional variants and seed-sowing sequence deserve separate rules and cultural review. It is not selected for the initial pair. Generic board-game contexts alone do not meet the accepted requirement to include one named context from each matrix.

**Human review gate**: The named choices are planning decisions, not an AI cultural-authenticity claim. If the team cannot validate a selected variant and its framing, it MUST replace or defer that content and keep the requirement visible for review rather than presenting uncertain facts as settled.

### Accessible interaction baseline

**Decision**: Design to WCAG 2.2 AA for the complete application flow. Provide keyboard operation and visible focus; do not use color alone for game state; avoid drag-only command editing; reflow instructions and controls at narrow widths and high zoom. Set 44×44 CSS pixels as the preferred touch target size for learner controls, as a project usability target. Respect reduced-motion preferences for nonessential animations.

**Rationale**: The user audience includes children on computers, tablets, and phones. WCAG 2.2 AA provides testable accessibility criteria, including keyboard use, reflow and a 24×24 CSS-pixel minimum target-size criterion with exceptions. The larger 44-pixel target is an additional design choice for this age group, not the WCAG AA threshold.

**Alternatives considered**: Testing only with a mouse or a single viewport cannot verify the constitutional inclusion requirement. Claiming full WCAG conformance without evaluating all applicable criteria is also inappropriate; the plan uses AA as an acceptance baseline and requires manual verification.

### Rule and content verification

**Decision**: Isolate deterministic board/sequence rules in browser modules and test those rules with Node.js's built-in test runner. For every authored challenge, include at least one valid and one invalid sequence fixture and verify the stated-goal outcome. Verify displayed explanatory feedback in the manual browser matrix, alongside user experience, offline behavior, responsive/accessibility checks, and the deployed GitHub Pages path. Add no test-framework dependency.

**Rationale**: The rule evaluator is local and deterministic; built-in test support is sufficient for its outcomes. Feedback presentation, service-worker lifecycle, touch/keyboard usability, visual layout, cultural wording, and project-site path require browser-level acceptance checks.

**Alternatives considered**: An external end-to-end test framework could automate browser workflows, but is not justified before the small app exists and would add packages. Manual-only rule checking would make solution validation less repeatable.

### Platform-level privacy boundary

**Decision**: The client application MUST NOT collect learner identity, progress, analytics, or other unnecessary personal data. Document separately that GitHub Pages may log visitor IP addresses for hosting security; this infrastructure processing is outside the application's own storage and request behavior and must be considered in project/school privacy information.

**Rationale**: Avoiding app-level data collection does not mean the hosting provider processes no connection metadata. Stating this boundary keeps the privacy description accurate without adding app tracking or backend components.

**Alternatives considered**: Claiming that no visitor data is processed would exceed what the project controls. Adding an application analytics or identity service is outside the feature's privacy and simplicity goals.

## Research Sources

- GitHub Pages is a static hosting service: [GitHub Pages overview](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).
- GitHub Pages visitor IP logging for security purposes: [GitHub Pages overview — Data collection](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection).
- HTTPS configuration for Pages: [Securing a GitHub Pages site with HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https).
- Service worker requirements and scope: [MDN Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API), [MDN service worker registration](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register), and [MDN Service-Worker-Allowed header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Service-Worker-Allowed).
- Explicit cache strategies and cache lifecycle: [MDN caching guide](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Caching), [MDN Cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache), and [MDN storage quotas and eviction](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria).
- Accessibility baseline: [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/), including keyboard, use of color, reflow, dragging movements, and target size minimum.
- Node.js's built-in test runner: [Node.js test runner documentation](https://nodejs.org/api/test.html).
- Candidate Jogo da Onça/Adugo description and rules: [SME Goiânia, Jogo da Onça — características históricas e culturais](https://sme.goiania.go.gov.br/conexaoescola/ensino_fundamental/educacao-fisica-jogo-da-onca-caracteristicas-historicas-e-culturais/).
- Candidate Yoté description and note about rule variations: [SME Goiânia, Jogo de Tabuleiro Yoté](https://sme.goiania.go.gov.br/conexaoescola/eaja/educacao-fisica-jogo-de-tabuleiro-yote/).
- The HTML standard's native button semantics: [WHATWG button element](https://html.spec.whatwg.org/multipage/form-elements.html#the-button-element).
