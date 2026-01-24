import { TriplitClient as BaseTriplitClient } from '@triplit/client';

import { schema } from './schema';

export const client = new BaseTriplitClient({
  schema,
  storage: 'indexeddb',
  serverUrl: import.meta.env.VITE_TRIPLIT_SERVER,
  token: import.meta.env.VITE_TRIPLIT_API_KEY,
});

export type TriplitClient = typeof client;
