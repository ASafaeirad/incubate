import preview from '#storybook/preview';

import { Button } from './Button';

const meta = preview.meta({
  component: Button,
  args: {
    children: 'Button',
  },
  render: args => (
    <div className="flex items-center gap-2">
      <div>
        <Button {...args} />
        <Button {...args} disabled />
        <Button {...args} size="icon" aria-label="Icon button">
          &#9733;
        </Button>
        <Button {...args} size="icon" disabled aria-label="Icon button">
          &#9733;
        </Button>
      </div>

      <div>
        <Button {...args} size="sm" />
        <Button {...args} size="sm" disabled />
        <Button {...args} size="icon-sm" aria-label="Icon button">
          &#9733;
        </Button>
        <Button {...args} size="icon-sm" disabled aria-label="Icon button">
          &#9733;
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
