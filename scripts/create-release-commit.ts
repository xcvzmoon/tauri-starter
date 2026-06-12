import { $ } from 'bun';

import { version } from '../package.json';

const tag = `v${version}`;
const message = `chore(release): ${tag}`;

await $`git add package.json CHANGELOG.md src-tauri/Cargo.toml src-tauri/Cargo.lock src-tauri/tauri.conf.json`;
await $`git commit -m ${message}`;
await $`git tag -a ${tag} -m ${tag}`;
