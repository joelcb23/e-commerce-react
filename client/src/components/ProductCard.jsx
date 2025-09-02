import { BiHeart } from "react-icons/bi";

const ProductCard = ({
  id,
  name,
  price,
  img,
  handleId,
  discount,
  className,
}) => {
  return (
    <div
      className={`
        bg-white border overflow-hidden relative flex flex-col items-start gap-5 p-3 hover:rounded-md cursor-pointer hover:shadow hover:shadow-gray-500 ${className}`}
      onClick={() => {
        handleId(id);
        window.scrollTo(0, 0);
      }}
    >
      {discount > 0 && (
        <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md">
          -{discount}%
        </span>
      )}
      <img
        src={img}
        alt={`${name}-image-${id}`}
        className={`w-full h-2/3 object-cover rounded-md`}
      />
      <div
        className={`w-full h-1/3 overflow-hidden flex flex-col justify-around`}
      >
        <h1 className="my-3 text-lg font-extralight text-nowrap">{name}</h1>
        <h2 className="my-3 text-lg font-semibold">
          {discount ? (
            <>
              ${(price - (price * discount) / 100).toFixed(2)}
              <span className="text-gray-400 line-through ml-2">${price}</span>
            </>
          ) : (
            "$" + price
          )}
        </h2>
      </div>
      <BiHeart
        size={30}
        className="absolute bottom-7 right-3 text-2xl p-1 rounded-full text-gray-400 hover:text-red-600 hover:bg-gray-200"
      />
    </div>
  );
};

export default ProductCard;
