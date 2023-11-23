'use client';

import { deleteBoard } from '@/actions/delete-board';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { useAction } from '@/hooks/use-action';
import { MoreHorizontal, X } from 'lucide-react';
import { toast } from 'sonner';

interface BoardOptionsProps {
  id: string;
}

export const BoardOptions = ({ id }: BoardOptionsProps) => {
  const { execute } = useAction(deleteBoard, {
    onError: (error) => {
      toast.error(error);
    }
  });

  const onDelete = () => {
    execute({ id });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="transparent">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 py-3" side="bottom" align="start">
        <div className="pb-4 text-center text-sm font-medium text-neutral-600">
          Board actions
        </div>
        <PopoverClose asChild>
          <Button
            className="absolute right-2 top-2 h-auto w-auto p-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
          variant="ghost"
          onClick={onDelete}
        >
          Delete this board
        </Button>
      </PopoverContent>
    </Popover>
  );
};
