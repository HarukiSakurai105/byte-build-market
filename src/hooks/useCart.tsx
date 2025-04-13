
import { create } from 'zustand';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedOptions?: Record<string, string>;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: number, selectedOptions?: Record<string, string>) => void;
  updateQuantity: (id: number, quantity: number, selectedOptions?: Record<string, string>) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

// Helper function to create a unique key for item with options
const getItemKey = (id: number, options?: Record<string, string>) => {
  if (!options) return id.toString();
  return `${id}-${Object.entries(options).sort().map(([k, v]) => `${k}:${v}`).join('-')}`;
};

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  
  addItem: (item) => set((state) => {
    const itemKey = getItemKey(item.id, item.selectedOptions);
    
    // Find existing item with the same options
    const existingItemIndex = state.items.findIndex((i) => 
      getItemKey(i.id, i.selectedOptions) === itemKey
    );
    
    if (existingItemIndex >= 0) {
      // Update quantity of existing item
      const updatedItems = [...state.items];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + 1
      };
      return { items: updatedItems };
    }
    
    // Add new item
    return {
      items: [...state.items, { ...item, quantity: 1 }],
    };
  }),
  
  removeItem: (id, selectedOptions) => set((state) => {
    const itemKey = getItemKey(id, selectedOptions);
    
    return {
      items: state.items.filter((item) => 
        getItemKey(item.id, item.selectedOptions) !== itemKey
      ),
    };
  }),
  
  updateQuantity: (id, quantity, selectedOptions) => set((state) => {
    const itemKey = getItemKey(id, selectedOptions);
    
    return {
      items: state.items.map((item) => 
        getItemKey(item.id, item.selectedOptions) === itemKey
          ? { ...item, quantity: Math.max(1, quantity) } 
          : item
      ),
    };
  }),
  
  clearCart: () => set({ items: [] }),
  
  totalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
  
  totalPrice: () => {
    return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
  },
}));
