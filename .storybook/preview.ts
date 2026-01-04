import '../src/styles.css';
import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /date$/i,
      },
    },

    a11y: {
      test: 'todo', // 'off' | 'todo' | 'error'
    },
  },
};

export default preview;
