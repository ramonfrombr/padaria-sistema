import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/products/logo.png";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-black/50 py-3 pl-8 pr-3 font-bold">
      {/* Nav Logo */}
      <div className="h-10 w-10">
        <img src={logo} alt="Logo da Padaria" />
      </div>

      {/* Nav Link */}
      <Link
        to="/"
        className="flex cursor-pointer items-center font-['Birthstone_Bounce'] text-2xl text-white no-underline sm:text-4xl"
      >
        O Melhor de Feu Rosa
      </Link>

      {/* Nav Icon */}
      <div className="invisible flex h-10 w-10 items-center">
        <FaBars className="mt-4 h-10 w-10 -translate-x-2/4 -translate-y-[15%] cursor-pointer text-white" />
      </div>
    </div>
  );
};

export default Navbar;
