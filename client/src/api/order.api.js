import axios from "./axios";

export const getOrdersRequest = async () => await axios.get("/orders");

export const getOrderByIdRequest = async (id) =>
  await axios.get(`/orders/${id}`);

export const createOrderRequest = async (data) =>
  await axios.post("/orders", data);
