import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../context/ProductContext";

import ProductCard from "../components/ProductCard";

const ProductsPage = () => {
  const { products, getProducts, getProduct } = useProduct();
  const navigate = useNavigate();
  useEffect(() => {
    getProducts();
  }, []);

  const handleProduct = (id) => {
    getProduct(id);
    navigate(`/products/${id}`);
  };
  return (
    <div className="">
      <h1 className="text-3xl font-bold text-center mb-4">List of Products</h1>
      <div className="flex flex-wrap gap-4 justify-center items-center">
        {products.map(({ id, name, price, img }) => (
          <ProductCard
            key={id}
            id={id}
            name={name}
            price={price}
            img={img}
            handleId={handleProduct}
          />
        ))}
      </div>
    </div>
  );
};
export default ProductsPage;
