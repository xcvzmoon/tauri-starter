import { defineConfig } from 'oxfmt';

export default defineConfig({
  sortImports: {
    groups: [
      'type-import',
      'type-internal',
      ['type-parent', 'type-sibling', 'type-index'],
      ['value-builtin', 'value-external'],
      'value-internal',
      ['value-parent', 'value-sibling', 'value-index'],
      'unknown',
    ],
  },
  sortTailwindcss: {
    stylesheet: './app/assets/css/main.css',
    attributes: ['class'],
    functions: ['clsx', 'cn'],
    preserveWhitespace: true,
  },
  ignorePatterns: ['CHANGELOG.md', '.agents'],
  sortPackageJson: false,
  singleQuote: true,
  singleAttributePerLine: true,
  vueIndentScriptAndStyle: true,
});
