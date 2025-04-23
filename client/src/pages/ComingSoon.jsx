import Page from "../components/Page";
import WarningSignal from "../assets/warning-signal.png";
const ComingSoon = () => {
  return (
    <Page className="my-28 md:my-52">
      <img
        src={WarningSignal}
        alt="warning signal"
        className="w-[80%] md:w-[30%] mx-auto"
      />
      <div className="text-center text-2xl">
        <h1 className="text-6xl font-extrabold my-20">Coming soon</h1>
        <p className={"md:w-4/5 mx-auto my-20"}>
          This page is under construction. We are working hard to bring you the
          best experience possible. Stay tuned!
        </p>
      </div>
      <div className="text-center">
        <a
          href="/"
          className="text-blue-500 underline py-2 px-4 rounded hover:text-blue-600 transition duration-300"
        >
          Back to Home
        </a>
      </div>
    </Page>
  );
};

export default ComingSoon;
