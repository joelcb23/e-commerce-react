import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

import {
  IoCartSharp,
  IoClose,
  IoHomeSharp,
  IoLogInSharp,
  IoLogOutSharp,
  IoMenu,
  IoPersonCircleSharp,
  IoStorefrontSharp,
} from "react-icons/io5";
import { useProduct } from "../context/ProductContext";

const Navbar = () => {
  const { isAuthenticated, logoutAuth } = useAuth();
  const { searchProduct } = useProduct();
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${search}`);
    if (search === "") {
      navigate("/products");
    }

    searchProduct(search);
  };
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 150) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav className="fixed left-0 top-0 z-50 w-full h-16 md:h-32 dark:bg-gray-800 bg-white flex justify-between items-center md:flex-col py-2 mb-10 text-center shadow-lg transition-all duration-500 ease-linear">
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
        text-xl flex flex-col gap-5 md:flex-row md:gap-0 md:justify-evenly items-center w-full ${
          isScrolled ? "md:w-1/3" : "md:w-2/3"
        } mx-auto pb-5 md:py-5
        top-16 absolute md:static dark:bg-gray-800 bg-white transition-all duration-300 ease-linear
        ${show ? "left-0" : "left-[-100%]"}`}
      >
        <li className="w-full md:w-auto">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              className="text-lg py-1 px-2 dark:bg-gray-900 bg-gray-200 rounded-2xl outline-none"
              placeholder="Search..."
              value={search}
              onClick={() => navigate("/search")}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </li>
        <li className="hover:border-b-2">
          <NavLink to="/" onClick={() => setShow(false)}>
            {isScrolled ? <IoHomeSharp /> : "Home"}
          </NavLink>
        </li>
        <li className="hover:border-b-2">
          <NavLink to="/products" onClick={() => setShow(false)}>
            {isScrolled ? <IoStorefrontSharp /> : "Products"}
          </NavLink>
        </li>
        {isAuthenticated ? (
          <>
            <li className="hover:border-b-2">
              <NavLink to="/profile" onClick={() => setShow(false)}>
                {isScrolled ? <IoPersonCircleSharp /> : "Profile"}
              </NavLink>
            </li>
            <li className="hover:border-b-2 text-center">
              <NavLink to="/cart" onClick={() => setShow(false)}>
                {isScrolled ? (
                  <IoCartSharp className="text-2xl text-center" />
                ) : (
                  "Cart"
                )}
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
                {isScrolled ? <IoLogOutSharp className="text-2xl" /> : "Logout"}
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li className="hover:border-b-2">
              <NavLink to="/login" onClick={() => setShow(false)}>
                {isScrolled ? <IoLogInSharp /> : "Login"}
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
