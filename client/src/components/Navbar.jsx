import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

import { IoCartSharp, IoClose, IoLogOutSharp, IoMenu } from "react-icons/io5";
import { useProduct } from "../context/ProductContext";

const Navbar = () => {
  const { isAuthenticated, logoutAuth } = useAuth();
  const { searchProduct } = useProduct();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${e.target.value}`);

    if (e.target.value === "") {
      navigate("/products");
    }

    searchProduct(e.target.value);
  };
  return (
    <nav className="flex justify-between items-center md:flex-col py-2 mb-10 text-center shadow-lg relative">
      <h1>
        <Link to="/" className="text-3xl font-bold py-2 px-3">
          E-Commerce
        </Link>
      </h1>

      <button
        className="md:hidden text-2xl px-3 py-2"
        onClick={() => setShow(!show)}
      >
        {show ? <IoClose /> : <IoMenu />}
      </button>
      <ul
        className={`
        text-xl  flex flex-col gap-5 md:flex-row md:gap-0 md:justify-evenly items-center w-full md:w-2/3 mx-auto pb-5 md:py-5
        top-[72px] absolute z-50 md:static dark:bg-gray-800 bg-white transition-all duration-300 ease-linear
        ${show ? "left-0" : "left-[-100%]"}`}
      >
        <li className="w-full md:w-auto">
          <input
            type="text"
            className="text-lg py-1 px-2 dark:bg-gray-900 bg-gray-200 rounded-2xl outline-none"
            placeholder="Search..."
            onChange={handleSearch}
          />
        </li>
        <li className="hover:border-b-2">
          <NavLink to="/" onClick={() => setShow(false)}>
            Home
          </NavLink>
        </li>
        <li className="hover:border-b-2">
          <NavLink to="/products" onClick={() => setShow(false)}>
            Products
          </NavLink>
        </li>
        {isAuthenticated ? (
          <>
            <li className="hover:border-b-2 text-center">
              <NavLink to="/cart" onClick={() => setShow(false)}>
                <IoCartSharp className="text-2xl text-center" />
              </NavLink>
            </li>
            <li className="hover:border-b-2">
              <NavLink
                to="/"
                onClick={() => {
                  logoutAuth();
                  setShow(false);
                }}
              >
                <IoLogOutSharp className="text-2xl" />
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li className="hover:border-b-2">
              <NavLink to="/login" onClick={() => setShow(false)}>
                Login
              </NavLink>
            </li>
            <li className="hover:border-b-2">
              <NavLink to="/register" onClick={() => setShow(false)}>
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
