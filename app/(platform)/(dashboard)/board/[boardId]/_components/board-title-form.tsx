'use client';

import { updateBoard } from '@/actions/update-board';
import { FormInput } from '@/components/form/form-input';
import { Button } from '@/components/ui/button';
import { useAction } from '@/hooks/use-action';
import { Board } from '@prisma/client';
import { ElementRef, useRef, useState } from 'react';
import { toast } from 'sonner';

interface BoardTitleFormProps {
  board: Board;
}

export const BoardTitleForm = ({ board }: BoardTitleFormProps) => {
  const { execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Board "${data.title}" updated`);
      setTitle(data.title);
      disableEditing();
    },
    onError: () => {
      toast.error(`Failed to update board "${board.title}"`);
    }
  });

  const formRef = useRef<ElementRef<'form'>>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);
  const [title, setTitle] = useState<string>(board.title);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => setIsEditing(false);

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    execute({ id: board.id, title });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (isEditing) {
    return (
      <form
        ref={formRef}
        action={onSubmit}
        className="flex items-center gap-x-2"
      >
        <FormInput
          ref={inputRef}
          id="title"
          className="h-7 border-none bg-transparent px-[7px]
           py-1 text-lg font-bold focus-visible:outline-none 
           focus-visible:ring-transparent"
          defaultValue={title}
          onBlur={onBlur}
        />
      </form>
    );
  }

  return (
    <Button
      onClick={enableEditing}
      variant="transparent"
      className="h-auto w-auto p-1 px-2 text-lg font-bold"
    >
      {title}
    </Button>
  );
};
