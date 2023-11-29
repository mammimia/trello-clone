import { create } from 'zustand';

type ProModalState = {
  isOpen: boolean;
  onOpen?: () => void;
  onClose?: () => void;
};

export const useProModal = create<ProModalState>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));
