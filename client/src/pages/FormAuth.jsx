const FormAuth = ({ children }) => {
  return (
    <section
      className={`
          bg-white w-full rounded-lg shadow-2xl mx-auto my-20 p-8 
          md:w-1/2 md:p-20
    `}
    >
      {children}
    </section>
  );
};

export default FormAuth;
