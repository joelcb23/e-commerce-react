import CategoryItem from "./CategoryItem";

const Sidebar = () => {
  return (
    <div className="hidden bg-neutral-100 text-lg font-light md:w-40 px-2 py-5 md:flex flex-col">
      <h2 className="mb-5">Categories</h2>
      <ul className="flex flex-col gap-1">
        <CategoryItem category={{ name: "All" }} />
        <CategoryItem category={{ name: "Electronics" }} />
        <CategoryItem category={{ name: "Audio" }} />
        <CategoryItem category={{ name: "Furniture" }} />
        <CategoryItem category={{ name: "Vehicle" }} />
      </ul>
    </div>
  );
};

export default Sidebar;
