const OrdersPage = () => {
  return (
    <div
      className={`
    dark:bg-gray-900 bg-gray-100 w-full rounded-lg shadow-2xl
    md:w-2/3 mx-auto p-5 

    `}
      // flex flex-col justify-center items-center
    >
      <h1 className="text-3xl font-bold text-center mb-4">Orders Page</h1>
      <ul>
        <li>Order 1</li>
        <li>Order 2</li>
        <li>Order 3</li>
      </ul>
    </div>
  );
};

export default OrdersPage;
