import { useEffect } from "react";
import { useProduct } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

import { FaShippingFast } from "react-icons/fa";
import { BsClock } from "react-icons/bs";
import { CiDiscount1 } from "react-icons/ci";
import { BiLike, BiSearch } from "react-icons/bi";
import FeatureItem from "../components/FeatureItem";
import ProductList from "../components/ProductList";

import woman from "../assets/woman.webp";
import appleWatch from "../assets/applewatch.webp";

const HomePage = () => {
  const {
    products,
    getProducts,
    getProduct,
    search,
    setSearch,
    searchProduct,
  } = useProduct();
  useEffect(() => {
    getProducts();
  }, []);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${search}`);
    if (search === "") {
      navigate("/products");
    }
    window.scrollTo(0, 0);
    searchProduct(search);
  };

  const handleProduct = (id) => {
    getProduct(id);
    navigate(`/products/${id}`);
  };

  return (
    <>
      {/* Header */}
      <Header />
      <div className="w-full my-20 md:mt-[560px] lg:mt-[720px]">
        {/* Features */}
        <div className="my-20 flex flex-col items-center lg:flex-row">
          <FeatureItem
            icon={<FaShippingFast className="text-4xl text-teal-300" />}
            firstText="Fast, Free Shipping"
            secondText="On order over $50"
          />
          <FeatureItem
            className="lg:border-l border-teal-400"
            icon={<BsClock className="text-4xl text-teal-300" />}
            firstText="Next Day Delivery"
            secondText="Free - spend over $99"
          />
          <FeatureItem
            className="lg:border-l border-teal-400"
            icon={<CiDiscount1 className="text-4xl text-teal-300" />}
            firstText="Low Price Guarantee"
            secondText="We offer competitive prices"
          />
          <FeatureItem
            className="lg:border-l border-teal-400"
            icon={<BiLike className="text-4xl text-teal-300" />}
            firstText="Quality Guarantee"
            secondText="We Guarantee Our Products"
          />
        </div>
        {/* Top Offers */}
        <ProductList title="Top Offers">
          {products
            ?.filter((product) => product.discount === 25)
            .slice(0, 5)
            .map(({ id, name, price, img, discount }) => (
              <ProductCard
                key={id}
                name={name}
                price={price}
                img={img}
                discount={discount}
                id={id}
                handleId={handleProduct}
                className={"w-full h-[350px] md:w-1/2 lg:w-1/5 md:h-[350px]"}
              />
            ))}
        </ProductList>
        {/* Banner New Arrivals */}
        <div className="bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 my-20 w-full h-[600px] rounded-md overflow-hidden relative activate">
          <img
            src={woman}
            alt="model-vika-glitter"
            className="w-full h-full object-cover md:absolute md:w-1/3 md:right-0"
          />
          <img
            src={appleWatch}
            alt="apple-watch"
            className="hidden md:block object-cover md:absolute md:w-1/3 md:left-0 md:top-1/4 md:-rotate-12"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
            <h3 className="w-full text-4xl font-bold text-center mb-5">
              New Arrivals
            </h3>
            <p className="w-full text-2xl text-center">
              The new collection is here.
            </p>
          </div>
        </div>
        {/* New Arrivals */}
        <ProductList title={"The Newest Products"}>
          {products
            ?.filter((product) => product.name >= "A" && product.name <= "Z")
            .slice(0, 10)
            .map(({ id, name, price, img, discount }) => (
              <ProductCard
                key={id}
                name={name}
                price={price}
                img={img}
                id={id}
                discount={discount}
                handleId={handleProduct}
                className={"w-full h-[350px] md:w-1/2 lg:w-1/5"}
              />
            ))}
        </ProductList>
      </div>
      {/* Second Search */}
      <div className="w-full mt-20 bg-teal-500 py-20 flex flex-col items-center">
        <h2 className="text-3xl font-semibold text-white text-center mb-10">
          Looking for something specific?
        </h2>
        <div className="bg-white p-5 flex items-center gap-5 rounded-lg md:w-2/3">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 border rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleSearch}>
            <BiSearch size={24} className="text-black" />
          </button>
        </div>
      </div>
    </>
  );
};
export default HomePage;
