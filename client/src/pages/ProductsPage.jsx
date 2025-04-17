import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import Page from "../components/Page";

const ProductsPage = () => {
  const { products, getProducts, getProduct, search } = useProduct();
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    getProducts();
  }, []);

  const handleProduct = (id) => {
    getProduct(id);
    navigate(`/products/${id}`);
  };
  const renderProducts = () => {
    if (!products || products.length == 0)
      return <h1 className="my-10 text-2xl">No Products Found</h1>;
    return products.map(({ id, name, price, description, img }) => (
      <ProductCard
        key={id}
        id={id}
        name={name}
        price={price}
        description={description}
        img={img}
        handleId={handleProduct}
      />
    ));
  };
  return (
    <Page>
      <h1 className="text-3xl font-bold text-center mb-10">List of Products</h1>
      <div
        className={`flex flex-col gap-4 ${
          !search &&
          `grid grid-cols-1 gap-5 justify-stretch
        md:grid-cols-2 
        lg:grid-cols-4`
        } 
        
        `}
      >
        {renderProducts()}
      </div>
    </Page>
  );
};
export default ProductsPage;
