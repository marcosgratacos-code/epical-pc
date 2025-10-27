import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number; // en centavos
  quantity: number;
  image?: string;
}

interface CartState {
  items: CartItem[];
  isHydrated: boolean;
  
  // Computed
  count: number;
  subtotal: number; // en centavos
  
  // Actions
  add: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  remove: (id: string) => void;
  update: (id: string, quantity: number) => void;
  clear: () => void;
  
  // Hydration
  setHydrated: () => void;
}

// Función para calcular el subtotal
const calculateSubtotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

// Función para calcular el total de items
const calculateCount = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.quantity, 0);
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isHydrated: false,
      
      count: 0,
      subtotal: 0,
      
      add: (item) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(i => i.id === item.id);
        
        let newItems: CartItem[];
        
        if (existingItem) {
          // Si ya existe, incrementar cantidad
          newItems = currentItems.map(i =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + (item.quantity || 1) }
              : i
          );
        } else {
          // Si no existe, agregar al carrito
          newItems = [...currentItems, { ...item, quantity: item.quantity || 1 }];
        }
        
        // Recalcular derivados
        const count = calculateCount(newItems);
        const subtotal = calculateSubtotal(newItems);
        
        set({ items: newItems, count, subtotal });
      },
      
      remove: (id) => {
        const newItems = get().items.filter(i => i.id !== id);
        const count = calculateCount(newItems);
        const subtotal = calculateSubtotal(newItems);
        
        set({ items: newItems, count, subtotal });
      },
      
      update: (id, quantity) => {
        if (quantity <= 0) {
          get().remove(id);
          return;
        }
        
        const newItems = get().items.map(i =>
          i.id === id ? { ...i, quantity } : i
        );
        
        const count = calculateCount(newItems);
        const subtotal = calculateSubtotal(newItems);
        
        set({ items: newItems, count, subtotal });
      },
      
      clear: () => {
        set({ items: [], count: 0, subtotal: 0 });
      },
      
      setHydrated: () => {
        const items = get().items;
        const count = calculateCount(items);
        const subtotal = calculateSubtotal(items);
        set({ isHydrated: true, count, subtotal });
      },
    }),
    {
      name: 'titanpc_cart_v1',
      // Solo persistir los items, no el estado de hidratación
      partialize: (state) => ({ items: state.items }),
      // Al rehidratar, recalcular derivados
      onRehydrateStorage: () => (state) => {
        if (state) {
          const count = calculateCount(state.items);
          const subtotal = calculateSubtotal(state.items);
          state.count = count;
          state.subtotal = subtotal;
          state.setHydrated();
        }
      },
    }
  )
);

