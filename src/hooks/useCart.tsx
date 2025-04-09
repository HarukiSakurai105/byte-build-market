
import { create } from 'zustand';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  
  addItem: (item) => set((state) => {
    const existingItem = state.items.find((i) => i.id === item.id);
    
    if (existingItem) {
      return {
        items: state.items.map((i) => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + 1 } 
            : i
        ),
      };
    }
    
    return {
      items: [...state.items, { ...item, quantity: 1 }],
    };
  }),
  
  removeItem: (id) => set((state) => ({
    items: state.items.filter((item) => item.id !== id),
  })),
  
  updateQuantity: (id, quantity) => set((state) => ({
    items: state.items.map((item) => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, quantity) } 
        : item
    ),
  })),
  
  clearCart: () => set({ items: [] }),
  
  totalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
  
  totalPrice: () => {
    return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
  },
}));
