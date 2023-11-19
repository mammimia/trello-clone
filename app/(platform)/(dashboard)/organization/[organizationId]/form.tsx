'use client';

import { createBoard } from '@/actions/create-board';
import { NextPage } from 'next';
import { useFormState } from 'react-dom';
import { FormButton } from './form-button';
import { FormInput } from './form-input';

interface Props {}

const Form: NextPage<Props> = ({}) => {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createBoard, initialState);

  return (
    <form action={dispatch}>
      <div className="flex flex-col space-y-2">
        <FormInput errors={state?.errors} />
      </div>
      <FormButton />
    </form>
  );
};

export default Form;
