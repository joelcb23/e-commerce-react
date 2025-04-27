import { createContext, useContext, useState } from "react";
import {
  createProductRequest,
  deleteProductRequest,
  getCategoriesRequest,
  getProductRequest,
  getProductsByCategoryRequest,
  getProductsByNameRequest,
  getProductsRequest,
  updateProductRequest,
} from "../api/products.api";
export const ProductContext = createContext();

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error(
      "useProduct must be used within an ProductProvider" +
        "Make sure to wrap your app with ProductProvider"
    );
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState(null);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");

  const loadProductsByCategory = async (categoryId) => {
    try {
      const res = await getProductsByCategoryRequest(categoryId);
      setProducts(res.data.products);
    } catch (error) {
      console.error(error);
    }
  };
  const getProducts = async () => {
    try {
      const res = await getProductsRequest();
      setProducts(res.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  const getProduct = async (id) => {
    try {
      const res = await getProductRequest(id);
      setProduct(res.data.product);
    } catch (error) {
      console.error(error);
    }
  };

  const searchProduct = async (search) => {
    try {
      const res = await getProductsByNameRequest(search);
      setProducts(res.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  const createProduct = async (data) => {
    try {
      const res = await createProductRequest(data);
      setProducts([...products, res.data.product]);
    } catch (error) {
      console.error(error);
    }
  };
  const updateProduct = async (data) => {
    try {
      const res = await updateProductRequest(data);
      setProducts([...products, res.data.product]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await deleteProductRequest(id);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const loadCategories = async () => {
    try {
      const res = await getCategoriesRequest();
      // console.log(res);
      setCategories(res.data.categories);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        search,
        setSearch,
        products,
        setProducts,
        product,
        getProducts,
        getProduct,
        searchProduct,
        createProduct,
        updateProduct,
        deleteProduct,
        categories,
        loadCategories,
        categorySelected,
        setCategorySelected,
        loadProductsByCategory,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
