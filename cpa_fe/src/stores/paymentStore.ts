import { InputPayment } from "@api/payment/payment";
import { AxiosResponse } from "axios";
import { create } from "zustand";

export interface PaymentModalState {
  item?: InputPayment;
  isOpen: boolean;
  shouldClose: boolean;
  submitAction?: (item: InputPayment) => Promise<AxiosResponse<any, any>>;
  openModal: (
    item: InputPayment,
    submitAction: (item: InputPayment) => Promise<AxiosResponse<any, any>>,
    shouldClose: boolean
  ) => void;
  closeModal: () => void;
}

export const usePaymentModalStore = create<PaymentModalState>((set) => ({
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
