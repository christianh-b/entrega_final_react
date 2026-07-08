import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { ...product, quantity }]
    })
  }

  const increaseQty = (id) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id && item.quantity < item.stock
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    )
  }

  const decreaseQty = (id) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    )
  }

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const clearCart = () => setCart([])

  const getTotalItems = () =>
    cart.reduce((total, item) => total + item.quantity, 0)

  const getTotalPrice = () =>
    cart.reduce((total, item) => total + item.precio * item.quantity, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, increaseQty, decreaseQty, removeItem, clearCart, getTotalItems, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  )
}
