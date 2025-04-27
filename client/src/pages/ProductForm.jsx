import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import Page from "../components/Page";
import { useEffect } from "react";

const ProductForm = () => {
  const { createProduct, loadCategories, categories } = useProduct();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    const categoryName =
      data.category === "new" ? data.newCategory : data.category;
    const product = {
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      stock: Number(data.stock),
      img: data.image,
      category: categoryName,
    };

    createProduct(product);
    reset();
    navigate("/products");
  });

  // Load categories when the component mounts
  useEffect(() => {
    loadCategories();
  }, []);
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
            {...register("name", {
              required: { value: true, message: "Name is required" },
              minLength: { value: 10, message: "Minimum 10 characters" },
            })}
            className="input"
            placeholder="Name of the product"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </p>
        <p>
          <label htmlFor="description">Description:</label>
          <textarea
            rows="6"
            type="text"
            id="description"
            {...register("description", {
              required: { value: true, message: "Description is required" },
              minLength: { value: 50, message: "Minimum 50 characters" },
            })}
            className="input"
            placeholder="Description of the product"
          />
          {errors.description && (
            <span className="text-red-500 text-sm">
              {errors.description.message}
            </span>
          )}
        </p>

        <p>
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            {...register("price", {
              required: { value: true, message: "Price is required" },
              pattern: {
                value: /^\d+(\.\d{1,2})?$/,
                message: "Invalid price format",
              },
            })}
            className="input"
            placeholder="00.00"
          />
          {errors.price && (
            <span className="text-red-500 text-sm">{errors.price.message}</span>
          )}
        </p>

        <p>
          <label htmlFor="stock">Stock:</label>
          <input
            type="text"
            id="stock"
            {...register("stock", {
              required: { value: true, message: "Stock is required" },
              pattern: {
                value: /^[0-9]+$/,
                message: "Stock must be a positive integer",
              },
            })}
            className="input"
            placeholder="0"
          />
          {errors.stock && (
            <span className="text-red-500 text-sm">{errors.stock.message}</span>
          )}
        </p>

        <p>
          <label htmlFor="image">Image:</label>
          <input
            type="text"
            id="image"
            {...register("image", {
              required: { value: true, message: "Image URL is required" },
            })}
            className="input text-extralight"
            placeholder="https://example.com/image.png"
          />
          {errors.image && (
            <span className="text-red-500 text-sm">{errors.image.message}</span>
          )}
        </p>

        <p>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            {...register("category", {
              required: { value: true, message: "Category is required" },
              validate: (value) => value !== "new" || !!watch("newCategory"),
            })}
            className="input"
          >
            <option value="">Select a category</option>
            <option value="new">Create a new category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="text-red-500 text-sm">
              {errors.category.message}
            </span>
          )}
        </p>
        {watch("category") === "new" && (
          <p>
            <label htmlFor="newCategory">New Category Name:</label>
            <input
              id="newCategory"
              {...register("newCategory", {
                required: { value: true, message: "Write a new category" },
                minLength: { value: 3, message: "Minimum 3 characters" },
                validate: (value) => {
                  const isUnique = !categories.some(
                    (category) => category.name === value.toUpperCase()
                  );
                  return isUnique || "Category already exists";
                },
              })}
              className="input"
              type="text"
              placeholder="Enter new category"
            />
            {errors.newCategory && (
              <span className="text-red-500 text-sm">
                {errors.newCategory.message}
              </span>
            )}
          </p>
        )}

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
