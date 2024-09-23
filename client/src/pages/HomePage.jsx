import { useEffect } from "react";
import { useProduct } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { products, getProducts } = useProduct();
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="">
      <h1 className="text-3xl font-bold text-center mb-4">
        Products less than $1000
      </h1>
      <div className="flex flex-wrap gap-4 justify-center items-center">
        {products
          .filter((product) => product.price < 1000)
          .map(({ id, name, price, img }) => (
            <ProductCard key={id} name={name} price={price} img={img} />
          ))}
      </div>
    </div>
  );
};
export default HomePage;
