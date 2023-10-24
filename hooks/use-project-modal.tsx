import { create } from "zustand";
interface useProjectModalInterface {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useProjectModal = create<useProjectModalInterface>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
