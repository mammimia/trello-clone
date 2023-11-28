'use client';

import { copyCard } from '@/actions/copy-card';
import { deleteCard } from '@/actions/delete-card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useAction } from '@/hooks/use-action';
import { useCardModal } from '@/hooks/use-card-modal';
import { CardWithList } from '@/types';
import { Copy, Trash } from 'lucide-react';
import { useParams } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

interface ActionsProps {
  card: CardWithList;
}

export const Actions = ({ card }: ActionsProps) => {
  const params = useParams();
  const cardModal = useCardModal();

  const { execute: executeCopy, loading: isLoadingCopy } = useAction(copyCard, {
    onSuccess: (data) => {
      toast.success(`Card ${data.title} successfully copied.`);
      cardModal.onClose?.();
    },
    onError: (error) => {
      toast.error(error);
    }
  });

  const { execute: executeDelete, loading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess: (data) => {
        toast.success(`Card ${data.title} successfully deleted.`);
        cardModal.onClose?.();
      },
      onError: (error) => {
        toast.error(error);
      }
    }
  );

  const onCopy = () => {
    const boardId = params.boardId as string;

    executeCopy({ boardId, id: card.id });
  };

  const onDelete = () => {
    const boardId = params.boardId as string;

    executeDelete({ boardId, id: card.id });
  };

  return (
    <div className="mt-2 space-y-2">
      <p className="text-xs font-semibold">Actions</p>
      <Button
        variant="action"
        size="inline"
        className="w-full justify-start"
        onClick={onCopy}
        disabled={isLoadingCopy || isLoadingDelete}
      >
        <Copy className="mr-2 h-4 w-4" />
        Copy
      </Button>
      <Button
        variant="action"
        size="inline"
        className="w-full justify-start"
        onClick={onDelete}
        disabled={isLoadingCopy || isLoadingDelete}
      >
        <Trash className="mr-2 h-4 w-4" />
        Delete
      </Button>
    </div>
  );
};

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="mt-2 space-y-2">
      <Skeleton className="h-4 w-20 bg-neutral-200" />
      <Skeleton className="h-4 w-full bg-neutral-200" />
      <Skeleton className="h-4 w-full bg-neutral-200" />
    </div>
  );
};
