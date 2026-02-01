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
  },
  ...convexPlugin.configs.recommended,
);
