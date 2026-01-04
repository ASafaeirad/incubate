import { defineConfig } from '@fullstacksjs/eslint-config';

export default defineConfig({
  ignores: ['src/routeTree.gen.ts'],
  tailwind: {
    callees: ['cn', 'cva'],
    entryPoint: './src/styles.css',
  },
  typescript: {
    projectService: true,
    tsconfigRootDir: import.meta.dirname,
  },
});
