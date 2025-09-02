import { useNavigate } from "react-router-dom";
import { useProduct } from "../context/ProductContext";

const CategoryItem = ({ category, className }) => {
  const { setCategorySelected } = useProduct();
  const navigate = useNavigate();
  return (
    <li
      className={`border hover:bg-neutral-200 rounded px-5 py-1 cursor-pointer ${className}`}
      onClick={async () => {
        setCategorySelected(category.id);
        navigate("/products/category/" + category.name);
      }}
    >
      <h3 className="text-sm h-full">{category.name}</h3>
    </li>
  );
};

export default CategoryItem;
