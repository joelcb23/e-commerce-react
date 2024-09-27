import { useEffect } from "react";
import { useOrder } from "../context/OrderContext";
import { Link } from "react-router-dom";

const OrdersPage = () => {
  const { orders, getOrders } = useOrder();

  useEffect(() => {
    getOrders();
  }, []);

  const renderOrders = () => {
    if (!orders || orders.length == 0) return <h1>No orders</h1>;
    return orders.map(({ id, status, total, orderItems }) => (
      <li key={id} className="dark:bg-slate-800 bg-gray-100 p-3 rounded">
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
    <div
      className={`
    dark:bg-gray-900 bg-gray-100 w-full rounded-lg shadow-2xl
    md:w-2/3 mx-auto p-5 

    `}
      // flex flex-col justify-center items-center
    >
      <h1 className="text-3xl font-bold text-center mb-4">Orders Page</h1>
      <ul className="flex flex-col gap-2">{renderOrders()}</ul>
    </div>
  );
};

export default OrdersPage;
