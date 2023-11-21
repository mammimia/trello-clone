'use client';

import { X } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger
} from '../ui/popover';
import { FormInput } from './form-input';
import { FormSubmit } from './form-submit';
import { useAction } from '@/hooks/use-action';
import { createBoard } from '@/actions/create-board';
import { toast } from 'sonner';
import { FormPicker } from './form-picker';

interface FormPopoverProps {
  children: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
}

export const FormPopover = ({
  children,
  side = 'bottom',
  align,
  sideOffset = 0
}: FormPopoverProps) => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      toast.success('Board created successfully');
    },
    onError: (error) => {
      toast.error(error);
    }
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    execute({ title });
  };

  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent
        side={side}
        align={align}
        sideOffset={sideOffset}
        className="w-80 pt-3 "
      >
        <div
          className="pb-4 text-center text-sm
         font-medium text-neutral-600"
        >
          Create Board
        </div>
        <PopoverClose asChild>
          <Button
            className="absolute right-2 top-2 h-auto
           w-auto p-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormPicker id="image" errors={fieldErrors} />
            <FormInput
              id="title"
              label="Board Title"
              type="text"
              errors={fieldErrors}
            />
          </div>
          <FormSubmit className="w-full">Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
