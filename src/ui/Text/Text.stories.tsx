import preview from '#storybook/preview';

import { Text } from './Text';

const meta = preview.meta({
  component: Text,
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
  },
  tags: ['autodocs'],
});

export const Default = meta.story();

export const Sizes = meta.story({
  render: () => (
    <div className="flex flex-col gap-2">
      <Text size="xs">Extra Small Text (xs)</Text>
      <Text size="sm">Small Text (sm)</Text>
      <Text size="base">Base Text (base)</Text>
      <Text size="lg">Large Text (lg)</Text>
      <Text size="xl">Extra Large Text (xl)</Text>
    </div>
  ),
});

export const Variants = meta.story({
  render: () => (
    <div className="flex flex-col gap-2">
      <Text variant="default">Default text</Text>
      <Text variant="muted">Muted text</Text>
      <Text variant="primary">Primary text</Text>
      <Text variant="destructive">Destructive text</Text>
      <Text variant="disabled">Disabled text</Text>
    </div>
  ),
});

export const Weights = meta.story({
  render: () => (
    <div className="flex flex-col gap-2">
      <Text weight="normal">Normal weight</Text>
      <Text weight="medium">Medium weight</Text>
      <Text weight="semibold">Semibold weight</Text>
      <Text weight="bold">Bold weight</Text>
    </div>
  ),
});

export const WithDifferentElements = meta.story({
  render: () => (
    <div className="flex flex-col gap-2">
      <Text render={() => <p>Paragraph element</p>} />
      <Text render={() => <div>Div element</div>} />
    </div>
  ),
});
