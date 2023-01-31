import { Link, Outlet, useLocation } from "react-router-dom";
import { GrNotes } from "react-icons/gr";
import { FaList, FaMapMarkedAlt } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";
import logo from "../assets/images/padaria-logo.png";

const AdminRoot = () => {
  const location = useLocation();

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b-4 border-gray-300 bg-gray-200 p-5 [&>a]:mr-1 [&>a]:flex [&>a]:items-center [&>a]:rounded [&>a]:bg-slate-300 [&>a]:p-2 [&_svg]:mr-2">
        <img className="mr-3 w-10" src={logo} alt="logo" />

        <Link
          to="/admin/products"
          className={`${location.pathname.includes("products") && "!bg-white"}`}
        >
          <FaList />
          Produtos
        </Link>

        <Link
          to="/admin/orders"
          className={`${location.pathname.includes("orders") && "!bg-white"}`}
        >
          <GrNotes /> Pedidos
        </Link>

        <Link
          to="/admin/deliveries"
          className={`${
            location.pathname.includes("deliveries") && "!bg-white"
          }`}
        >
          <MdDeliveryDining /> Entregas
        </Link>
      </div>
      {/* Content */}
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminRoot;
