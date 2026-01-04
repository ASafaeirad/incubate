import type { Meta, StoryObj } from '@storybook/react-vite';

import { expect, fn } from 'storybook/test';

import { Button } from './Button';

export default {
  component: Button,
  args: {
    children: 'Button',
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async function play({ args, canvas, userEvent }) {
    const button = canvas.getByRole('button', { name: /button/i });

    await userEvent.click(button);
    await expect(button).toBeDisabled();
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};
