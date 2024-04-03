import { create } from "zustand";

export interface NotVErifiedModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useNotVerifiedModalStore = create<NotVErifiedModalState>(
  (set) => ({
    isOpen: false,
    openModal: () => set(() => ({ isOpen: true })),
    closeModal: () =>
      set(() => ({
        isOpen: false,
      })),
  })
);
