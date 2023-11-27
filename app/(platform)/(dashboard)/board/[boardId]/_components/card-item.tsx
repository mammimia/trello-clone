import { useCardModal } from '@/hooks/use-card-modal';
import { Draggable } from '@hello-pangea/dnd';
import { Card } from '@prisma/client';
import React from 'react';

interface CardItemProps {
  card: Card;
  index: number;
}

export const CardItem = ({ card, index }: CardItemProps) => {
  const cardModal = useCardModal();

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          className="truncate rounded-md border-2 border-transparent
           bg-white px-3 py-2 text-sm shadow-sm hover:border-black/50"
          onClick={() => cardModal.onOpen?.(card.id)}
        >
          {card.title}
        </div>
      )}
    </Draggable>
  );
};
