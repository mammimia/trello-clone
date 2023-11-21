'use client';

import { useOrganization } from '@clerk/nextjs';
import { CreditCard } from 'lucide-react';
import Image from 'next/image';

export const Info = () => {
  const { organization, isLoaded } = useOrganization();

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="flex items-center gap-x-4">
      <div className="relative h-[60px] w-[60px]">
        <Image
          fill
          src={organization?.imageUrl!}
          alt="Organization"
          className="rounded-md object-cover"
        />
      </div>
      <div className="space-y-1">
        <p className="text-xl font-semibold">{organization?.name}</p>
        <div className="item-center flex text-xs text-muted-foreground">
          <CreditCard className="mr-1 h-3 w-3" />
          Free
        </div>
      </div>
    </div>
  );
};
