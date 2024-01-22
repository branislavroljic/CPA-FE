import { Postback } from "@api/user/user";
import { AxiosResponse } from "axios";
import { create } from "zustand";

export interface PostbackModalStore {
  item?: Postback;
  isOpen: boolean;
  shouldClose: boolean;
  submitAction?: (item: Postback) => Promise<AxiosResponse<any, any>>;
  openModal: (
    item: Postback,
    submitAction: (item: Postback) => Promise<AxiosResponse<any, any>>,
    shouldClose: boolean
  ) => void;
  closeModal: () => void;
}

export const usePostbackModalStore = create<PostbackModalStore>((set) => ({
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
