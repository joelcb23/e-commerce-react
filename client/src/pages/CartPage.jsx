import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useCart } from "../context/CartContext";
import { useOrder } from "../context/OrderContext";
import Page from "../components/Page";
import ItemCart from "../components/ItemCart";
import Modal from "../components/Modal";

const CartPage = () => {
  const { itemsCart, setItemsCart, getCart, emptyCart } = useCart();
  const { createOrder } = useOrder();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  let total = 0;

  const renderCart = () => {
    if (!itemsCart || itemsCart.length < 0)
      return (
        <h1 className="text-center text-2xl font-semibold">Cart is empty</h1>
      );
    itemsCart.map(({ product, quantity }) => {
      let totalForProduct = product.price * quantity;
      total += totalForProduct;
    });
    return itemsCart.map(({ id, product, quantity }) => (
      <ItemCart key={id} product={product} quantity={quantity} itemId={id} />
    ));
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    const order = {
      deliveryDate: date,
    };
    createOrder(order);
    setItemsCart([]);
    setOpen(false);
  };

  useEffect(() => {
    getCart();
  }, []);
  return (
    <Page>
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
      <button
        onClick={() => setOpen(true)}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        Checkout
      </button>
      <Modal open={open}>
        <button
          onClick={() => {
            setOpen(false);
          }}
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-600"
        >
          <IoCloseSharp />
        </button>
        <h1 className="text-3xl font-bold text-center mb-4">Checkout</h1>
        <form onSubmit={handleCheckout} className="flex flex-col gap-3 w-full">
          <label htmlFor="date" className="text-xl text-left">
            DeliveryDate:{" "}
          </label>
          <input
            type="date"
            id="date"
            className="input"
            onChange={(e) => setDate(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Buy Now
          </button>
        </form>
      </Modal>
    </Page>
  );
};

export default CartPage;
