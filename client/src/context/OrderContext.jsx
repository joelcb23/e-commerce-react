import { createContext, useContext, useState } from "react";
import {
  createOrderRequest,
  getOrderByIdRequest,
  getOrdersRequest,
} from "../api/order.api";

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
  const [order, setOrder] = useState([]);

  const getOrders = async () => {
    try {
      const res = await getOrdersRequest();
      setOrders(res.data.orders);
    } catch (error) {
      console.error(error);
    }
  };

  const getOrderById = async (id) => {
    try {
      const res = await getOrderByIdRequest(id);
      // console.log(res.data.order);
      setOrder(res.data.order);
    } catch (error) {
      console.error(error);
    }
  };
  const createOrder = async (order) => {
    try {
      await createOrderRequest(order);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <OrderContext.Provider
      value={{ orders, order, setOrders, getOrders, getOrderById, createOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
