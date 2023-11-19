import { createBoard } from '@/actions/create-board';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';
import { NextPage } from 'next';
import Board from './board';

interface Props {}

const OrganizationIdPage: NextPage<Props> = async ({}) => {
  const boards = await db.board.findMany();

  return (
    <div className="flex flex-col space-y-4">
      <form action={createBoard}>
        <input
          id="title"
          name="title"
          required
          placeholder="Enter a board title"
          className="border border-black p-1"
        />
        <Button type="submit">Create</Button>
      </form>
      <div className="space-y-2">
        {boards.map((board) => (
          <Board key={board.id} id={board.id} title={board.title} />
        ))}
      </div>
    </div>
  );
};

export default OrganizationIdPage;
