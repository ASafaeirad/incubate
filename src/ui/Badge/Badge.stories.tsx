import preview from '#storybook/preview';

import { Badge } from './Badge';

const meta = preview.meta({
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
});

export const Default = meta.story({
  args: {
    children: 'Default',
  },
});

export const Primary = meta.story({
  args: {
    children: 'Primary',
    variant: 'primary',
  },
});

export const Destructive = meta.story({
  args: {
    children: 'Destructive',
    variant: 'destructive',
  },
});
