import React from "react";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

interface SidemenuProps {
  menuOpen: boolean;
  toggleMenu: () => void;
}

const Sidemenu = ({ menuOpen, toggleMenu }: SidemenuProps) => {
  return (
    <div
      className={`fixed top-0 z-50 grid h-full w-full items-center bg-[#ffc500] duration-300 ease-in-out sm:w-80 ${
        menuOpen ? "right-0" : "-right-[1000px]"
      }`}
    >
      {/* Icon */}
      <div className="absolute top-5 right-6 cursor-pointer border-transparent bg-transparent text-3xl outline-none">
        <FaTimes onClick={toggleMenu} className="text-white" />
      </div>

      {/* Menu Links */}
      <div className="grid grid-cols-1 grid-rows-3 text-center">
        <Link
          className="flex cursor-pointer list-none items-center justify-center text-2xl text-black no-underline duration-200 ease-in-out hover:text-[#e31837]"
          to="/"
        >
          Menu
        </Link>
        <Link
          className="flex cursor-pointer list-none items-center justify-center text-2xl text-black no-underline duration-200 ease-in-out hover:text-[#e31837]"
          to="/"
        >
          Contato
        </Link>
      </div>

      {/* Order Button */}
      <div className="flex justify-center">
        <Link
          className="cursor-pointer whitespace-nowrap border-0 bg-[#e31837] py-4 px-16 text-base text-white no-underline outline-none duration-200 ease-in-out hover:bg-white hover:text-[#010606]"
          to="pedido"
        >
          Fazer Pedido
        </Link>
      </div>
    </div>
  );
};

export default Sidemenu;
