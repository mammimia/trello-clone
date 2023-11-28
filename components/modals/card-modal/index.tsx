'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useCardModal } from '@/hooks/use-card-modal';
import { fetcher } from '@/lib/fetcher';
import { CardWithList } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { Header } from './header';
import { Description } from './description';
import { Actions } from './actions';

export const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ['card', id],
    queryFn: () => fetcher(`/api/cards/${id}`)
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {!cardData ? <Header.Skeleton /> : <Header card={cardData} />}
        <div className="grid-col-1 grid md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {!cardData ? (
                <Description.Skeleton />
              ) : (
                <Description card={cardData} />
              )}
            </div>
          </div>
          {!cardData ? <Actions.Skeleton /> : <Actions card={cardData} />}
        </div>
      </DialogContent>
    </Dialog>
  );
};
