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
        <h1 className="text-center text-3xl font-bold mb-4">Order {orderId}</h1>
        <h2></h2>
        <h2 className="text-xl text-center mb-4">
          {`Scheduled delivery date for: ${date.split("T")[0]}`}
          {" -- "}
          <span className="text-red-500">{order?.status}</span>
        </h2>
        <div className="flex flex-col gap-3">
          {order?.orderItems.map((item) => (
            <div key={item.id} className="flex gap-4">
              <img src={item.product.img} alt="" className="w-1/4 rounded-sm" />
              <div>
                <h3>{item.product.name}</h3>
                <h3>Quantity: {item.quantity}</h3>
              </div>
            </div>
          ))}
          <p className="text-xl text-right">
            Order total: ${Math.round(order?.total * 100) / 100}
          </p>
        </div>
      </>
    );
  };
  return (
    <div
      className={`dark:bg-gray-900 bg-gray-100
        w-full p-5 mx-auto mt-20 rounded-lg shadow-2xl
        md:w-2/3 md:p-10 md:mt-40`}
    >
      {renderOrder()}
    </div>
  );
};

export default OrderPage;
