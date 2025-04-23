const CategoryItem = ({ category }) => {
  return (
    <li className="border border-neutral-400 hover:bg-neutral-300 rounded px-2 py-1">
      <h3>{category.name}</h3>
    </li>
  );
};

export default CategoryItem;
