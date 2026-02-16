import preview from '#storybook/preview';

import { ProgressBar } from './ProgressBar';

const meta = preview.meta({
  component: ProgressBar,
  render: args => (
    <div style={{ width: 300 }}>
      <ProgressBar {...args} />
    </div>
  ),
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
});

export const Default = meta.story({
  args: {
    value: 450,
    min: 400,
    max: 500,
    label: 'Label',
  },
});

export const Zero = meta.story({
  args: {
    value: 0,
    label: 'None',
  },
});

export const Full = meta.story({
  args: {
    value: 100,
    label: 'Done',
  },
});
