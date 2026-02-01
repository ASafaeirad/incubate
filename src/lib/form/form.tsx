import { createFormHook } from '@tanstack/react-form';

import { fieldContext, formContext } from './FormContext.ts';
import { SubmitButton } from './SubmitButton.tsx';
import TextField from './TextField.tsx';

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    TextField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});
