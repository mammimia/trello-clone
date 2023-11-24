'use client';

import { ListWithCards } from '@/types';
import { ListForm } from './list-form';

interface ListContainerProps {
  boardId: string;
  lists: ListWithCards[];
}

export const ListContainer = ({ boardId, lists }: ListContainerProps) => {
  return (
    <ol>
      <ListForm />
      <div className="w-1 flex-shrink-0"></div>
    </ol>
  );
};
