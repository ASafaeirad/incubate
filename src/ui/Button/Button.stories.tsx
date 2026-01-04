import preview from '#storybook/preview';

import { Button } from './Button';

const meta = preview.meta({
  component: Button,
  args: {
    children: 'Button',
  },
});

export const Default = meta.story();

export const Disabled = meta.story({
  args: {
    children: 'Disabled',
    disabled: true,
  },
});
