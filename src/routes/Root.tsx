import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Root = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Root;
