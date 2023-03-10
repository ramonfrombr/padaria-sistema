import React, { useState } from "react";
import backgroundImage from "../../assets/images/padaria-1.jpg";
import IntroContent from "./IntroContent";
import Navbar from "./Navbar";

const Intro = () => {
  return (
    <div
      style={{
        background: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1)), url(${backgroundImage})`,
      }}
      className="h-screen bg-cover bg-center"
    >
      <Navbar />

      <IntroContent />
    </div>
  );
};

export default Intro;
