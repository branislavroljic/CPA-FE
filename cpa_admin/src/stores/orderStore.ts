/* eslint-disable @typescript-eslint/no-explicit-any */
import { UpdateOrderStatus } from "@api/order/order";
import { AxiosResponse } from "axios";
import { create } from "zustand";

export interface OrderModalState {
  item?: UpdateOrderStatus;
  isOpen: boolean;
  shouldClose: boolean;
  submitAction?: (item: UpdateOrderStatus) => Promise<AxiosResponse<any, any>>;
  openModal: (
    item: UpdateOrderStatus,
    submitAction: (item: UpdateOrderStatus) => Promise<AxiosResponse<any, any>>,
    shouldClose: boolean
  ) => void;
  closeModal: () => void;
}

export const useOrderModalStore = create<OrderModalState>((set) => ({
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
}));
