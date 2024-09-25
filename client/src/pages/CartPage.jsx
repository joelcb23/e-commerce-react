import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import ItemCart from "../components/ItemCart";

const CartPage = () => {
  const { itemsCart, getCart, emptyCart } = useCart();
  let total = 0;

  const renderCart = () => {
    if (!itemsCart || itemsCart.length < 0) return <h1>Cart is empty</h1>;
    itemsCart.map(({ product, quantity }) => {
      let totalForProduct = product.price * quantity;
      total += totalForProduct;
    });
    return itemsCart.map(({ id, product, quantity }) => (
      <ItemCart key={id} product={product} quantity={quantity} itemId={id} />
    ));
  };
  useEffect(() => {
    getCart();
  }, []);
  return (
    <div className="w-full md:w-2/3 mx-auto p-5 dark:bg-gray-900 bg-gray-100 rounded-lg shadow-2xl">
      <h1 className="text-3xl font-bold text-center mb-4">Your Cart</h1>
      <div className="flex flex-col gap-5">{renderCart()}</div>
      <div className="flex justify-between items-center my-4">
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          onClick={emptyCart}
        >
          Empty Cart
        </button>
        <h1 className="text-xl md:text-3xl font-semibold">
          Total: $ {Math.round(total * 100) / 100}
        </h1>
      </div>
    </div>
  );
};

export default CartPage;
