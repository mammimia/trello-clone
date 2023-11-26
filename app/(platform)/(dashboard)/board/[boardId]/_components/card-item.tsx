import { Card } from '@prisma/client';
import React from 'react';

interface CardItemProps {
  card: Card;
  index: number;
}

export const CardItem = ({ card, index }: CardItemProps) => {
  return (
    <div
      role="button"
      className="truncate rounded-md border-2 border-transparent
     bg-white px-3 py-2 text-sm shadow-sm hover:border-black/50"
    >
      {card.title}
    </div>
  );
};
