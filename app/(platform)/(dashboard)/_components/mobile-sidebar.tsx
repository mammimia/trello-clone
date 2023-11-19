'use client';

import { useMobileSidebar } from '@/app/hooks/use-mobile-sidebar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { NextPage } from 'next';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Sidebar from './sidebar';

interface Props {}

const MobileSidebar: NextPage<Props> = ({}) => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const toggle = useMobileSidebar((state) => state.toggle);
  const isOpen = useMobileSidebar((state) => state.isOpen);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      toggle();
    }
  }, [pathname]);

  if (!isMounted) return null;

  return (
    <>
      <Button
        onClick={toggle}
        className="mr-2 block md:hidden"
        variant="ghost"
        size="sm"
      >
        <Menu className="h-4 w-4" />
      </Button>
      <Sheet open={isOpen} onOpenChange={toggle}>
        <SheetContent side="left" className="p-2 pt-10">
          <Sidebar storageKey="t-sidebar-mobile-state" />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileSidebar;
