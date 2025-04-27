import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    // console.log(itemsCart.length);
    if (!itemsCart || itemsCart.length <= 0)
      return (
        <>
          <h1 className="text-center text-2xl font-semibold my-20">
            Cart is empty
          </h1>
          <Link
            to="/products"
            className={`text-sky-500 hover:text-sky-600 text-center underline`}
          >
            Add some products
          </Link>
        </>
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
  const onClose = () => {
    setOpen(false); // cierra el modal
  };

  useEffect(() => {
    // Check if there are items in the cart
    const checkCart = async () => {
      await getCart();
    };
    checkCart();
  }, []);
  return (
    <Page className="my-28 md:my-52">
      <h1 className="text-3xl font-bold text-center mb-4">Your Cart</h1>
      <div className="w-full md:w-2/3 mx-auto">
        <div className="flex flex-col gap-5 ">{renderCart()}</div>
        <div
          className={`${
            itemsCart.length <= 0 ? "hidden" : "flex"
          } justify-between items-center my-4
          `}
        >
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
          className={`
            w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded
            ${itemsCart.length <= 0 ? "hidden" : "block"}`}
        >
          Checkout
        </button>
      </div>
      <Modal open={open} onClose={onClose}>
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
