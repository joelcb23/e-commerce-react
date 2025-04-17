import { useEffect } from "react";
import { useOrder } from "../context/OrderContext";
import { Link } from "react-router-dom";
import Page from "../components/Page";

const OrdersPage = () => {
  const { orders, getOrders } = useOrder();

  useEffect(() => {
    getOrders();
  }, []);

  const renderOrders = () => {
    if (!orders || orders.length == 0)
      return (
        <h1 className="text-center font-semibold text-xl ">No orders yet!</h1>
      );
    return orders.map(({ id, status, total, orderItems }) => (
      <li key={id} className=" bg-white border p-3 rounded">
        <Link
          to={`/profile/orders/${id}`}
          className="w-full flex justify-between items-center"
        >
          <img src="https://via.placeholder.com/100" alt="image" />
          <h1>
            {`${orderItems.reduce(
              (acc, item) => acc + item.quantity,
              0
            )} products in order.`}
          </h1>
          <div>
            <p>Status: {status}</p>
            <p>Total: ${Math.round(total * 100) / 100}</p>
          </div>
        </Link>
      </li>
    ));
  };

  return (
    <Page>
      <h1 className="text-3xl font-bold text-center mb-4">Orders Page</h1>
      <ul className="flex flex-col gap-2">{renderOrders()}</ul>
    </Page>
  );
};

export default OrdersPage;
