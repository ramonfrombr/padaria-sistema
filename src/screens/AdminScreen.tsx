import { Heading } from "@aprendaagora/simple-react-component-library";
import React from "react";
import {
  FaCheckCircle,
  FaCheckSquare,
  FaTimesCircle,
  FaShoppingCart,
  FaCalendarAlt,
} from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";
import { Link } from "react-router-dom";

const AdminScreen = () => {
  return (
    <div className="border-2 border-orange-300 bg-white p-5 sm:w-[700px]">
      <Heading text="Admin Summary" className="mb-4 text-center" />

      <div>
        <Heading text="Today" level={6} className="mb-4" />

        <Link to="/admin/deliveries">
          <div className="mb-2 flex items-center p-3 transition duration-150 hover:bg-slate-200">
            <span className="flex w-12 items-center">
              <FaTimesCircle color="red" />
              <MdDeliveryDining className="ml-1" color="red" />
            </span>
            <span>6 Deliveries pending</span>
          </div>
        </Link>

        <Link to="/admin/deliveries">
          <div className="mb-2 flex items-center p-3 transition duration-150 hover:bg-slate-200">
            <span className="flex w-12 items-center">
              <FaCheckCircle color="green" />{" "}
              <MdDeliveryDining className="ml-1" color="green" />
            </span>
            <span>6 Deliveries done</span>
          </div>
        </Link>

        <Link to="/admin/orders">
          <div className="mb-2 flex items-center p-3 transition duration-150 hover:bg-slate-200">
            <span className="flex w-12 items-center">
              <FaShoppingCart />
            </span>
            <span>6 Orders</span>
          </div>{" "}
        </Link>

        <Link to="/admin/orders">
          <div className="mb-2 flex items-center p-3 transition duration-150 hover:bg-slate-200">
            <span className="flex w-12 items-center">
              <FaCalendarAlt />
            </span>
            <span>6 Preorders</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminScreen;
