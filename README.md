# Tauri Starter

[![CI](https://github.com/xcvzmoon/tauri-starter/actions/workflows/ci.yaml/badge.svg)](https://github.com/xcvzmoon/tauri-starter/actions/workflows/ci.yaml)

This is my personal Tauri with Nuxt starter template for quickly bootstrapping new desktop applications.

## Features

- Nuxt 4 + Vue 3 + TypeScript
- Tauri 2 desktop app shell
- UI with `@nuxt/ui`
- Formatter with `oxfmt`
- Linter with `oxlint` and `oxlint-tsgolint`
- Typechecking with `nuxt typecheck`
- Testing with Vitest unit tests, Nuxt runtime/component tests, Playwright e2e tests, and Playwright UI mode
- Rolldown-powered Vite setup via the top-level `vite` override
- Bun-first package manager, scripts, lockfile, and CI setup

## Scaffold A Project

Recommended with Bun:

```bash
bunx giget@latest gh:xcvzmoon/tauri-starter my-app --install
```

If you prefer to install dependencies yourself after scaffolding:

```bash
bunx giget@latest gh:xcvzmoon/tauri-starter my-app
cd my-app
bun install
```

## Package Manager Support

This template is configured for Bun first.

- `packageManager` in `package.json` is pinned to `bun@1.3.14`.
- Day-to-day commands in the repo use `bun` and `bun run`.
- The checked-in lockfile is `bun.lock`.
- CI uses `oven-sh/setup-bun` and installs dependencies with Bun.
- Release helper scripts in `scripts/` run directly with Bun and use Bun-native APIs.
- Tauri `beforeDevCommand` and `beforeBuildCommand` use Bun commands.

Other package managers may work, but they are not the primary supported path for this template.

## Install Dependencies

```bash
bun install
```

## Common Commands

```bash
bun run dev
bun run build
bun run generate
bun run preview
bun run fmt
bun run lint
bun run typecheck
bun run test
bun run test:unit
bun run test:nuxt
bun run test:e2e
bun run test:e2e:ui
```

## Tauri Commands

From the repository root, you can run Tauri through Bun:

```bash
bunx tauri dev
bunx tauri build
```

The Tauri config uses:

- `bun run dev` before development
- `bun run generate` before production builds

## Releases

Release commands use `changelogen` to bump `package.json`, update `CHANGELOG.md`, sync the Tauri app versions, create the release commit and tag, then push the result.

```bash
bun run release:patch
bun run release:minor
bun run release:major
```

The release flow keeps these version fields aligned:

- `package.json`
- `src-tauri/Cargo.toml`
- `src-tauri/Cargo.lock`
- `src-tauri/tauri.conf.json`

You can sync the Tauri files to the current `package.json` version without creating a release:

```bash
bun run sync:tauri-version
```

The helper scripts live in `scripts/` and run as TypeScript files with Bun.
