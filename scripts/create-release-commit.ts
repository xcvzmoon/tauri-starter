import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';

type PackageJson = {
  version?: unknown;
};

const packageJson = JSON.parse(
  await readFile(new URL('../package.json', import.meta.url), 'utf8'),
) as PackageJson;
const { version } = packageJson;

if (typeof version !== 'string' || version.length === 0) {
  throw new Error('package.json version must be a non-empty string.');
}

const tag = `v${version}`;
const message = `chore(release): ${tag}`;

run('git', [
  'add',
  'package.json',
  'CHANGELOG.md',
  'src-tauri/Cargo.toml',
  'src-tauri/Cargo.lock',
  'src-tauri/tauri.conf.json',
]);
run('git', ['commit', '-m', message]);
run('git', ['tag', '-a', tag, '-m', tag]);

function run(command: string, args: string[]): void {
  execFileSync(command, args, {
    stdio: 'inherit',
  });
}
