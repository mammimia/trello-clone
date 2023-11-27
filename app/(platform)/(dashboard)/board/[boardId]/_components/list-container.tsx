'use client';

import { ListWithCards } from '@/types';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useEffect, useState } from 'react';
import { ListForm } from './list-form';
import { ListItem } from './list-item';
import { useAction } from '@/hooks/use-action';
import { updateListOrder } from '@/actions/update-list-order';
import { toast } from 'sonner';
import { List } from '@prisma/client';

interface ListContainerProps {
  boardId: string;
  lists: ListWithCards[];
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export const ListContainer = ({ boardId, lists }: ListContainerProps) => {
  const [orderedLists, setOrderedLists] = useState(lists);
  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onSuccess: () => {
      toast.success('List order updated successfully');
    },
    onError: (error) => {
      toast.error(error);
    }
  });

  const onDragEnd = (result: any) => {
    const { source, destination, type } = result;

    if (!destination) return;

    // if dropped in the same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === 'list') {
      handleListMove(
        orderedLists,
        source,
        destination,
        boardId,
        setOrderedLists,
        executeUpdateListOrder
      );
    }

    if (type == 'card') {
      return handleCardMove(orderedLists, source, destination, setOrderedLists);
    }
  };

  useEffect(() => {
    setOrderedLists(lists);
  }, [lists]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex h-full gap-x-3"
          >
            {orderedLists.map((list, index) => (
              <ListItem key={list.id} index={index} list={list} />
            ))}
            {provided.placeholder}
            <ListForm />
            <div className="w-1 flex-shrink-0"></div>
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};

function handleListMove(
  orderedLists: ListWithCards[],
  source: any,
  destination: any,
  boardId: string,
  setOrderedLists: (lists: ListWithCards[]) => void,
  executeUpdateListOrder: (data: { boardId: string; items: List[] }) => void
) {
  const newLists = reorder(orderedLists, source.index, destination.index).map(
    (item, index) => ({ ...item, order: index })
  );
  setOrderedLists(newLists);
  executeUpdateListOrder({
    items: newLists,
    boardId
  });
}

function handleCardMove(
  orderedLists: ListWithCards[],
  source: any,
  destination: any,
  setOrderedLists: (lists: ListWithCards[]) => void
) {
  const newOrderedList = [...orderedLists];

  const sourceList = newOrderedList.find(
    (list) => list.id === source.droppableId
  );
  const destinationList = newOrderedList.find(
    (list) => list.id === destination.droppableId
  );

  if (!sourceList || !destinationList) return;

  if (!sourceList.cards) {
    sourceList.cards = [];
  }

  if (!destinationList.cards) {
    destinationList.cards = [];
  }

  if (source.droppableId === destination.droppableId) {
    handleMoveCardInSameList(sourceList, source, destination);
  } else {
    handleMoveCardInDifferentList(
      sourceList,
      source,
      destinationList,
      destination
    );
  }

  setOrderedLists(newOrderedList);
}
function handleMoveCardInDifferentList(
  sourceList: ListWithCards,
  source: any,
  destinationList: ListWithCards,
  destination: any
) {
  const [movedCard] = sourceList.cards.splice(source.index, 1);
  destinationList.cards.splice(destination.index, 0, movedCard);

  sourceList.cards.forEach((card, index) => {
    card.order = index;
  });

  destinationList.cards.forEach((card, index) => {
    card.order = index;
  });

  // Update the card's listId
  movedCard.listId = destination.droppableId;
}

function handleMoveCardInSameList(
  sourceList: ListWithCards,
  source: any,
  destination: any
) {
  const reorderedCards = reorder(
    sourceList.cards,
    source.index,
    destination.index
  );
  reorderedCards.forEach((card, index) => {
    card.order = index;
  });

  sourceList.cards = reorderedCards;
}
