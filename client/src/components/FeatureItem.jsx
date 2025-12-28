const FeatureItem = ({ className, icon, firstText, secondText }) => {
  return (
    <div className={`flex items-center gap-5 px-10 py-5 ${className}`}>
      {icon}
      <div>
        <p className="font-semibold">{firstText}</p>
        <p className="text-teal-400">{secondText}</p>
      </div>
    </div>
  );
};
export default FeatureItem;
