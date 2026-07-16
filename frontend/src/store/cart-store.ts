import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, ProductVariant } from '@/services/product.service';

export interface CartItem {
    product: Product;
    variant: ProductVariant;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    isOpen: boolean;
    addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
    removeItem: (variantId: number) => void;
    updateQuantity: (variantId: number, quantity: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,
            
            addItem: (product, variant, quantity = 1) => {
                const currentItems = get().items;
                const existingItem = currentItems.find(item => item.variant.id === variant.id);

                if (existingItem) {
                    set({
                        items: currentItems.map(item => 
                            item.variant.id === variant.id 
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                        )
                    });
                } else {
                    set({ items: [...currentItems, { product, variant, quantity }] });
                }
                
                // Auto open cart when adding
                set({ isOpen: true });
            },

            removeItem: (variantId) => {
                set({ items: get().items.filter(item => item.variant.id !== variantId) });
            },

            updateQuantity: (variantId, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(variantId);
                    return;
                }
                
                set({
                    items: get().items.map(item => 
                        item.variant.id === variantId ? { ...item, quantity } : item
                    )
                });
            },

            clearCart: () => set({ items: [] }),
            
            toggleCart: () => set({ isOpen: !get().isOpen }),

            getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
            
            getTotalPrice: () => get().items.reduce((total, item) => total + (item.variant.price * item.quantity), 0),
        }),
        {
            name: 'gheverhan-cart',
            partialize: (state) => ({ items: state.items }), // Only persist items
        }
    )
);
