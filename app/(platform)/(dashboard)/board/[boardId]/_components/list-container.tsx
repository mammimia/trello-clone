'use client';

import { ListWithCards } from '@/types';

interface ListContainerProps {
  boardId: string;
  lists: ListWithCards[];
}

export const ListContainer = ({ boardId, lists }: ListContainerProps) => {
  return <div>List Container</div>;
};
