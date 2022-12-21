import { createContext, ReactNode, useContext, useState } from "react"
import { ShoppingCart } from "../components/ShoppingCart"
import { useLocalStorage } from "../hooks/useLocalStorage"

type CartProviderProps = {
  children: ReactNode
}

interface CartItem {
  uuid: string
  quantity: number
  price?: string
}

type CartContext = {
  openCart: () => void
  closeCart: () => void
  getItemQuantity: (uuid: string) => number
  increaseCartQuantity: (uuid: string) => void
  decreaseCartQuantity: (uuid: string) => void
  removeFromCart: (uuid: string) => void
  cartQuantity: number
  cartItems: CartItem[]
}

const CartContext = createContext({} as CartContext)

export function useShoppingCart() {
  return useContext(CartContext)
}
export function CartProvider({ children }: CartProviderProps) {
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
        "shopping-cart",
        []
      )
    const [isOpen, setIsOpen] = useState(false)
  

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  function getItemQuantity(uuid: string) {
    return cartItems.find(item => item.uuid === uuid)?.quantity || 0
  }

  function increaseCartQuantity(uuid: string) {
    setCartItems(currItems => {
      if (currItems.find(item => item.uuid === uuid) == null) {
        return [...currItems, { uuid, quantity: 1 }]
      } else {
        return currItems.map(item => {
          if (item.uuid === uuid) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  function decreaseCartQuantity(uuid: string) {
    setCartItems(currItems => {
      if (currItems.find(item => item.uuid === uuid)?.quantity === 1) {
        return currItems.filter(item => item.uuid !== uuid)
      } else {
        return currItems.map(item => {
          if (item.uuid === uuid) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }
  
  function removeFromCart(uuid: string) {
    setCartItems(currItems => {
      return currItems.filter(item => item.uuid !== uuid)
    })
  }

  return (
    <CartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </CartContext.Provider>
  )
}
