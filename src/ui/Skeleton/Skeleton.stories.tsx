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
    <Card className="w-96 max-w-xs">
      <CardHeader>
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="aspect-video w-full" />
      </CardContent>
    </Card>
  ),
});
