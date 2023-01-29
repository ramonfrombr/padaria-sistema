import { Link, Outlet, useLocation } from "react-router-dom";
import { GrNotes } from "react-icons/gr";
import {
  FaList,
  FaMapMarkedAlt
} from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";
import logo from '../assets/images/padaria-logo.png'

const Root = () => {
  let location = useLocation();

  return (
    <div>
      {/* Tabs */}
      
      <div className="flex flex-wrap items-center gap-2 bg-gray-200 p-5 [&>a]:mr-1 [&>a]:flex [&>a]:items-center [&>a]:rounded [&>a]:bg-slate-300 [&>a]:p-2 [&_svg]:mr-2 border-b-4 border-gray-300">
       
        <img className="w-10 mr-3" src={logo} alt="logo" />
 
        <Link
          to="/products"
          className={`${location.pathname.includes("products") && "!bg-white"}`}
        >
          <FaList />
          Produtos
        </Link>

        <Link
          to="/orders"
          className={`${location.pathname.includes("orders") && "!bg-white"}`}
        >
          <GrNotes /> Pedidos
        </Link>

        <Link
          to="/deliveries"
          className={`${
            location.pathname.includes("deliveries") && "!bg-white"
          }`}
        >
          <MdDeliveryDining /> Entregas
        </Link>

        <Link
          to="/deliverymap"
          className={`${
            location.pathname.includes("deliverymap") && "!bg-white"
          }`}
        >
          <FaMapMarkedAlt /> Mapa de Entrega
        </Link>
        {/**
        
        <Link
          to="/deliveries"
          className={`${
            location.pathname.includes("production") && "!bg-white"
          }`}
        >
          <GiCook /> Production
        </Link>

        

        <Link
          to="/preorders"
          className={`${
            location.pathname.includes("preorders") && "!bg-white"
          }`}
        >
          <FaCalendar />
          Preorders
        </Link>

        <Link
          to="/products"
          className={`${location.pathname.includes("storage") && "!bg-white"}`}
        >
          <FaBoxOpen className="mr-2" />
          Storage
        </Link>

        <Link
          to="/units"
          className={`${location.pathname.includes("units") && "!bg-white"}`}
        >
          <FaStoreAlt />
          Units
        </Link>

        <Link
          to="/pointsofsale"
          className={`${
            location.pathname.includes("pointsofsale") && "!bg-white"
          }`}
        >
          <FaMapMarkerAlt />
          Points of Sale
        </Link>
         */}
      </div>
      {/* Content */}
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
