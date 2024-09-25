const ProductCard = ({ id, name, price, img, handleId }) => {
  return (
    <div
      className="w-full md:w-1/3 lg:w-1/6 md:h-[250px] dark:bg-gray-900 bg-gray-200 rounded-md p-2"
      onClick={() => handleId(id)}
    >
      <img
        src={img}
        alt={`${name}-image`}
        className="w-full h-3/4 object-cover"
      />
      <h1>{name}</h1>
      <h2>${price}</h2>
    </div>
  );
};

export default ProductCard;
