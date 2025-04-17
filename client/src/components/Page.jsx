const Page = ({ children }) => {
  return (
    <section
      className={`
    bg-[#fcfcfc] w-full min-h-screen my-28 px-3 py-10
    md:w-2/3 md:mx-auto md:my-52 md:px-5
    `}
    >
      {children}
    </section>
  );
};

export default Page;
