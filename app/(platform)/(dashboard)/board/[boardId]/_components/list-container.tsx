'use client';

import { ListWithCards } from '@/types';
import { ListForm } from './list-form';
import { useEffect, useState } from 'react';
import { ListItem } from './list-item';

interface ListContainerProps {
  boardId: string;
  lists: ListWithCards[];
}

export const ListContainer = ({ boardId, lists }: ListContainerProps) => {
  const [orderedLists, setOrderedLists] = useState(lists);

  useEffect(() => {
    setOrderedLists(lists);
  }, [lists]);

  return (
    <ol className="flex h-full gap-x-3">
      {orderedLists.map((list, index) => (
        <ListItem key={list.id} index={index} list={list} />
      ))}
      <ListForm />
      <div className="w-1 flex-shrink-0"></div>
    </ol>
  );
};
