import { useEffect } from "react";
import { useProduct } from "../context/ProductContext";
import CategoryItem from "./CategoryItem";

const CategoriesBar = () => {
  const { categories, loadCategories } = useProduct();

  useEffect(() => {
    const fetchCategories = async () => {
      await loadCategories();
    };
    fetchCategories();
  }, []);
  return (
    <div className="z-[100] hidden w-full h-14 bg-white md:flex items-center justify-start px-5 border overflow-x-scroll">
      <h3 className="w-40 pr-5 border-r border-gray-400">Sort by category</h3>
      <ul className="w-full flex items-center">
        {categories?.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            className={"h-full"}
          />
        ))}
      </ul>
    </div>
  );
};

export default CategoriesBar;
