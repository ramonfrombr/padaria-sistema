import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import logo from "../../assets/images/padaria-logo.png";

const Footer = () => {
  return (
    <div className="bg-[#0d0909]">
      <div className="my-0 mx-auto flex max-w-[1300px] flex-col items-center justify-center py-4 px-6">
        <div className="w-full max-w-[1300px]">
          <div className="mx-auto mt-4 mb-0 flex max-w-[1100px] flex-col items-center justify-between md:flex-row">
            {/* Logo */}
            <div className="mb-4 w-10 cursor-pointer justify-self-start no-underline">
              <img src={logo} alt="" />
            </div>
            {/* Social Media Icons */}
            <div className="flex w-60 items-center justify-center md:justify-end">
              <a
                className="mr-6 text-2xl text-white"
                href="https://www.facebook.com/omelhordefeurosa"
                target="_blank"
                aria-label="Facebook"
                rel="nooopener noreferrer"
              >
                <FaFacebook />
              </a>

              <a
                className="text-2xl text-white"
                href="https://www.instagram.com/omelhordefeurosa/"
                target="_blank"
                aria-label="Instagram"
                rel="nooopener noreferrer"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
