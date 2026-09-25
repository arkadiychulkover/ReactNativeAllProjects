import { create } from "zustand";
import { Product } from "../types/product";

export type ProductStore = {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (id: number) => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  removeProduct: (id) => set((state) => ({ products: state.products.filter((product) => product.id !== id) })),
}));

export { Product };
