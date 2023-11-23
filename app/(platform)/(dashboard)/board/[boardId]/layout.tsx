import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextPage } from 'next';
import { notFound, redirect } from 'next/navigation';
import { BoardNavbar } from './_components/board-navbar';

export async function generateMetadata({
  params
}: {
  params: { boardId: string };
}) {
  const { orgId } = auth();

  if (!orgId) return { title: 'Board' };

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId
    }
  });

  return {
    title: board?.title || 'Board'
  };
}

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
      <BoardNavbar board={board} />
      <div className="absolute inset-0 bg-black/10" />
      <main className="relative h-full pt-28">{children}</main>
    </div>
  );
};

export default BoardIdLayout;
