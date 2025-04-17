import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../context/ProductContext";

const ProductForm = () => {
  const { createProduct } = useProduct();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = handleSubmit((data) => {
    const product = {
      name: data.name,
      price: parseFloat(data.price),
      stock: Number(data.stock),
      img: data.image,
      category: data.category,
    };

    createProduct(product);
    reset();
    navigate("/products");
  });
  return (
    <div
      className={`dark:bg-gray-700 bg-gray-100 rounded-lg shadow-2xl
      w-full mt-20 p-5 mx-auto
      md:w-2/3 md:mt-40 md:p-10 
      `}
    >
      <h1 className="text-3xl font-bold text-center">Product Form</h1>
      <form onSubmit={onSubmit} className="flex flex-col">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          {...register("name")}
          className="input"
          placeholder="Name of the product"
        />

        <label htmlFor="price">Price:</label>
        <input
          type="text"
          id="price"
          {...register("price")}
          className="input"
          placeholder="00.00"
        />

        <label htmlFor="stock">Stock:</label>
        <input
          type="text"
          id="stock"
          {...register("stock")}
          className="input"
          placeholder="0"
        />

        <label htmlFor="image">Image:</label>
        <input
          type="text"
          id="image"
          {...register("image")}
          className="input"
          placeholder="https://example.com/image.png"
        />

        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          {...register("category")}
          className="input"
          placeholder="Category of the product"
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
        >
          Add the product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
