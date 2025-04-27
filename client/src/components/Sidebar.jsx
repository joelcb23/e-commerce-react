import { useEffect } from "react";
import { useProduct } from "../context/ProductContext";
import CategoryItem from "./CategoryItem";

const Sidebar = () => {
  const { categories, loadCategories } = useProduct();

  useEffect(() => {
    const fetchCategories = async () => {
      await loadCategories();
    };
    fetchCategories();
  }, []);
  return (
    <div className="absolute top-[150px] hidden bg-neutral-100 text-lg font-light w-full px-5 py-1 md:flex md:justify-start lg:justify-center items-center overflow-x-scroll">
      <h2 className="mx-5">Categories</h2>
      <ul className="flex gap-1">
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
