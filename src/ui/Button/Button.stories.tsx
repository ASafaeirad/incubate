import { IconStar } from '@tabler/icons-react';
import preview from '#storybook/preview';

import { Button } from './Button';

const meta = preview.meta({
  component: Button,
  args: {
    children: 'Button',
  },
  render: args => (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <Button {...args} />
        <Button {...args} disabled />
        <Button {...args} size="icon" aria-label="Icon button">
          <IconStar />
        </Button>
        <Button {...args} size="icon" aria-label="Icon button" disabled>
          <IconStar />
        </Button>
      </div>

      <div className="flex items-center gap-1">
        <Button {...args} size="sm" />
        <Button {...args} size="sm" disabled />
        <Button {...args} size="icon-sm" aria-label="Icon button">
          <IconStar />
        </Button>
        <Button {...args} size="icon-sm" disabled aria-label="Icon button">
          <IconStar />
        </Button>
      </div>
    </div>
  ),
  tags: ['autodocs'],
});

export const Default = meta.story();

export const Primary = meta.story({
  args: {
    variant: 'primary',
    children: 'Primary',
  },
});

export const Secondary = meta.story({
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
});

export const Destructive = meta.story({
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
});

export const Link = meta.story({
  args: {
    variant: 'link',
    children: 'Link',
  },
});
