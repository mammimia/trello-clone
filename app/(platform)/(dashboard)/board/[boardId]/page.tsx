import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextPage } from 'next';
import { redirect } from 'next/navigation';
import { ListContainer } from './_components/list-container';

interface Props {
  params: {
    boardId: string;
  };
}

const BoardIdPage: NextPage<Props> = async ({ params }) => {
  const { orgId } = auth();

  if (!orgId) {
    redirect('/select-organization');
  }

  const lists = await db.list.findMany({
    where: {
      boardId: params.boardId
    },
    include: {
      cards: {
        orderBy: {
          order: 'asc'
        }
      }
    },
    orderBy: {
      order: 'asc'
    }
  });

  return (
    <div className="h-full overflow-x-auto p-4">
      <ListContainer boardId={params.boardId} lists={lists} />
    </div>
  );
};

export default BoardIdPage;
