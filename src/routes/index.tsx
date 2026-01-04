import { IconAssembly } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';

import { Card, CardDescription, CardHeader, CardTitle } from '../ui/Card/Card';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card className="noise w-full max-w-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-1 text-muted-foreground">
            <IconAssembly className="size-4" /> Slot
          </CardTitle>
          <CardDescription className="text-disabled-foreground">
            Add new routine
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
