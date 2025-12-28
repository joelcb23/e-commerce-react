import axios from "./axios";

export const getCartRequest = async () => await axios.get("/cart");

export const addItemToCartRequest = async (data) =>
  await axios.post("/cart", data);

export const removeItemFromCartRequest = async (itemId) =>
  await axios.delete(`/cart/cartItem/${itemId}`);

export const emptyCartRequest = async () =>
  await axios.delete("/cart/cartItem");
