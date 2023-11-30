import { NextPage } from 'next';
import { Info } from './_components/info';
import { Separator } from '@/components/ui/separator';
import { BoardList } from './_components/board-list';
import { Suspense } from 'react';
import { checkSubscription } from '@/lib/subscription';

interface Props {}

const OrganizationIdPage: NextPage<Props> = async ({}) => {
  const isPro = await checkSubscription();

  return (
    <div className="mb-20 w-full">
      <Info isPro={isPro} />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <Suspense fallback={<BoardList.Skeleton />}>
          <BoardList />
        </Suspense>
      </div>
    </div>
  );
};

export default OrganizationIdPage;
