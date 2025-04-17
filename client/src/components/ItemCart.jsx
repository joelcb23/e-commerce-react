import { useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useCart } from "../context/CartContext";

const ItemCart = ({ itemId, product, quantity }) => {
  const { removeItem } = useCart();
  const handleId = () => {
    // console.log(itemId);
    removeItem(itemId);
  };

  return (
    <div className="flex gap-5 items-center shadow bg-white rounded-md p-3 relative">
      <img
        src={product.img}
        alt={`${product.name}-image`}
        className="w-1/3 md:w-1/4 h-36 object-cover rounded-sm"
      />
      <div>
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <p>Quantity: {quantity}</p>
        <p>Total: $ {Math.round(product.price * quantity * 100) / 100}</p>
      </div>
      <button
        className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-red-600"
        onClick={handleId}
      >
        <IoCloseSharp />
      </button>
    </div>
  );
};
export default ItemCart;
