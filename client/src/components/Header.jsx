import { Link } from "react-router-dom";
import bSales from "../assets/banner-onlinesales.webp";
import monitor from "../assets/img-monitor.webp";
import mouse from "../assets/img-mouse.webp";
import keyboard from "../assets/img-keyboard.webp";
const Header = () => {
  return (
    <header
      className={`w-full h-1/2 lg:h-2/3 mb-20 md:absolute md:top-36 left-0 right-0 flex flex-col md:flex-row overflow-hidden `}
    >
      {/* Main Banner */}
      <div className="md:w-1/2 lg:w-2/3 h-full overflow-hidden">
        <img
          src={bSales}
          className="w-full h-full object-cover hover:scale-105 transition duration-500 ease-in-out"
          alt="banner-onlinesales"
        />
      </div>
      {/* Side Banners */}
      <div className="hidden md:w-1/2 lg:w-1/3 h-full md:flex md:flex-col">
        <div className="bg-sky-300 relative w-full h-1/2 overflow-hidden">
          <img
            src={monitor}
            alt="monitors-categories"
            className="w-1/2 object-cover absolute right-0 top-10 rotate-12"
          />
          <div className="text-black absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
            <h2 className="text-4xl font-semibold my-5">
              Big Sale <br />
              Monitors
            </h2>
            <p className="my-5">Buy 1 and get 2 free</p>
            <Link
              to="/products"
              className="bg-black text-white my-5 py-2 px-4 rounded-md border border-gray-400 transition duration-500 ease-in-out hover:bg-white hover:text-black"
            >
              Shop Now
            </Link>
          </div>
        </div>
        <div className="bg-slate-600 relative w-full h-1/2 overflow-hidden">
          <img
            src={mouse}
            alt="monitors-categories"
            className="w-1/3 object-cover absolute left-0 bottom-0 rotate-12"
          />
          <img
            src={keyboard}
            alt="monitors-categories"
            className="w-1/2 object-cover absolute right-0 bottom-10 rotate-45"
          />
          <div className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <h2 className="text-3xl text-center font-semibold my-5">
              New collection of Accessories
            </h2>
            <p className="my-5">Find your favorite accessories</p>
            <Link
              to="/products"
              className="bg-white hover:bg-gray-300 text-black my-5 py-2 px-4 rounded-md border border-gray-400 transition duration-500 ease-in-out hover:scale-105"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
