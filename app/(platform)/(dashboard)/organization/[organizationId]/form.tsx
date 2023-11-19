'use client';

import { createBoard } from '@/actions/create-board';
import { Button } from '@/components/ui/button';
import { NextPage } from 'next';
import { useFormState } from 'react-dom';

interface Props {}

const Form: NextPage<Props> = ({}) => {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createBoard, initialState);

  return (
    <form action={dispatch}>
      <div className="flex flex-col space-y-2">
        <input
          id="title"
          name="title"
          required
          placeholder="Enter a board title"
          className="border border-black p-1"
        />
        {state?.errors?.title && (
          <div>
            {state.errors.title.map((error: string) => (
              <p key={error} className="text-rose-500">
                {error}
              </p>
            ))}
          </div>
        )}
      </div>
      <Button type="submit">Create</Button>
    </form>
  );
};

export default Form;
