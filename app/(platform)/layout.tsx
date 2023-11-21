import { ClerkProvider } from '@clerk/nextjs';
import { NextPage } from 'next';
import { Toaster } from 'sonner';

interface Props {
  children: React.ReactNode;
}

const PlatformLayout: NextPage<Props> = ({ children }) => {
  return (
    <ClerkProvider>
      <Toaster />
      {children}
    </ClerkProvider>
  );
};

export default PlatformLayout;
