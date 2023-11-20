'use client';

import { NextPage } from 'next';
import { FormButton } from './form-button';
import { createBoard } from '@/actions/create-board';
import { useAction } from '@/hooks/use-action';
import { FormInput } from '@/components/form/form-input';

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
        <FormInput id="title" label="Board Title" errors={fieldErrors} />
      </div>
      <FormButton />
    </form>
  );
};

export default Form;
