import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import Page from "../components/Page";
import Sidebar from "../components/Sidebar";

const ProductsPage = () => {
  const {
    products,
    getProducts,
    getProduct,
    search,
    categorySelected,
    loadProductsByCategory,
  } = useProduct();
  const navigate = useNavigate();
  // const params = useParams();

  const handleProduct = (id) => {
    getProduct(id);
    navigate(`/products/${id}`);
  };
  const renderProducts = () => {
    if (!products || products.length == 0)
      return <h1 className="my-10 text-center text-2xl">No Products Found</h1>;
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
  useEffect(() => {
    const loadProducts = async () => {
      if (categorySelected !== null) {
        await loadProductsByCategory(categorySelected);
      } else {
        await getProducts();
      }
    };
    loadProducts();
  }, [categorySelected]);
  return (
    <>
      <Sidebar />
      <Page className="my-28 md:my-52 md:flex md:items-start md:gap-5">
        <div className="w-full">
          <h1 className="text-3xl font-bold text-center mb-10">
            List of Products
          </h1>
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
        </div>
      </Page>
    </>
  );
};
export default ProductsPage;
