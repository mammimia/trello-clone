import { NextPage } from 'next';
import { Info } from './_components/info';

interface Props {}

const OrganizationIdPage: NextPage<Props> = async ({}) => {
  return (
    <div className="mb-20 w-full">
      <Info />
    </div>
  );
};

export default OrganizationIdPage;
