import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

import { IoCartSharp, IoClose, IoLogOutSharp, IoMenu } from "react-icons/io5";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [show, setShow] = useState(false);
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
        text-xl flex flex-col md:flex-row md:justify-evenly md:items-center w-full md:w-2/3 mx-auto pb-5 md:py-5
        top-[72px] absolute md:static  dark:bg-gray-800 transition-all duration-300 ease-linear
        ${show ? "left-0" : "left-[-100%]"}`}
      >
        <li>
          <input
            type="text"
            className="text-lg py-1 px-2 dark:bg-gray-900 bg-gray-200 rounded-2xl outline-none"
            placeholder="Search..."
            onChange={(e) => console.log(e.target.value)}
          />
        </li>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/products">Products</NavLink>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <NavLink to="/cart">
                <IoCartSharp className="text-2xl" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/logout" onClick={logout}>
                <IoLogOutSharp className="text-2xl" />
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
