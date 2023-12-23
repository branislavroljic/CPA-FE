import { FilterProduct } from "@api/product/product";
import { create } from "zustand";

export interface ProductFilterState {
  filter: FilterProduct;
  updateFilterCountryCode: (countryCode?: string) => void;
  updateFilterProductType: (productType?: string) => void;
  updateFilterCategories: (category?: string[]) => void;
  resetFilter: () => void;
  // resetSearch: () => void;
}

export const useProductFilterStore = create<ProductFilterState>((set) => ({
  filter: { country_code: "", type: "", category: "" },
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
        category: undefined,
      },
    })),
  // resetSearch: () =>
  //   set((state) => ({
  //     filter: { ...state.filter, companyName: undefined },
  //   })),
}));
