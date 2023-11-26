import { Card } from '@prisma/client';
import React from 'react';

interface CardItemProps {
  card: Card;
  index: number;
}

export const CardItem = ({ card, index }: CardItemProps) => {
  return <div>CardItem</div>;
};
