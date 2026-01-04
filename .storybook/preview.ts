import '../src/styles.css';

import addonA11y from '@storybook/addon-a11y';
import { definePreview } from '@storybook/react-vite';

export default definePreview({
  addons: [addonA11y()],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
  initialGlobals: {
    backgrounds: { value: 'dark' },
  },
});
