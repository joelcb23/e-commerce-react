import { useProduct } from "../context/ProductContext";

const ProductPage = () => {
  const { product } = useProduct();
  return (
    <div className="dark:bg-gray-900 bg-gray-100 flex flex-col md:flex-row gap-5 w-full md:w-3/4 m-auto p-5 md:p-10 rounded-lg shadow-2xl">
      <img
        src={product.img}
        alt={`${product.name}-image`}
        className="w-full md:w-2/3"
      />
      <div>
        <h1>{product.name}</h1>
        <p>${product.price}</p>
        <p>{product.stock}</p>
        <form method="post">
          <input type="hidden" name="id" value={product.id} />
          <input
            type="number"
            name="stock"
            max={product.stock}
            min={1}
            defaultValue={1}
            className="input"
          />
          <input
            type="submit"
            value="Add to cart"
            className="bg-sky-500 px-3 py-1 rounded-sm"
          />
        </form>
      </div>
    </div>
  );
};

export default ProductPage;
