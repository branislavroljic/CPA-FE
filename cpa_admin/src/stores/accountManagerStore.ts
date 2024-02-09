import { User } from "@api/user/user";
import { AxiosResponse } from "axios";
import { create } from "zustand";

export interface AccountManagerModalState {
  item?: User;
  isOpen: boolean;
  shouldClose: boolean;
  submitAction?: (
    id: number,
    accountManagerId: number
  ) => Promise<AxiosResponse<any, any>>;
  openModal: (
    item: User,
    submitAction: (
      id: number,
      accountManagerId: number
    ) => Promise<AxiosResponse<any, any>>,
    shouldClose: boolean
  ) => void;
  closeModal: () => void;
}

export const useAccountManagerModalStore = create<AccountManagerModalState>(
  (set) => ({
    item: undefined,
    isOpen: false,
    shouldClose: false,
    submitAction: undefined,
    openModal: (item, submitAction, shouldClose) =>
      set(() => ({ item, isOpen: true, submitAction, shouldClose })),
    closeModal: () =>
      set(() => ({
        item: undefined,
        isOpen: false,
        submitAction: undefined,
        shouldClose: false,
      })),
  })
);
