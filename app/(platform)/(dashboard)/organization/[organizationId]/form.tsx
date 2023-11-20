'use client';

import { NextPage } from 'next';
import { FormButton } from './form-button';
import { FormInput } from './form-input';
import { createBoard } from '@/actions/create-board';
import { useAction } from '@/hooks/use-action';

interface Props {}

const Form: NextPage<Props> = ({}) => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data, 'success');
    },
    onError: (error) => {
      console.log(error, 'error');
    }
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;

    execute({ title });
  };

  return (
    <form action={onSubmit}>
      <div className="flex flex-col space-y-2">
        <FormInput errors={fieldErrors} />
      </div>
      <FormButton />
    </form>
  );
};

export default Form;
