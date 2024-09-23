const ItemCart = ({ product, quantity }) => {
  return (
    <div className="flex gap-5 items-center dark:bg-gray-800 bg-gray-100 rounded-md p-3">
      <img
        src={product.img}
        alt={`${product.name}-image`}
        className="w-1/4 rounded-sm"
      />
      <div>
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <p>Quantity: {quantity}</p>
        <p>Total: $ {product.price * quantity}</p>
      </div>
    </div>
  );
};
export default ItemCart;
