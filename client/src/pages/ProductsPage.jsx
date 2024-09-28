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

  const renderProducts = () => {
    if (!products || products.length == 0) return <h1>No Products Found</h1>;
    return products.map(({ id, name, price, img }) => (
      <ProductCard
        key={id}
        id={id}
        name={name}
        price={price}
        img={img}
        handleId={handleProduct}
      />
    ));
  };
  return (
    <div
      className={`w-full mt-20 
      md:w-2/3 md:mx-auto md:mt-40
      `}
    >
      <h1 className="text-3xl font-bold text-center mb-4">List of Products</h1>
      <div
        className={`grid grid-cols-1 gap-4 justify-center items-center
        md:grid-cols-2 
        lg:grid-cols-4
        `}
      >
        {renderProducts()}
      </div>
    </div>
  );
};
export default ProductsPage;
