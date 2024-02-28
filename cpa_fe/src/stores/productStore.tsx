import { FilterProduct } from "@api/product/product";
import { create } from "zustand";

export interface ProductFilterState {
  filter: FilterProduct;
  updateFilterNameSearch: (nameSearch?: string) => void;
  updateFilterCountryCode: (countryCode?: string) => void;
  updateFilterProductType: (productType?: string) => void;
  updateFilterCategories: (category?: string[]) => void;
  updateFilterPaymentModel: (paymentModel?: string) => void;
  resetFilter: () => void;
  // resetSearch: () => void;
}

export const useProductFilterStore = create<ProductFilterState>((set) => ({
  filter: {
    nameSearch: "",
    country_code: "",
    type: "",
    category: [],
    paymentModel: "",
  },
  updateFilterNameSearch: (nameSearch) =>
    set((state) => ({
      filter: { ...state.filter, nameSearch: nameSearch },
    })),
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
      filter: { ...state.filter, category: categories },
    })),
  updateFilterPaymentModel: (paymentModel) =>
    set((state) => ({
      filter: { ...state.filter, paymentModel: paymentModel },
    })),
  resetFilter: () =>
    set(() => ({
      filter: {
        country_code: undefined,
        type: undefined,
        category: undefined,
        paymentModel: undefined,
        nameSearch: undefined,
      },
    })),
}));
