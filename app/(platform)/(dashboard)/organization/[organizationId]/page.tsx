import { db } from '@/lib/db';
import { NextPage } from 'next';
import Board from './board';
import Form from './form';

interface Props {}

const OrganizationIdPage: NextPage<Props> = async ({}) => {
  const boards = await db.board.findMany();

  return (
    <div className="flex flex-col space-y-4">
      <Form />
      <div className="space-y-2">
        {boards.map((board) => (
          <Board key={board.id} id={board.id} title={board.title} />
        ))}
      </div>
    </div>
  );
};

export default OrganizationIdPage;
