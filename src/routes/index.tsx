import { createFileRoute } from '@tanstack/react-router';

import { Button } from '../ui/Button/Button';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Button>Hello</Button>
    </div>
  );
}
