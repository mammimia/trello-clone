'use client';
import { updateList } from '@/actions/update-list';
import { FormInput } from '@/components/form/form-input';
import { useAction } from '@/hooks/use-action';
import { List } from '@prisma/client';
import { ElementRef, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useEventListener } from 'usehooks-ts';
import ListOptions from './list-options';

interface ListHeaderProps {
  list: List;
  onAddCard: () => void;
}

export const ListHeader = ({ list, onAddCard }: ListHeaderProps) => {
  const [title, setTitle] = useState(list.title);
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<'form'>>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => inputRef.current?.select());
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const { execute } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`Renamed list to ${data.title}`);
      setTitle(data.title);
      disableEditing();
    },
    onError(error) {
      toast.error(error);
    }
  });

  const handleSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    const id = formData.get('id') as string;
    const boardId = formData.get('boardId') as string;

    if (title === list.title) {
      disableEditing();
      return;
    }

    execute({ id, boardId, title });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  const onKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      formRef.current?.requestSubmit();
    }
  };

  useEventListener('keydown', onKeydown);

  return (
    <div
      className="flex items-start justify-between
     gap-x-2 px-2 pt-2 text-sm font-semibold"
    >
      {isEditing ? (
        <form ref={formRef} className="flex-1 px-[2px]" action={handleSubmit}>
          <input hidden id="id" name="id" value={list.id} />
          <input hidden id="boardId" name="boardId" value={list.boardId} />
          <FormInput
            ref={inputRef}
            className="h-7 truncate border-transparent bg-transparent px-[7px] py-1
             text-sm font-medium transition hover:border-input focus:border-input focus:bg-white"
            onBlur={onBlur}
            id="title"
            placeholder="Enter list title..."
            defaultValue={title}
          />
          <button hidden type="submit" />
        </form>
      ) : (
        <div
          className="h-7 w-full border-transparent px-2.5 
      py-1 text-sm font-medium"
          onClick={enableEditing}
        >
          {title}
        </div>
      )}
      <ListOptions list={list} onAddCard={onAddCard} />
    </div>
  );
};
