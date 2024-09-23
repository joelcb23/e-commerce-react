import { createContext, useContext, useState } from "react";
import { getCartRequest } from "../api/cart.api";

export const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error(
      "useCart must be used within an CartProvider" +
        "Make sure to wrap your app with CartProvider"
    );
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [itemsCart, setItemsCart] = useState([]);
  const getCart = async () => {
    try {
      const res = await getCartRequest();
      setItemsCart(res.data.cart);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CartContext.Provider value={{ itemsCart, setItemsCart, getCart }}>
      {children}
    </CartContext.Provider>
  );
};
