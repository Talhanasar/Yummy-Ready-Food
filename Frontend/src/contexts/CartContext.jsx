import { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";


export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage if available, otherwise an empty array
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [confirmOrderInfo, setConfirmOrderInfo] = useState({});

  const addToCart = (product, quantity) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item._id === product._id);
      if (existingProduct) {
        return prevCart.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productID) => {
    setCart(prevCart => prevCart.filter(item => item._id !== productID));
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateQuantity = (productID, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productID);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item._id === productID ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  // Sync the cart with localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
        confirmOrderInfo,
        setConfirmOrderInfo
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext)
}