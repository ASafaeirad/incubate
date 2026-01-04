import { createFileRoute } from '@tanstack/react-router';

import { Button } from '../ui/Button/Button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/Card/Card';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card className="relative w-full max-w-sm overflow-hidden pt-0">
        <div className="absolute inset-0 z-30 aspect-video bg-primary opacity-50 mix-blend-color" />
        <img
          src="https://images.unsplash.com/photo-1604076850742-4c7221f3101b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Mymind on Unsplash"
          className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale"
        />
        <CardHeader>
          <CardTitle>Observability Plus is replacing Monitoring</CardTitle>
          <CardDescription>
            Switch to the improved way to explore your data, with natural
            language. Monitoring will no longer be available on the Pro plan in
            November, 2025
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <div className="ml-auto">Warning</div>
        </CardFooter>
      </Card>
    </div>
  );
}
