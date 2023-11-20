import { create } from 'zustand';

type MobileSidebarState = {
  isOpen: boolean;
  toggle: () => void;
};

export const useMobileSidebar = create<MobileSidebarState>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen }))
}));
