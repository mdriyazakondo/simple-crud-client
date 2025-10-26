import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { FiBox } from "react-icons/fi"; // logo placeholder (optional)
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    fetch("http://localhost:5000/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user.email }),
    })
      .then((result) => {
        if (result.ok === true) {
          Swal.fire({
            title: "Login Successfully!",
            icon: "success",
            draggable: true,
          });
        }
        setUser({});
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      {/* Logo */}
      <Link
        to={"/"}
        className="flex items-center gap-2 text-indigo-600 font-bold text-xl"
      >
        <FiBox className="text-2xl" />
        <span>My Backend</span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <IoSearchOutline className="text-gray-500 text-lg" />
        </div>

        {/* Cart Icon */}
        <div className="relative cursor-pointer">
          <FaCartShopping className="text-indigo-500 text-xl" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">
            3
          </button>
        </div>

        {/* Login Button */}
        {user && Object.keys(user).length > 0 ? (
          <button
            onClick={handleLogout}
            className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
          >
            Log Out
          </button>
        ) : (
          <Link
            to="/login"
            className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
          >
            Login
          </Link>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        className="sm:hidden text-indigo-600 text-2xl"
      >
        {open ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
      </button>

      {/* Mobile Dropdown Menu */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
      >
        <a href="#" className="block">
          Home
        </a>
        <a href="#" className="block">
          About
        </a>
        <a href="#" className="block">
          Contact
        </a>
        <Link
          to="/login"
          className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
