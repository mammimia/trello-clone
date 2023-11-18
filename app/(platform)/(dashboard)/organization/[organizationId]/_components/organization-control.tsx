'use client';
import { useOrganizationList } from '@clerk/nextjs';
import { NextPage } from 'next';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

interface Props {}

const OrganizationControl: NextPage<Props> = ({}) => {
  const params = useParams();
  const { setActive } = useOrganizationList();

  useEffect(() => {
    if (!setActive) return;

    setActive({
      organization: params.organizationId as string
    });
  }, [setActive, params.organizationId]);

  return <div></div>;
};

export default OrganizationControl;
