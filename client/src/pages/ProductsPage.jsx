import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import ProductList from "../components/ProductList";

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
  const params = useParams();

  // Pagination State
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(24);

  // Visible products index
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleProduct = (id) => {
    getProduct(id);
    navigate(`/products/${id}`);
  };

  const renderProducts = () => {
    if (!products || products.length === 0)
      return <h1 className="my-10 text-center text-2xl">No Products Found</h1>;

    return products
      .slice(startIndex, endIndex)
      .map(({ id, name, price, description, img, discount }) => (
        <ProductCard
          key={id}
          id={id}
          name={name}
          price={price}
          discount={discount}
          description={description}
          img={
            img ||
            "https://img.freepik.com/psd-gratis/pantalla-television-moderna-aislada_23-2151430372.jpg?semt=ais_hybrid&w=740&q=80"
          }
          handleId={handleProduct}
          className={"w-full h-[350px] md:w-1/3 lg:w-1/4 md:h-[350px]"}
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
      setPage(1); // reset page when category changes
    };
    loadProducts();
  }, [categorySelected]);

  return (
    <>
      <div className="w-full mt-20 flex justify-between items-center">
        <h2 className="text-3xl mx-3 font-semibold lg:mx-0">
          {search ? `Search for "${search}"` : "All Products"}
          {console.log(params)}
        </h2>
        {/* Items per page */}
        <ul className="flex items-center justify-end gap-2 text-gray-500">
          {[24, 32, 50].map((num) => (
            <li
              key={num}
              className={`font-semibold cursor-pointer p-2 hover:text-black ${
                itemsPerPage === num ? "text-black" : ""
              }`}
              onClick={() => {
                setItemsPerPage(num);
                setPage(1);
              }}
            >
              {num}
            </li>
          ))}
        </ul>
      </div>

      <ProductList>{renderProducts()}</ProductList>

      {/* Pagination */}
      <ul className="flex justify-center gap-3 my-6">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <li
            key={num}
            className={`font-semibold cursor-pointer px-3 py-1 rounded ${
              num === page
                ? "bg-black text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setPage(num)}
          >
            {num}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProductsPage;
