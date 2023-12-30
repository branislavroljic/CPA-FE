/* eslint-disable @typescript-eslint/no-explicit-any */
import { Category } from "@api/category/category";
import { AxiosResponse } from "axios";
import { create } from "zustand";

export interface CategoryModalState {
  item?: Category;
  isOpen: boolean;
  shouldClose: boolean;
  submitAction?: (item: Category) => Promise<AxiosResponse<any, any>>;
  openModal: (
    item: Category,
    submitAction: (item: Category) => Promise<AxiosResponse<any, any>>,
    shouldClose: boolean
  ) => void;
  closeModal: () => void;
}

export const useCategoryModalStore = create<CategoryModalState>((set) => ({
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
