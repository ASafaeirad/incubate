import { defineConfig } from '@fullstacksjs/eslint-config';

export default defineConfig({
  ignores: ['src/routeTree.gen.ts'],
  typescript: {
    projectService: true,
    tsconfigRootDir: import.meta.dirname,
  },
});
