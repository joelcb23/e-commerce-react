import axios from "./axios";

// Products API requests
export const getProductsRequest = async () => await axios.get("/products");

export const getProductsByNameRequest = async (name) =>
  await axios.get(`/products/search?name=${name}`);

export const getProductsByCategoryRequest = async (categoryId) =>
  await axios.get(`/products/category/${categoryId}`);

export const getProductRequest = async (id) =>
  await axios.get(`/products/${id}`);

export const createProductRequest = async (data) =>
  await axios.post("/products", data);

export const updateProductRequest = async (id, data) =>
  await axios.put(`/products/${id}`, data);

export const deleteProductRequest = async (id) =>
  await axios.delete(`/products/${id}`);

// Categories API requests
export const getCategoriesRequest = async () =>
  await axios.get("/products/categories");
