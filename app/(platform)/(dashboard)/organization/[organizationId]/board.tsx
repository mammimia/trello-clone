import { deleteBoard } from '@/actions/delete-board';
import { FormSubmit } from '@/components/form/form-submit';

interface Props {
  id: string;
  title: string;
}

const Board = ({ id, title }: Props) => {
  const deleteBoardWithId = deleteBoard.bind(null, id);
  return (
    <form action={deleteBoardWithId} className="flex items-center gap-x-2">
      <p>Board name: {title}</p>
      <FormSubmit variant="destructive">Delete</FormSubmit>
    </form>
  );
};

export default Board;
