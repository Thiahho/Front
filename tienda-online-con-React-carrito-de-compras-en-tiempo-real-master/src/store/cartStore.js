import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product) =>
        set((state) => {
          console.log("Adding to cart:", product); // Debug log

          const existingProductIndex = state.cart.findIndex(
            (item) =>
              item.id === product.id &&
              item.selectedVariant?.storage ===
                product.selectedVariant?.storage &&
              item.selectedVariant?.ram === product.selectedVariant?.ram
          );

          if (existingProductIndex >= 0) {
            const updatedCart = [...state.cart];
            updatedCart[existingProductIndex].quantity =
              (updatedCart[existingProductIndex].quantity || 1) + 1;
            return { cart: updatedCart };
          }

          return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }),

      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        })),

      clearCart: () => set({ cart: [] }),

      getCartItems: () => get().cart,
    }),
    {
      name: "cart-storage",
    }
  )
);

export default useCartStore;
