import create from 'zustand';
import { persist } from 'zustand/middleware';

export const useCart = create(
    persist(
        (set, get) => ({
            cartItems: [],
            addToCart: (product) => set((state) => ({
                cartItems: [...state.cartItems, { ...product, quantity: 1 }],
            })),
            removeFromCart: (productId) => set((state) => ({
                cartItems: state.cartItems.filter(item => item.id !== productId),
            })),
            incrementQuantity: (productId) => set((state) => ({
                cartItems: state.cartItems.map(item =>
                    item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
                ),
            })),
            decrementQuantity: (productId) => set((state) => ({
                cartItems: state.cartItems.map(item =>
                    item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
                ),
            })),
            clearCart: () => set(() => ({
                cartItems: [],
            })),
            loadCart: (userEmail) => {
                const storedCarts = JSON.parse(localStorage.getItem('carts')) || {};
                const userCart = storedCarts[userEmail] || [];
                set({ cartItems: Array.isArray(userCart) ? userCart : [] });
            },
            saveCart: (userEmail) => {
                const storedCarts = JSON.parse(localStorage.getItem('carts')) || {};
                storedCarts[userEmail] = get().cartItems;
                localStorage.setItem('carts', JSON.stringify(storedCarts));
            },
            setCartItems: (items) => set({ cartItems: items }),
        }),
        { name: 'cart-storage' }
    )
);
