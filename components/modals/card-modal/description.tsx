'use client';

import { CardWithList } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { AlignLeft } from 'lucide-react';

interface DescriptionProps {
  card: CardWithList;
}

export const Description = ({ card }: DescriptionProps) => {
  return (
    <div className="flex w-full items-start gap-x-3">
      <AlignLeft className="mt-0.5 h-5 w-5 text-neutral-700" />
      <div className="w-full">
        <p className="mb-2 font-semibold text-neutral-700">Description</p>
        <div
          role="button"
          className="min-h-[78px] rounded-md bg-neutral-200 px-3.5 py-3 text-sm font-medium"
        >
          {card.description || 'Add a more detailed description'}
        </div>
      </div>
    </div>
  );
};

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div className="flex w-full items-start gap-x-3">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="mb-2 h-6 w-24 bg-neutral-200" />
        <Skeleton className="h-[78px] w-full bg-neutral-200" />
      </div>
    </div>
  );
};
