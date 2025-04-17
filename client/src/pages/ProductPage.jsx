import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import Page from "../components/Page";

const ProductPage = () => {
  const { product, getProduct } = useProduct();
  const { addToCart } = useCart();
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    getProduct(productId);
  }, [productId]);

  const onSubmit = () => {
    const item = { productId, quantity };
    addToCart(item);

    navigate("/cart");
  };

  return (
    <Page
      className={`
        flex flex-col gap-5
        md:flex-row md:items-start
    `}
    >
      <img
        src={product.img}
        alt={`${product.name}-image`}
        className="w-full md:w-2/3"
      />
      <div className="w-full md:w-1/3 flex flex-col justify-between gap-5">
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <p className="text-xl">${product.price}</p>
        <p className="text-xl text-neutral-600">On Stock: {product.stock}</p>

        <form onSubmit={onSubmit} className="flex flex-col gap-2 w-full">
          <input
            type="number"
            name="stock"
            max={product.stock}
            min={1}
            onChange={(e) => setQuantity(Number(e.target.value))}
            value={quantity}
            className="input number-input"
          />
          <button
            type="submit"
            className="bg-sky-500 hover:bg-sky-700 px-8 py-4 rounded-lg text-white"
          >
            Add to cart
          </button>
        </form>
        <p className="text-neutral-600 my-5">{product.description}</p>
      </div>
    </Page>
  );
};

export default ProductPage;
