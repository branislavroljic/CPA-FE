import { FilterProduct, InputProduct, Product } from "@api/product/product";
import { InputFormData } from "@api/utils";
import { AxiosResponse } from "axios";
import { create } from "zustand";

export interface ProductFilterState {
  filter: FilterProduct;
  updateFilterCountryCode: (countryCode?: string) => void;
  updateFilterProductType: (productType?: string) => void;
  updateFilterCategories: (Product?: string[]) => void;
  resetFilter: () => void;
}

export const useProductFilterStore = create<ProductFilterState>((set) => ({
  filter: { country_code: "", type: "", Product: "" },
  updateFilterCountryCode: (countryCode) =>
    set((state) => ({
      filter: { ...state.filter, country_code: countryCode },
    })),
  updateFilterProductType: (productType) =>
    set((state) => ({
      filter: { ...state.filter, type: productType },
    })),
  updateFilterCategories: (categories) =>
    set((state) => ({
      filter: { ...state.filter, categories: categories },
    })),
  resetFilter: () =>
    set((state) => ({
      filter: {
        ...state.filter,
        country_code: undefined,
        type: undefined,
        Product: undefined,
      },
    })),
}));

export interface ProductModalState {
  item?: Product;
  isOpen: boolean;
  shouldClose: boolean;
  submitAction?: (
    item: InputFormData<InputProduct>
  ) => Promise<AxiosResponse<any, any>>;
  openModal: (
    item: Product,
    submitAction: (
      item: InputFormData<InputProduct>
    ) => Promise<AxiosResponse<any, any>>,
    shouldClose: boolean
  ) => void;
  closeModal: () => void;
}

export const useProductModalStore = create<ProductModalState>((set) => ({
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
