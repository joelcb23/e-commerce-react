import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
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
      discount: Number(data.discount) || 0,
      img: data.image,
      category: categoryName,
    };

    createProduct(product);
    reset();
    navigate("/products");
  });

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <section className="my-20 bg-white p-10 rounded-2xl shadow-lg max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-gray-800">
        Add New Product
      </h1>

      <form onSubmit={onSubmit} className="text-lg grid gap-y-6 my-10 px-2">
        {/* Name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-medium">
            Name:
          </label>
          <input
            type="text"
            id="name"
            {...register("name", {
              required: { value: true, message: "Name is required" },
              minLength: { value: 5, message: "At least 5 characters" },
            })}
            className="input"
            placeholder="e.g., Wireless Headphones"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="font-medium">
            Description:
          </label>
          <textarea
            rows={5}
            id="description"
            {...register("description", {
              required: { value: true, message: "Description is required" },
              minLength: { value: 30, message: "At least 30 characters" },
            })}
            className="input"
            placeholder="Brief description of the product"
          />
          {errors.description && (
            <span className="text-red-500 text-sm">
              {errors.description.message}
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex flex-col gap-1">
          <label htmlFor="price" className="font-medium">
            Price ($):
          </label>
          <input
            type="number"
            step="0.01"
            id="price"
            {...register("price", {
              required: { value: true, message: "Price is required" },
              min: { value: 0.01, message: "Price must be greater than 0" },
            })}
            className="input"
            placeholder="e.g., 59.99"
          />
          {errors.price && (
            <span className="text-red-500 text-sm">{errors.price.message}</span>
          )}
        </div>

        {/* Discount */}
        <div className="flex flex-col gap-1">
          <label htmlFor="discount" className="font-medium">
            Discount (%):
          </label>
          <input
            type="number"
            id="discount"
            {...register("discount", {
              min: { value: 0, message: "Minimum is 0%" },
              max: { value: 100, message: "Maximum is 100%" },
            })}
            className="input"
            placeholder="e.g., 20"
          />
          {errors.discount && (
            <span className="text-red-500 text-sm">
              {errors.discount.message}
            </span>
          )}
        </div>

        {/* Stock */}
        <div className="flex flex-col gap-1">
          <label htmlFor="stock" className="font-medium">
            Stock:
          </label>
          <input
            type="number"
            id="stock"
            {...register("stock", {
              required: { value: true, message: "Stock is required" },
              min: { value: 0, message: "Stock cannot be negative" },
            })}
            className="input"
            placeholder="e.g., 50"
          />
          {errors.stock && (
            <span className="text-red-500 text-sm">{errors.stock.message}</span>
          )}
        </div>

        {/* Image */}
        <div className="flex flex-col gap-1">
          <label htmlFor="image" className="font-medium">
            Image URL:
          </label>
          <input
            type="url"
            id="image"
            {...register("image", {
              required: { value: true, message: "Image URL is required" },
              pattern: {
                value: /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp)$/i,
                message: "Must be a valid image URL",
              },
            })}
            className="input"
            placeholder="https://example.com/image.png"
          />
          {errors.image && (
            <span className="text-red-500 text-sm">{errors.image.message}</span>
          )}
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1">
          <label htmlFor="category" className="font-medium">
            Category:
          </label>
          <select
            id="category"
            {...register("category", {
              required: { value: true, message: "Category is required" },
              validate: (value) => value !== "new" || !!watch("newCategory"),
            })}
            className="input"
          >
            <option value="">-- Select a category --</option>
            <option value="new">+ Create new category</option>
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
        </div>

        {watch("category") === "new" && (
          <div className="flex flex-col gap-1">
            <label htmlFor="newCategory" className="font-medium">
              New Category Name:
            </label>
            <input
              id="newCategory"
              {...register("newCategory", {
                required: { value: true, message: "Write a new category" },
                minLength: { value: 3, message: "Minimum 3 characters" },
                validate: (value) => {
                  const isUnique = !categories.some(
                    (category) =>
                      category.name.toLowerCase() === value.toLowerCase()
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
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-3 px-6 rounded-lg mt-5"
        >
          Save Product
        </button>
      </form>
    </section>
  );
};

export default ProductForm;
