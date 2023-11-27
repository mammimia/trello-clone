import { ModalProvider } from '@/components/providers/modal-provider';
import { QueryProvider } from '@/components/providers/query-provider';
import { ClerkProvider } from '@clerk/nextjs';
import { NextPage } from 'next';
import { Toaster } from 'sonner';

interface Props {
  children: React.ReactNode;
}

const PlatformLayout: NextPage<Props> = ({ children }) => {
  return (
    <ClerkProvider>
      <QueryProvider>
        <Toaster />
        <ModalProvider />
        {children}
      </QueryProvider>
    </ClerkProvider>
  );
};

export default PlatformLayout;
