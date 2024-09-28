const ProductCard = ({ id, name, price, img, handleId }) => {
  return (
    <div
      className="w-full md:h-[270px] dark:bg-gray-900 bg-gray-200 rounded-md p-2 shadow-md shadow-gray-400 hover:shadow-lg hover:shadow-gray-500  cursor-pointer"
      onClick={() => handleId(id)}
    >
      <img
        src={img}
        alt={`${name}-image`}
        className="w-full h-3/4 object-cover"
      />
      <h1 className="mt-3">{name}</h1>
      <h2>${price}</h2>
    </div>
  );
};

export default ProductCard;
