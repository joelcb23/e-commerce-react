const OptionsButton = ({ options, className, onClick }) => {
  return (
    <select name="" id="" className={`${className}`}>
      {options.map(({ id, value, label }) => (
        <option key={id} value={value} onClick={onClick}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default OptionsButton;
