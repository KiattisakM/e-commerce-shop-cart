import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { Product, Cart } from "@/lib/types"
import { CART_CONFIG } from "@/lib/constants"

interface CartStore extends Cart {
  // Actions
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  incrementItem: (productId: string) => void
  decrementItem: (productId: string) => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      subtotal: 0,
      itemCount: 0,

      addItem: (product: Product, quantity = 1) => {
        const { items } = get()
        const existingItem = items.find(
          (item) => item.product._id === product._id
        )

        if (existingItem) {
          // Update quantity if item exists
          const newQuantity = Math.min(
            existingItem.quantity + quantity,
            CART_CONFIG.maxQuantity
          )
          set((state) => ({
            items: state.items.map((item) =>
              item.product._id === product._id
                ? { ...item, quantity: newQuantity }
                : item
            ),
          }))
        } else {
          // Add new item
          set((state) => ({
            items: [
              ...state.items,
              {
                product,
                quantity: Math.min(quantity, CART_CONFIG.maxQuantity),
              },
            ],
          }))
        }

        // Recalculate totals
        calculateTotals(set, get)
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.product._id !== productId),
        }))
        calculateTotals(set, get)
      },

      updateQuantity: (productId: string, quantity: number) => {
        const clampedQuantity = Math.max(
          CART_CONFIG.minQuantity,
          Math.min(quantity, CART_CONFIG.maxQuantity)
        )

        set((state) => ({
          items: state.items.map((item) =>
            item.product._id === productId
              ? { ...item, quantity: clampedQuantity }
              : item
          ),
        }))
        calculateTotals(set, get)
      },

      incrementItem: (productId: string) => {
        const { items } = get()
        const item = items.find((i) => i.product._id === productId)
        if (item && item.quantity < CART_CONFIG.maxQuantity) {
          get().updateQuantity(productId, item.quantity + 1)
        }
      },

      decrementItem: (productId: string) => {
        const { items } = get()
        const item = items.find((i) => i.product._id === productId)
        if (item) {
          if (item.quantity > CART_CONFIG.minQuantity) {
            get().updateQuantity(productId, item.quantity - 1)
          } else {
            get().removeItem(productId)
          }
        }
      },

      clearCart: () => {
        set({
          items: [],
          total: 0,
          subtotal: 0,
          itemCount: 0,
        })
      },
    }),
    {
      name: CART_CONFIG.storageKey,
      storage: createJSONStorage(() => localStorage),
    }
  )
)

// Helper function to calculate totals
function calculateTotals(
  set: (
    partial:
      | Partial<CartStore>
      | ((state: CartStore) => Partial<CartStore>)
  ) => void,
  get: () => CartStore
) {
  const { items } = get()

  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  )

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)

  // For now, total = subtotal (no tax/shipping in cart)
  // These will be calculated at checkout
  const total = subtotal

  set({
    subtotal,
    total,
    itemCount,
  })
}
