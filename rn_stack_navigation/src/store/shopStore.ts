import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  images: string[];
  rating: number;
  reviewCount?: number;
  description: string;
  sizes: string[];
  colors: string[];
  defaultSize: string;
}

export interface ShippingAddress {
  name: string;
  address: string;
}

export interface PaymentMethod {
  brand: string;
  cardNumber: string;
}

export interface ShopStoreState {
  products: Product[];
  bag: Record<string, number>;
  bagItemOptions: Record<string, { size: string; color?: string }>;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  addToBag: (productId: string, size?: string, color?: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  removeFromBag: (productId: string) => void;
  clearBag: () => void;
  updateShippingAddress: (name: string, address: string) => void;
  updatePaymentMethod: (brand: string, cardNumber: string) => void;
  getProductById: (id: string) => Product | undefined;
}

const INITIAL_PRODUCTS: Product[] = [
  { id: 'prod_sneakers', name: 'MINIMALIST SNEAKERS', price: 160.0, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80', images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80'], rating: 4.8, reviewCount: 124, description: 'High-quality visual, neat, consectetur adipiscing elit. Disporcossius shsounion, and manations, insiittationt, and more.', sizes: ['7', '8', '9', '10', '11'], colors: ['#D2D6DC', '#FFFFFF', '#9CA3AF', '#374151'], defaultSize: '8' },
  { id: 'prod_denim_jacket', name: 'Classic Denim Jacket', price: 110.0, image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&auto=format&fit=crop&q=80', images: ['https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=600&auto=format&fit=crop&q=80'], rating: 4.9, reviewCount: 89, description: 'Timeless vintage-washed denim jacket crafted with durable cotton twill. Button front with twin flap chest pockets.', sizes: ['S', 'M', 'L', 'XL'], colors: ['#6B8EAD', '#34495E', '#1C2833'], defaultSize: 'M' },
  { id: 'prod_linen_dress_1', name: 'Linen Sundress', price: 128.0, image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&auto=format&fit=crop&q=80', images: ['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&auto=format&fit=crop&q=80'], rating: 4.7, reviewCount: 65, description: 'Airy and breathable 100% organic linen sundress designed with a self-tie waist belt and flowy midi-length silhouette.', sizes: ['XS', 'S', 'M', 'L'], colors: ['#CBD5E1', '#E2E8F0', '#F8FAFC'], defaultSize: 'S' },
  { id: 'prod_linen_dress_2', name: 'Silk Slip Dress', price: 125.0, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80', images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80'], rating: 4.6, reviewCount: 42, description: 'Refined minimal slip dress in champagne crepe de chine. Delicate spaghetti straps and subtle slit for graceful movement.', sizes: ['XS', 'S', 'M', 'L'], colors: ['#F5EBE1', '#E7D8C9', '#3D3A37'], defaultSize: 'M' },
  { id: 'prod_eashimn_jacket', name: 'Eashimn Linen Overshirt', price: 130.0, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80', images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80'], rating: 4.8, reviewCount: 51, description: 'Versatile utility overshirt cut from medium-weight garment-dyed textured linen. Features dual workwear pockets.', sizes: ['S', 'M', 'L', 'XL'], colors: ['#A0AEC0', '#718096', '#2D3748'], defaultSize: 'L' },
  { id: 'prod_crewneck_sweater', name: 'Merino Wool Crewneck', price: 145.0, image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=80', images: ['https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=80'], rating: 4.9, reviewCount: 78, description: 'Ultra-fine merino knit sweater with ribbed cuffs and hem. Lightweight warmth with a silky soft handfeel.', sizes: ['S', 'M', 'L', 'XL'], colors: ['#1E293B', '#334155', '#475569'], defaultSize: 'M' },
  { id: 'prod_striped_shirt', name: 'Camp Collar Striped Shirt', price: 95.0, image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&auto=format&fit=crop&q=80', images: ['https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&auto=format&fit=crop&q=80'], rating: 4.7, reviewCount: 39, description: 'Relaxed retro camp collar vacation shirt with yarn-dyed vertical stripes and breathable cotton-rayon blend.', sizes: ['S', 'M', 'L', 'XL'], colors: ['#64748B', '#475569', '#1E293B'], defaultSize: 'M' },
];

export const useShopStore = create<ShopStoreState>((set, get) => ({
  products: INITIAL_PRODUCTS,
  bag: { prod_sneakers: 1, prod_denim_jacket: 1 },
  bagItemOptions: { prod_sneakers: { size: '9', color: '#FFFFFF' }, prod_denim_jacket: { size: 'M', color: '#6B8EAD' } },
  shippingAddress: { name: 'Eliza Reed', address: '45 Bright St, NYC' },
  paymentMethod: { brand: 'Visa', cardNumber: 'Visa **** 7890' },

  addToBag: (productId: string, size?: string, color?: string) => {
    set((state) => {
      const currentQty = state.bag[productId] || 0;
      const product = state.products.find((p) => p.id === productId);
      const chosenSize = size || state.bagItemOptions[productId]?.size || product?.defaultSize || 'M';
      const chosenColor = color || state.bagItemOptions[productId]?.color || product?.colors[0] || '';

      return {
        bag: { ...state.bag, [productId]: currentQty + 1 },
        bagItemOptions: { ...state.bagItemOptions, [productId]: { size: chosenSize, color: chosenColor } },
      };
    });
  },

  updateQuantity: (productId: string, delta: number) => {
    set((state) => {
      const currentQty = state.bag[productId] || 0;
      const newQty = currentQty + delta;
      const newBag = { ...state.bag };

      if (newQty <= 0) {
        delete newBag[productId];
      } else {
        newBag[productId] = newQty;
      }

      return { bag: newBag };
    });
  },

  removeFromBag: (productId: string) => {
    set((state) => {
      const newBag = { ...state.bag };
      delete newBag[productId];
      return { bag: newBag };
    });
  },

  clearBag: () => {
    set({ bag: {} });
  },

  updateShippingAddress: (name: string, address: string) => {
    set({ shippingAddress: { name, address } });
  },

  updatePaymentMethod: (brand: string, cardNumber: string) => {
    set({ paymentMethod: { brand, cardNumber } });
  },

  getProductById: (id: string) => {
    return get().products.find((p) => p.id === id);
  },
}));
