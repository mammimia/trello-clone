import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs';
import { Plus } from 'lucide-react';
import { NextPage } from 'next';
import MobileSidebar from './mobile-sidebar';
import { FormPopover } from '@/components/form/form-popover';

interface Props {}

const Navbar: NextPage<Props> = ({}) => {
  return (
    <nav
      className="fixed top-0 z-50 flex h-14 w-full
     items-center border-b bg-white px-4 shadow-sm"
    >
      <MobileSidebar />
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>
        <FormPopover align="start" side="bottom" sideOffset={16}>
          <Button
            size="sm"
            variant="primary"
            className="hidden h-auto rounded-sm px-2 py-1.5 md:block"
          >
            Create
          </Button>
        </FormPopover>
        <FormPopover sideOffset={8}>
          <Button
            size="sm"
            variant="primary"
            className="block rounded-sm md:hidden"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </FormPopover>
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl="/organization/id"
          afterSelectOrganizationUrl="/organization/:id"
          afterLeaveOrganizationUrl="/select-organization"
          appearance={{
            elements: {
              rootBox: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }
            }
          }}
        />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                height: 32,
                width: 32
              }
            }
          }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
