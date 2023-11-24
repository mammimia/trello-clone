'use client';
import { FormInput } from '@/components/form/form-input';
import { List } from '@prisma/client';
import { ElementRef, useRef, useState } from 'react';
import { useEventListener } from 'usehooks-ts';

interface ListHeaderProps {
  list: List;
}

export const ListHeader = ({ list }: ListHeaderProps) => {
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
        <form className="flex-1 px-[2px]">
          <input hidden id="id" name="id" value={list.id} />
          <input hidden id="boardId" name="boardId" value={list.boardId} />
          <FormInput
            className="h-7 truncate border-transparent bg-transparent px-[7px] py-1
             text-sm font-medium transition hover:border-input focus:border-input focus:bg-white"
            ref={inputRef}
            onBlur={disableEditing}
            id={title}
            placeholder="Enter list title..."
            defaultValue={title}
          />
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
    </div>
  );
};
