'use client';

import { ListWithCards } from '@/types';
import { ListHeader } from './list-header';
import { ElementRef, useRef, useState } from 'react';

interface ListItemProps {
  index: number;
  list: ListWithCards;
}

export const ListItem = ({ index, list }: ListItemProps) => {
  const textAreaRef = useRef<ElementRef<'textarea'>>(null);
  const [isEditing, setIsEditing] = useState(false);

  const disableEditing = () => {
    setIsEditing(false);
  };

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textAreaRef.current?.focus();
    });
  };

  return (
    <li className="h-full w-[272px] shrink-0 select-none">
      <div className="w-full rounded-md bg-[#f1f2f4] pb-2 shadow-md">
        <ListHeader onAddCard={enableEditing} list={list} />
      </div>
    </li>
  );
};
