import { Board } from '@prisma/client';

interface BoardNavbarProps {
  board: Board;
}

export const BoardNavbar = async ({ board }: BoardNavbarProps) => {
  return (
    <div
      className="fixed top-14 z-[40] flex h-14 w-full
     items-center gap-x-4 bg-black/50 px-6 text-white"
    >
      {board.title}
    </div>
  );
};
