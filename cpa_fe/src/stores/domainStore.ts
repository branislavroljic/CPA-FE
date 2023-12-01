import { InputDomain } from "@api/domain/domain";
import { AxiosResponse } from "axios";
import { create } from "zustand";

export interface DomainModalState {
  item?: InputDomain;
  isOpen: boolean;
  shouldClose: boolean;
  submitAction?: (item: InputDomain) => Promise<AxiosResponse<any, any>>;
  openModal: (
    item: InputDomain,
    submitAction: (item: InputDomain) => Promise<AxiosResponse<any, any>>,
    shouldClose: boolean
  ) => void;
  closeModal: () => void;
}

export const useDomainModalStore = create<DomainModalState>((set) => ({
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
