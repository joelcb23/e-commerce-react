import { createContext, useContext, useState } from "react";
import {
  addItemToCartRequest,
  emptyCartRequest,
  getCartRequest,
  removeItemFromCartRequest,
} from "../api/cart.api";

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

  const addToCart = async (data) => {
    try {
      // Llamada a la API para añadir el ítem al carrito
      const res = await addItemToCartRequest(data);

      // Buscamos si el ítem ya existe en el carrito
      const existingItem = itemsCart.find(
        (item) => item.id === res.data.cartItem.id
      );

      if (existingItem) {
        // Si el ítem ya está en el carrito, actualizamos su cantidad
        setItemsCart(
          itemsCart.map((item) =>
            item.id === res.data.cartItem.id
              ? { ...item, quantity: res.data.cartItem.quantity } // Actualiza la cantidad
              : item
          )
        );
      } else {
        // Si el ítem no está en el carrito, lo añadimos
        setItemsCart([...itemsCart, res.data.cartItem]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeItem = async (id) => {
    try {
      await removeItemFromCartRequest(id);
      // console.log(itemsCart);
      setItemsCart(itemsCart.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const emptyCart = async () => {
    try {
      await emptyCartRequest();
      setItemsCart([]);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <CartContext.Provider
      value={{
        itemsCart,
        setItemsCart,
        getCart,
        addToCart,
        removeItem,
        emptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
