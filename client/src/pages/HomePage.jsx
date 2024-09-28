import { useEffect } from "react";
import { useProduct } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { products, getProducts, getProduct } = useProduct();
  useEffect(() => {
    getProducts();
  }, []);
  const navigate = useNavigate();

  const handleProduct = (id) => {
    getProduct(id);
    navigate(`/products/${id}`);
  };

  return (
    <div
      className={`
    w-full mt-20 
    md:w-2/3 md:mx-auto md:mt-40`}
    >
      <h1 className="text-3xl font-bold text-center mb-4">
        Products less than $1000
      </h1>
      <div
        className={`
        grid grid-cols-1 gap-4 justify-center items-center
        md:grid-cols-2 
        lg:grid-cols-4`}
      >
        {products
          .filter((product) => product.price < 1000)
          .map(({ id, name, price, img }) => (
            <ProductCard
              key={id}
              name={name}
              price={price}
              img={img}
              id={id}
              handleId={handleProduct}
            />
          ))}
      </div>
    </div>
  );
};
export default HomePage;
