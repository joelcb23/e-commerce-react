import { createContext, useContext, useState } from "react";
import { getProductsRequest } from "../api/products.api";
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
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const res = await getProductsRequest();
      setProducts(res.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProductContext.Provider value={{ products, setProducts, getProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
