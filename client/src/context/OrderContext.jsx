import { createContext, useContext, useState } from "react";
import { createOrderRequest } from "../api/order.api";

export const OrderContext = createContext();

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error(
      "useOrder must be used within an OrderProvider" +
        "Make sure to wrap your app with OrderProvider"
    );
  }

  return context;
};

const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const createOrder = async (order) => {
    try {
      await createOrderRequest(order);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <OrderContext.Provider value={{ orders, setOrders, createOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
