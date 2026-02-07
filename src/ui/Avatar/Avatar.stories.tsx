import preview from '#storybook/preview';

import { Avatar } from './Avatar';

const meta = preview.meta({
  component: Avatar,
  tags: ['autodocs'],
});

export const Default = meta.story({
  args: {
    src: 'https://github.com/ASafaeirad.png',
  },
});
export const Fallback = meta.story({
  args: {
    fallback: 'AS',
  },
});

export const WithBadge = meta.story({
  args: {
    src: 'https://github.com/ASafaeirad.png',
    children: '3',
  },
});
