import { useEffect } from "react";
import { useProduct } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import Page from "../components/Page";

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
    <Page>
      <h1 className="text-3xl font-bold text-center mb-10">
        Products less than $1000
      </h1>
      <div
        className={`
        grid grid-cols-1 gap-4 justify-center items-center
        md:grid-cols-2 md:gap-6 
        lg:grid-cols-4
        `}
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
    </Page>
  );
};
export default HomePage;
