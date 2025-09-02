import { useParams } from "react-router-dom";
import { useOrder } from "../context/OrderContext";
import { useEffect } from "react";

const OrderPage = () => {
  const { order, getOrderById } = useOrder();
  const { orderId } = useParams();

  useEffect(() => {
    getOrderById(orderId);
  }, []);
  const date = order?.deliveryDate;
  {
    /* {JSON.stringify(order)} */
  }
  const renderOrder = () => {
    if (!order || !date) return <h1>Loading... </h1>;
    return (
      <>
        {/* Encabezado */}
        <h1 className="text-center text-3xl font-bold mb-2">Order {orderId}</h1>
        <h2 className="text-lg text-center text-gray-600 mb-4">
          Scheduled delivery date:{" "}
          <span className="font-medium">{date.split("T")[0]}</span>
          {" — "}
          <span
            className={`font-semibold ${
              order?.status === "Delivered"
                ? "text-green-500"
                : order?.status === "Pending"
                ? "text-yellow-500"
                : "text-red-500"
            }`}
          >
            {order?.status}
          </span>
        </h2>

        {/* Lista de productos */}
        <div className="flex flex-col gap-4">
          {order?.orderItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg shadow-sm"
            >
              <img
                src={item.product.img}
                alt={item.product.name}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.product.name}</h3>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <p className="text-2xl font-bold text-right mt-6">
          Order total: ${Math.round(order?.total * 100) / 100}
        </p>
      </>
    );
  };
  return <section className="my-20">{renderOrder()}</section>;
};

export default OrderPage;
