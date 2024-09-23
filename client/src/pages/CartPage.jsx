import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import ItemCart from "../components/ItemCart";

const CartPage = () => {
  const { itemsCart, getCart } = useCart();
  let total = 0;

  const renderCart = () => {
    if (!itemsCart || itemsCart.length < 0) return <h1>Cart is empty</h1>;
    itemsCart.forEach(({ product, quantity }) => {
      let totalForProduct = product.price * quantity;
      total += totalForProduct;
    });
    return itemsCart.map(({ id, product, quantity }) => (
      <ItemCart key={id} product={product} quantity={quantity} />
    ));
  };
  useEffect(() => {
    getCart();
  }, []);
  return (
    <div className="w-full md:w-2/3 mx-auto p-5 dark:bg-gray-900 bg-gray-100 rounded-lg shadow-2xl">
      <h1 className="text-3xl font-bold text-center mb-4">Cart</h1>
      <div className="flex flex-col gap-5">{renderCart()}</div>
      <h1 className="text-3xl font-semibold text-right my-4">
        Total: $ {total}
      </h1>
    </div>
  );
};

export default CartPage;
