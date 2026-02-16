import convexPlugin from '@convex-dev/eslint-plugin';
import { defineConfig } from '@fullstacksjs/eslint-config';

export default defineConfig(
  {
    ignores: ['src/routeTree.gen.ts', 'convex/_generated'],
    tailwind: {
      callees: ['cn', 'cva'],
      entryPoint: './src/styles.css',
    },
    typescript: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
    rules: {
      '@eslint-react/no-children-prop': 'off',
    },
  },
  {
    files: ['**/convex/**/*.ts'],
    plugins: {
      '@convex-dev': convexPlugin.configs.recommended.plugins['@convex-dev'],
    },
    rules: {
      ...convexPlugin.configs.recommended.rules,
      'no-await-in-loop': 'off',
    },
  },
);
