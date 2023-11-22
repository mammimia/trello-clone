import { NextPage } from 'next';
import OrganizationControl from './_components/organization-control';
import { startCase } from 'lodash';
import { auth } from '@clerk/nextjs';

export async function generateMetadata() {
  const { orgSlug } = auth();

  return {
    title: startCase(orgSlug || 'organization')
  };
}

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
