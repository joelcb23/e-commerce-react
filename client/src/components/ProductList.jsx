const ProductList = ({ title, className, children }) => {
  return (
    <div className="w-full my-20">
      <h2 className="text-3xl mx-3 font-semibold mb-10 md:mx-0">{title}</h2>
      <div className={`flex flex-wrap justify-start rounded-md ${className}`}>
        {children}
      </div>
    </div>
  );
};
export default ProductList;
