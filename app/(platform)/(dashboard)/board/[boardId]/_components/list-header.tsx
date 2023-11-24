'use client';
import { List } from '@prisma/client';

interface ListHeaderProps {
  list: List;
}

export const ListHeader = ({ list }: ListHeaderProps) => {
  return (
    <div
      className="flex items-start justify-between
     gap-x-2 px-2 pt-2 text-sm font-semibold"
    >
      <div
        className="h-7 w-full border-transparent px-2.5 
      py-1 text-sm font-medium"
      >
        {list.title}
      </div>
    </div>
  );
};
