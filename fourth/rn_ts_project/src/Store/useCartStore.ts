import { create } from "zustand";
import { CartItem } from "../types/cart";

type CartStore = {
  items: CartItem[];
  promoCode: string;
  isPromoApplied: boolean;
  promoDiscount: number;
  promoMessage: string;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeItem: (id: string) => void;
  toggleFavorite: (id: string) => void;
  applyPromo: (code: string) => void;
  clearPromo: () => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  items: [
    { id: "1", title: "Банани", price: 59, unit: "₴/кг", quantity: 1, image: require("../../assets/favorites/banana.png"), isFavorite: false },
    { id: "2", title: "Помідори", price: 89, unit: "₴/кг", quantity: 2, image: require("../../assets/favorites/tomatoes.png"), isFavorite: false },
    { id: "3", title: "Яблука", price: 59, unit: "₴/кг", quantity: 1, image: require("../../assets/favorites/apples.png"), isFavorite: true },
  ],
  promoCode: "",
  isPromoApplied: false,
  promoDiscount: 0,
  promoMessage: "",
  increaseQuantity: (id: string) => set((state) => ({ items: state.items.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)) })),
  decreaseQuantity: (id: string) => set((state) => ({ items: state.items.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item)) })),
  removeItem: (id: string) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  toggleFavorite: (id: string) => set((state) => ({ items: state.items.map((item) => (item.id === id ? { ...item, isFavorite: !item.isFavorite } : item)) })),
  applyPromo: (code: string) => set(() => (code.trim().length > 0 ? { isPromoApplied: true, promoCode: code, promoDiscount: 20, promoMessage: "Прийнято промокод" } : { isPromoApplied: false, promoMessage: "Введіть промокод" })),
  clearPromo: () => set({ promoCode: "", isPromoApplied: false, promoDiscount: 0, promoMessage: "" }),
  clearCart: () => set({ items: [] }),
}));
