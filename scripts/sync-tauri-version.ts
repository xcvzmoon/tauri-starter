import { readFile, writeFile } from 'node:fs/promises';

type PackageJson = {
  version?: unknown;
};

type TauriConfig = {
  version?: string;
  [key: string]: unknown;
};

const root = new URL('../', import.meta.url);
const packageJsonPath = new URL('package.json', root);
const cargoTomlPath = new URL('src-tauri/Cargo.toml', root);
const cargoLockPath = new URL('src-tauri/Cargo.lock', root);
const tauriConfigPath = new URL('src-tauri/tauri.conf.json', root);

const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8')) as PackageJson;
const { version } = packageJson;

if (typeof version !== 'string' || version.length === 0) {
  throw new Error('package.json version must be a non-empty string.');
}

const cargoToml = await readFile(cargoTomlPath, 'utf8');
const packageNameMatch = cargoToml.match(/^name = "([^"]+)"$/m);

if (!packageNameMatch) {
  throw new Error('Unable to find package name in src-tauri/Cargo.toml.');
}

const cargoPackageName = packageNameMatch[1];

await writeFile(cargoTomlPath, cargoToml.replace(/^version = "[^"]+"$/m, `version = "${version}"`));

const cargoLock = await readFile(cargoLockPath, 'utf8');
const cargoLockPackagePattern = new RegExp(
  `(name = "${escapeRegExp(cargoPackageName)}"\\nversion = ")[^"]+(")`,
);

if (!cargoLockPackagePattern.test(cargoLock)) {
  throw new Error(`Unable to find ${cargoPackageName} in src-tauri/Cargo.lock.`);
}

await writeFile(cargoLockPath, cargoLock.replace(cargoLockPackagePattern, `$1${version}$2`));

const tauriConfig = JSON.parse(await readFile(tauriConfigPath, 'utf8')) as TauriConfig;
tauriConfig.version = version;

await writeFile(tauriConfigPath, `${JSON.stringify(tauriConfig, null, 2)}\n`);

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
