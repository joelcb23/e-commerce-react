import axios from "./axios";

export const createOrderRequest = async (data) =>
  await axios.post("/orders", data);
