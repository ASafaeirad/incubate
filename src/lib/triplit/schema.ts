import { Schema as S } from '@triplit/client';

export const schema = S.Collections({
  routines: {
    schema: S.Schema({
      id: S.Id(),
      title: S.String(),
      description: S.String(),
    }),
  },
});
