# Tauri Starter

[![CI](https://github.com/xcvzmoon/tauri-starter/actions/workflows/ci.yaml/badge.svg)](https://github.com/xcvzmoon/tauri-starter/actions/workflows/ci.yaml)

This is my personal Tauri with Nuxt starter template for quickly bootstrapping new desktop applications.

## Features

- Nuxt 4 + Vue 3 + TypeScript
- Tauri 2 desktop app shell
- UI with `@nuxt/ui`
- Formatter with `oxfmt`
- Linter with `oxlint` and `oxlint-tsgolint`
- Typechecking with `bun run nuxt:typecheck`
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
bun run nuxt:postinstall
```

## Common Commands

```bash
bun run dev              # start the Tauri app in development
bun run build            # build Nuxt and Tauri production artifacts
bun run nuxt:dev         # start only the Nuxt dev server
bun run nuxt:build       # build only the Nuxt app
bun run nuxt:generate    # generate static Nuxt output for Tauri
bun run nuxt:preview     # preview the Nuxt build
bun run nuxt:typecheck   # run Nuxt type checking
bun run fmt
bun run lint
bun run test
bun run test:unit
bun run test:nuxt
bun run test:e2e
bun run test:e2e:ui
```

## Tauri Commands

From the repository root, you can run Tauri through Bun:

```bash
bun run tauri:dev
bun run tauri:build
```

The Tauri config uses:

- `bun run nuxt:dev` before development
- `bun run nuxt:generate` before production builds

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

## Platform Distribution

Production desktop artifacts are built by `.github/workflows/release.yaml` on OS-native GitHub runners:

- macOS builds on `macos-latest` with `--target universal-apple-darwin` and produces macOS bundle artifacts such as `.dmg`.
- Windows builds on `windows-latest` and produces Windows installer artifacts such as `.msi`.
- Linux builds on `ubuntu-latest` and produces Linux package artifacts such as `.deb`, `.rpm`, and `.AppImage`.

The Tauri bundle targets are configured explicitly in `src-tauri/tauri.conf.json`:

```json
["dmg", "msi", "deb", "rpm", "appimage"]
```

The production Tauri identifier is stable and does not use a development suffix:

```json
"com.xcvzmoon.tauri-starter"
```

To create a release, run one of the release commands locally:

```bash
bun run release:patch
bun run release:minor
bun run release:major
```

Those commands create and push a Git tag like `v1.2.3`. Pushing that tag triggers the release workflow, builds each platform, uploads workflow artifacts, and attaches the generated bundles to the GitHub Release.

For signed production releases, configure the relevant GitHub Actions secrets before publishing:

- macOS: `APPLE_CERTIFICATE`, `APPLE_CERTIFICATE_PASSWORD`, `APPLE_SIGNING_IDENTITY`, `APPLE_ID`, `APPLE_PASSWORD`, `APPLE_TEAM_ID`
- Windows: `WINDOWS_CERTIFICATE`, `WINDOWS_CERTIFICATE_PASSWORD` or your signing provider's required secrets
- Tauri updater, if enabled: `TAURI_SIGNING_PRIVATE_KEY`, `TAURI_SIGNING_PRIVATE_KEY_PASSWORD`
