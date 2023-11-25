'use client';

import { FormSubmit } from '@/components/form/form-submit';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { List } from '@prisma/client';
import { MoreHorizontal, X } from 'lucide-react';

interface ListOptionsProps {
  list: List;
  onAddCard: () => void;
}

const ListOptions = ({ list, onAddCard }: ListOptionsProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button className="h-auto w-auto p-2" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pb-3 pt-3" side="bottom" align="start">
        <div className="pb-4 text-center text-sm font-medium text-neutral-600">
          List actions
        </div>
        <PopoverClose>
          <Button
            className="absolute right-2 top-2 h-auto w-auto p-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm
           font-normal"
          onClick={onAddCard}
          variant="ghost"
        >
          Add card
        </Button>
        <form>
          <input hidden id="id" name="id" value={list.id} />
          <input hidden id="boardId" name="boardId" value={list.boardId} />
          <FormSubmit
            className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm
             font-normal"
            variant="ghost"
          >
            Copy list
          </FormSubmit>
        </form>
        <Separator />
        <form>
          <input hidden id="id" name="id" value={list.id} />
          <input hidden id="boardId" name="boardId" value={list.boardId} />
          <FormSubmit
            className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm
             font-normal"
            variant="ghost"
          >
            Delete this list
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default ListOptions;
