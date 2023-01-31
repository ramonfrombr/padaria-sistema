import React from "react";
import { FaWhatsappSquare } from "react-icons/fa";

const IntroContent = () => {
  return (
    <div
      className="max-h-full"
      style={{
        height: "calc(100vh - 80px)",
        padding: "0rem calc((100vw - 1300px) / 2)",
      }}
    >
      <div className="flex h-screen max-h-full w-full flex-col items-start justify-center py-0 px-8 font-bold uppercase leading-none text-white sm:w-[650px]">
        <h1
          style={{
            fontSize: "clamp(2.5rem, 10vw, 5rem)",
            boxShadow: "3px 5px #e9ba23",
          }}
          className="mb-4 tracking-wide drop-shadow"
        >
          O Melhor Pão Caseiro da Região
        </h1>
        <p style={{ fontSize: "clamp(2rem, 2.5vw, 3rem)" }} className="mb-8">
          Fresquinho todos os dias!
        </p>
        <button className="flex cursor-pointer flex-col items-center border-0 bg-[#e31837] py-4 px-16 text-xl text-white">
          Faça seu pedido no WhatsApp
          <div className="flex items-center">
            (27) 997660261 <FaWhatsappSquare className="ml-2" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default IntroContent;
