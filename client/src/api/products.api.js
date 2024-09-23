import axios from "./axios";

export const getProductsRequest = async () => await axios.get("/products");

export const getProductRequest = async (id) =>
  await axios.get(`/products/${id}`);

export const createProductRequest = async (data) =>
  await axios.post("/products", data);

export const updateProductRequest = async (id, data) =>
  await axios.put(`/products/${id}`, data);

export const deleteProductRequest = async (id) =>
  await axios.delete(`/products/${id}`);
