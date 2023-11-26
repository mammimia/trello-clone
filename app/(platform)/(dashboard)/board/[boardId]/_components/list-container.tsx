'use client';

import { ListWithCards } from '@/types';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useEffect, useState } from 'react';
import { ListForm } from './list-form';
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
    <DragDropContext onDragEnd={() => {}}>
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
