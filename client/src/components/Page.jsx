import clsx from "clsx";

const Page = ({ children, className = "" }) => {
  return (
    <section
      className={clsx(
        "bg-[#fcfcfc] w-full min-h-[calc(100vh-180px)] px-3 py-10",
        "md:w-2/3 md:mx-auto md:px-5",
        className
      )}
    >
      {children}
    </section>
  );
};

export default Page;
