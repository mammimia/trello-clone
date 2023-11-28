'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { CardWithList } from '@/types';
import { Copy, Trash } from 'lucide-react';
import React from 'react';

interface ActionsProps {
  card: CardWithList;
}

export const Actions = ({ card }: ActionsProps) => {
  return (
    <div className="mt-2 space-y-2">
      <p className="text-xs font-semibold">Actions</p>
      <Button variant="action" size="inline" className="w-full justify-start">
        <Copy className="mr-2 h-4 w-4" />
        Copy
      </Button>
      <Button variant="action" size="inline" className="w-full justify-start">
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
