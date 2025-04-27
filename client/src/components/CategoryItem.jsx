import { useNavigate } from "react-router-dom";
import { useProduct } from "../context/ProductContext";

const CategoryItem = ({ category }) => {
  const { setCategorySelected } = useProduct();
  const navigate = useNavigate();
  return (
    <li
      className="border hover:bg-neutral-200 rounded px-5 py-1 cursor-pointer"
      onClick={async () => {
        setCategorySelected(category.id);
        navigate("/products/category/" + category.name);
      }}
    >
      <h3>{category.name}</h3>
    </li>
  );
};

export default CategoryItem;
