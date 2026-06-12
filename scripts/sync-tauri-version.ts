import { file, write } from 'bun';

import { version } from '../package.json';
import tauriConfig from '../src-tauri/tauri.conf.json';

const ROOT = `${import.meta.dir}/..`;
const CARGO_TOML_PATH = `${ROOT}/src-tauri/Cargo.toml`;
const CARGO_LOCK_PATH = `${ROOT}/src-tauri/Cargo.lock`;
const TAURI_CONFIG_PATH = `${ROOT}/src-tauri/tauri.conf.json`;

const cargoToml = await file(CARGO_TOML_PATH).text();
const packageNameMatch = cargoToml.match(/^name = "([^"]+)"$/m);

if (!packageNameMatch) {
  throw new Error('Unable to find package name in src-tauri/Cargo.toml.');
}

const cargoPackageName = packageNameMatch[1];

await write(CARGO_TOML_PATH, cargoToml.replace(/^version = "[^"]+"$/m, `version = "${version}"`));

const cargoLock = await file(CARGO_LOCK_PATH).text();
const pattern = `(name = "${escapeRegExp(cargoPackageName)}"\\nversion = ")[^"]+(")`;
const cargoLockPackagePattern = new RegExp(pattern);

if (!cargoLockPackagePattern.test(cargoLock)) {
  throw new Error(`Unable to find ${cargoPackageName} in src-tauri/Cargo.lock.`);
}

await write(CARGO_LOCK_PATH, cargoLock.replace(cargoLockPackagePattern, `$1${version}$2`));
await write(TAURI_CONFIG_PATH, `${JSON.stringify({ ...tauriConfig, version }, null, 2)}\n`);

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
