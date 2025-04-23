import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import Page from "../components/Page";

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
    <Page className="my-28 md:my-52">
      <h1 className="text-3xl font-bold text-center">Product Form</h1>
      <form
        onSubmit={onSubmit}
        className="text-lg flex flex-col gap-y-5 my-10 px-5"
      >
        <p>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className="input"
            placeholder="Name of the product"
          />
        </p>

        <p>
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            {...register("price")}
            className="input"
            placeholder="00.00"
          />
        </p>

        <p>
          <label htmlFor="stock">Stock:</label>
          <input
            type="text"
            id="stock"
            {...register("stock")}
            className="input"
            placeholder="0"
          />
        </p>

        <p>
          <label htmlFor="image">Image:</label>
          <input
            type="text"
            id="image"
            {...register("image")}
            className="input text-extralight"
            placeholder="https://example.com/image.png"
          />
        </p>

        <p>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            {...register("category")}
            className="input"
            placeholder="Category of the product"
          />
        </p>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-5 px-4 rounded mt-5"
        >
          Add the product
        </button>
      </form>
    </Page>
  );
};

export default ProductForm;
