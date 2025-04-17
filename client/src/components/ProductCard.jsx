import { useProduct } from "../context/ProductContext";

const ProductCard = ({ id, name, price, description, img, handleId }) => {
  const { search } = useProduct();
  return (
    <div
      className={`
        bg-white w-full h-[180px] overflow-hidden flex items-start gap-5 p-3 rounded-md shadow-md cursor-pointer shadow-gray-400 hover:shadow-lg hover:shadow-gray-500 
         md:h-[380px]
         ${search ? "md:flex-row" : "md:flex-col"}`}
      onClick={() => handleId(id)}
    >
      <img
        src={img}
        alt={`${name}-image`}
        className={`
          w-full h-full object-cover rounded-md 
          md:h-3/5
          ${search && "md:w-3/5 md:h-full"}`}
      />
      <div className={`w-full overflow-hidden ${search && "w-2/5"}`}>
        <h1 className="my-3 text-xl font-extralight">{name}</h1>
        <h2 className="my-3 text-2xl ">${price}</h2>
      </div>
    </div>
  );
};

export default ProductCard;
