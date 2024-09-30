import { CustomPayout } from "@api/custom-payout/custom-payout";
import { AxiosResponse } from "axios";
import { create } from "zustand";

export interface CustomPayoutModalState {
  item?: CustomPayout;
  isOpen: boolean;
  shouldClose: boolean;
  submitAction?: (item: CustomPayout) => Promise<AxiosResponse<any, any>>;
  openModal: (
    item: CustomPayout,
    submitAction: (item: CustomPayout) => Promise<AxiosResponse<any, any>>,
    shouldClose: boolean
  ) => void;
  closeModal: () => void;
}

export const useCustomPayoutModalStore = create<CustomPayoutModalState>(
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
