'use client';

import { FormSubmit } from '@/components/form/form-submit';
import { FormTextArea } from '@/components/form/form-textarea';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import React, { forwardRef } from 'react';

interface CardFormProps {
  listId: string;
  isEditing: boolean;
  enableEditing: () => void;
  disableEditing: () => void;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listId, isEditing, enableEditing, disableEditing }, ref) => {
    if (isEditing) {
      return (
        <form className="m-1 space-y-4 px-1 py-0.5">
          <FormTextArea
            ref={ref}
            id="title"
            onKeyDown={() => {}}
            placeholder={'Enter a title for this card'}
          />
          <input hidden id="listId" name="listId" value={listId} />
          <div className="flex items-center gap-x-1">
            <FormSubmit>Add card</FormSubmit>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      );
    }

    return (
      <div className="px-2 pt-2">
        <Button
          onClick={enableEditing}
          className="h-auto w-full justify-start px-2 py-1.5 text-sm
           text-muted-foreground"
          size="sm"
          variant="ghost"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add a card
        </Button>
      </div>
    );
  }
);

CardForm.displayName = 'CardForm';
