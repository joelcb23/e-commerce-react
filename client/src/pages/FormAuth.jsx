const FormAuth = ({ children }) => {
  return (
    <section
      className={`
          bg-white w-full rounded-lg shadow-2xl mx-auto my-28 p-8 
          md:w-1/2 md:p-20 md:my-56
    `}
    >
      {children}
    </section>
  );
};

export default FormAuth;
