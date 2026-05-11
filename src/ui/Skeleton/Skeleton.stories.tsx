import preview from '#storybook/preview';
import { Card, CardContent, CardHeader } from '#ui/Card/Card';

import { Skeleton } from './Skeleton';

const meta = preview.meta({
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
});

export const Default = meta.story({
  render: () => (
    <Card className="inline-96 max-inline-xs">
      <CardHeader>
        <Skeleton className="block-4 inline-2/3" />
        <Skeleton className="block-4 inline-1/2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="aspect-video inline-full" />
      </CardContent>
    </Card>
  ),
});
