import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useProduct } from "../context/ProductContext";
import { useCart } from "../context/CartContext";

const ProductPage = () => {
  const { product, getProduct } = useProduct();
  const { addToCart } = useCart();
  const { register, handleSubmit } = useForm();
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    getProduct(productId);
  }, [productId]);

  const onSubmit = handleSubmit((data) => {
    const item = { productId, quantity };
    addToCart(item);

    navigate("/cart");
  });

  return (
    <div className="dark:bg-gray-900 bg-gray-100 flex flex-col md:flex-row gap-5 w-full md:w-3/4 m-auto p-5 md:p-10 rounded-lg shadow-2xl">
      <img
        src={product.img}
        alt={`${product.name}-image`}
        className="w-full md:w-2/3"
      />
      <div className="w-full md:w-1/3 flex flex-col justify-between">
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, vitae,
          aliquid perspiciatis quidem natus maiores obcaecati, similique
          recusandae quae quasi totam error voluptates inventore qui!
        </p>
        <p className="text-xl">${product.price}</p>
        <p className="text-xl">On Stock: {product.stock}</p>

        <form onSubmit={onSubmit} className="flex flex-col gap-2 w-full">
          <input
            type="number"
            name="stock"
            max={product.stock}
            min={1}
            {...register("quantity")}
            onChange={(e) => setQuantity(Number(e.target.value))}
            value={quantity}
            className="input number-input"
          />
          <button
            type="submit"
            className="bg-sky-500 hover:bg-sky-700 px-3 py-1 rounded text-white"
          >
            Add to cart
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductPage;
