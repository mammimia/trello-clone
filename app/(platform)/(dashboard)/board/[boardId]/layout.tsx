import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextPage } from 'next';
import { notFound, redirect } from 'next/navigation';

interface Props {
  children: React.ReactNode;
  params: {
    boardId: string;
  };
}

const BoardIdLayout: NextPage<Props> = async ({ children, params }) => {
  const { orgId } = auth();

  if (!orgId) return redirect('/select-organization');

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId
    }
  });

  if (!board) notFound();

  return (
    <div
      className="relative h-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <main className="relative h-full pt-28">{children}</main>
    </div>
  );
};

export default BoardIdLayout;
