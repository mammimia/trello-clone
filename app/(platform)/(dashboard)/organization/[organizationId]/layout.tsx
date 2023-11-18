import { NextPage } from 'next';
import OrganizationControl from './_components/organization-control';

interface Props {
  children: React.ReactNode;
}

const OrganizationIdLayout: NextPage<Props> = ({ children }) => {
  return (
    <>
      <OrganizationControl />
      {children}
    </>
  );
};

export default OrganizationIdLayout;
