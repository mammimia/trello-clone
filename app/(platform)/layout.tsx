import { ClerkProvider } from '@clerk/nextjs';
import { NextPage } from 'next';

interface Props {
  children: React.ReactNode;
}

const Layout: NextPage<Props> = ({ children }) => {
  return <ClerkProvider>{children}</ClerkProvider>;
};

export default Layout;
