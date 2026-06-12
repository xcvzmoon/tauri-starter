# Repository Guidelines

## Project Structure & Module Organization

This is a Nuxt 4, Vue 3, TypeScript starter. Application code lives in `app/`: route pages in `app/pages/`, layouts in `app/layouts/`, reusable components in `app/components/`, global CSS in `app/assets/css/`, and UI config in `app/app.config.ts`. Static public files belong in `public/`. Unit tests live in `test/unit/`, Nuxt runtime/component tests in `test/nuxt/`, and Playwright end-to-end specs in `tests/`. Keep generated artifacts such as `.nuxt/`, `.output/`, `coverage/`, `playwright-report/`, and `test-results/` out of source control.

## Build, Test, and Development Commands

Use `bun` as the package manager; the project declares `bun @1.3.14`.

- `bun run dev`: start the local Nuxt dev server.
- `bun run build`: create a production build.
- `bun run generate`: generate static output.
- `bun run preview`: preview the built app.
- `bun run fmt`: run `oxfmt` and its formatting check.
- `bun run lint`: run `oxlint`.
- `bun run typecheck`: run Nuxt type checking.
- `bun run test`: run all Vitest projects.
- `bun run test:e2e`: run Playwright browser tests.

## Coding Style & Naming Conventions

Use TypeScript and `<script setup lang="ts">` for Vue single-file components. Follow `oxfmt` output: 2-space indentation, semicolons, single quotes in TS/Vue script blocks, and formatter-controlled wrapping. Prefer type-only imports with `import type`. Component files use kebab-case, for example `app/components/app/scroll-area.vue`; type aliases and component names use `PascalCase`; variables and functions use `camelCase`.

## Testing Guidelines

Use Vitest for unit and Nuxt-aware tests, with `@nuxt/test-utils` helpers such as `mountSuspended` when rendering Nuxt components. Name test files `*.test.ts` or `*.spec.ts`. Keep tests focused on observable behavior. Run targeted checks first, for example `bun run test:unit -- test/unit/example.test.ts`, then broaden to `bun run test`, `bun run test:nuxt`, or `bun run test:e2e` when behavior crosses boundaries.

## Commit & Pull Request Guidelines

Recent history follows Conventional Commit style, such as `docs: update ci badge link`, `chore(actions): update ci`, and `chore: add release script`. Use concise imperative subjects with an optional scope. Pull requests should explain the change, list validation commands run, link related issues, and include screenshots or recordings for visible UI changes.

## Editing Guidance

- Make the smallest correct change.
- Do not polish unrelated code.
- Do not remove correct comments or documentation.
- Do not rename broad parts of the codebase unless required.
- Do not expand a change into a repo-wide refactor unless necessary.
- Prefer leaving correct existing code in place.
- When touching production-sensitive code, prioritize reliability over clever abstractions.

## Before Finishing

- Run `bun run fmt` if you changed formatting significantly.
- Run `bun run lint` or at least targeted `oxlint` on touched files.
- Run targeted tests when tests exist.
- For runtime-sensitive changes, prefer a narrow smoke check over broad refactors.
- If you changed build or runtime behavior, ensure `bun run build` still works.

## LLMS Links

- Nuxt: https://nuxt.com/llms.txt
- Nuxt UI: https://ui.nuxt.com/llms.txt
- Vue: https://vuejs.org/llms.txt
