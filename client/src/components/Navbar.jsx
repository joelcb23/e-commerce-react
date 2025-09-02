import { NavLink, Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import {
  IoCartOutline,
  IoClose,
  IoHeartOutline,
  IoMenu,
  IoSearch,
} from "react-icons/io5";
import { useProduct } from "../context/ProductContext";
import { useAuth } from "../context/AuthContext";
import OptionsButton from "./OptionsButton";
import logo from "../assets/tech-commerce.webp";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const {
    search,
    setSearch,
    searchProduct,
    categories,
    loadCategories,
    setCategorySelected,
  } = useProduct();
  const [show, setShow] = useState(false);
  const [options, setOptions] = useState(false);
  const menuRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!categories) {
      loadCategories();
    }
  }, [categories, loadCategories]);

  const newCategories = categories?.map(({ id, name }) => ({
    id,
    value: name,
    label: name,
  }));

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${search}`);
    if (search === "") {
      navigate("/products");
    }
    searchProduct(search);
    setShow(false);
  };

  const handleCategories = (category) => {
    if (!category) return;
    setCategorySelected(category.id);
    navigate("/products/category/" + category.value);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup
    return () => {
      if (show) {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    };
  }, [show]);
  return (
    <nav className="w-full bg-[#0097a7] text-white shadow-md">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-12 h-12 rounded-lg" />
          <h1 className="text-2xl">
            <span className="text-3xl font-semibold">Tech</span> Commerce
          </h1>
        </NavLink>

        {/* Menu button*/}
        <button className="lg:hidden text-3xl" onClick={() => setShow(!show)}>
          {show ? <IoClose /> : <IoMenu />}
        </button>

        {/* Menu responsive */}
        <ul
          ref={menuRef}
          className={`absolute lg:static top-20 left-0 lg:h-auto w-full lg:w-auto bg-[#0097A7] lg:bg-transparent flex flex-col lg:flex-row items-center gap-6 lg:gap-10 p-6 lg:p-0 transform transition-transform duration-300 ease-in-out z-40
      ${show ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        >
          {/* Contact */}
          <li className="lg:hidden mb-4">
            <p className="font-bold">Contact Us</p>
            <span className="text-gray-200 underline">+1 234-567-890</span>
          </li>

          {/* Search */}
          <li className="w-full lg:w-auto flex flex-col lg:flex-row items-center gap-3 bg-white text-black rounded-lg p-3">
            {/* Categories */}
            <select className="bg-white border rounded px-3 py-2 text-sm">
              <option
                value="all"
                onClick={() => {
                  navigate("/products");
                  setCategorySelected(null);
                }}
              >
                All Categories
              </option>
              {newCategories?.map((category) => (
                <option
                  key={category.id}
                  value={category.value}
                  onClick={() => handleCategories(category)}
                >
                  {category.label}
                </option>
              ))}
            </select>
            {/* Search bar */}
            <form
              onSubmit={handleSearch}
              className="flex items-center w-full lg:w-96"
            >
              <input
                type="text"
                className="flex-1 border px-3 py-2 rounded-l-md text-sm placeholder-gray-500 focus:outline-none"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                type="submit"
                className="bg-gray-200 px-3 py-2 rounded-r-md border hover:bg-gray-300"
              >
                <IoSearch className="text-xl" />
              </button>
            </form>
          </li>

          {/* Options */}
          <li className="flex flex-col lg:flex-row gap-3">
            <OptionsButton
              className="bg-[#0097A7] border border-gray-200 rounded px-4 py-2 text-sm"
              options={[
                { id: 1, value: "en", label: "English" },
                { id: 2, value: "es", label: "Spanish" },
              ]}
            />
            <OptionsButton
              className="bg-[#0097A7] border border-gray-200 rounded px-4 py-2 text-sm"
              options={[
                { id: 1, value: "usd", label: "USD" },
                { id: 2, value: "eur", label: "EUR" },
                { id: 3, value: "mxn", label: "MXN" },
              ]}
            />
          </li>

          {/* Account + Icons */}
          <li className="flex items-center gap-4">
            <IoHeartOutline
              size={24}
              className="cursor-pointer hover:text-gray-200"
              onClick={() => navigate("/coming-soon")}
            />
            <IoCartOutline
              size={24}
              className="cursor-pointer hover:text-gray-200"
              onClick={() => navigate("/cart")}
            />
            <div className="bg-[#0097A7] border border-gray-200 rounded px-4 py-2 text-sm relative">
              <p
                className="flex items-center cursor-pointer"
                onClick={() => setOptions(!options)}
              >
                Account
                <span>
                  <IoIosArrowDown className="ml-2" size={18} />
                </span>
              </p>
              <ul
                className={`bg-white border border-gray-200 rounded text-black p-2 flex-col gap-2  absolute top-full  left-0 w-full ${
                  options ? "flex" : "hidden"
                }`}
              >
                {!isAuthenticated && (
                  <>
                    <li onClick={() => setOptions(false)}>
                      <Link
                        to="/login"
                        className="hover:text-gray-700 py-2 w-full"
                      >
                        Login
                      </Link>
                    </li>
                    <li onClick={() => setOptions(false)}>
                      <Link
                        to="/register"
                        className="hover:text-gray-700 py-2 w-full"
                      >
                        Register
                      </Link>
                    </li>
                  </>
                )}
                {isAuthenticated && (
                  <>
                    <li>Logout</li>
                    <li onClick={() => setOptions(false)}>
                      <Link
                        to="/profile"
                        className="hover:text-gray-700 py-2 w-full"
                      >
                        Profile
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
