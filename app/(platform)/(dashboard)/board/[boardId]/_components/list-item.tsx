'use client';

import { ListWithCards } from '@/types';
import { ListHeader } from './list-header';
import { ElementRef, useRef, useState } from 'react';
import { CardForm } from './card-form';
import { cn } from '@/lib/utils';
import { CardItem } from './card-item';

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
        <ol
          className={cn(
            'mx-1 flex flex-col gap-y-2 px-1 py-0.5',
            list.cards.length > 0 ? 'mt-2' : 'mt-0'
          )}
        >
          {list.cards.map((card, index) => (
            <CardItem index={index} key={card.id} card={card} />
          ))}
        </ol>
        <CardForm
          ref={textAreaRef}
          listId={list.id}
          isEditing={isEditing}
          enableEditing={enableEditing}
          disableEditing={disableEditing}
        />
      </div>
    </li>
  );
};
