import preview from '#storybook/preview';

import { Heading } from './Heading';

const meta = preview.meta({
  component: Heading,
  args: {
    children: 'Heading Text',
  },
  tags: ['autodocs'],
});

export const Default = meta.story();

export const Levels = meta.story({
  render: () => (
    <div className="flex flex-col gap-3">
      <Heading level="h1">Heading Level 1</Heading>
      <Heading level="h2">Heading Level 2</Heading>
      <Heading level="h3">Heading Level 3</Heading>
      <Heading level="h4">Heading Level 4</Heading>
    </div>
  ),
});

export const Variants = meta.story({
  render: () => (
    <div className="flex flex-col gap-3">
      <Heading variant="default">Default Heading</Heading>
      <Heading variant="muted">Muted Heading</Heading>
      <Heading variant="primary">Primary Heading</Heading>
      <Heading variant="destructive">Destructive Heading</Heading>
    </div>
  ),
});
