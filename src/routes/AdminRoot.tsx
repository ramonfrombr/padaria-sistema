import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { GrNotes } from "react-icons/gr";
import { FaList } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";
import logo from "../assets/images/padaria-logo.png";
import { useAuth } from "../contexts/AuthContext";
import SigninScreen from "../screens/SigninScreen";
import { Button } from "@aprendaagora/simple-react-component-library";

const AdminRoot = () => {
  const { currentUser, signout } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-200 pb-10">
      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b-2 border-orange-200 bg-orange-600 p-2 ">
        <Link to="/admin">
          <div className="mr-3 h-12 w-12 rounded-full bg-white p-1">
            <img src={logo} alt="logo" />
          </div>
        </Link>

        {currentUser && (
          <div className="flex items-center [&>a]:mr-1 [&>a]:flex [&>a]:items-center [&>a]:bg-slate-200 [&>a]:p-2 [&_svg]:mr-2">
            <Link
              to="/admin/products"
              className={`${
                location.pathname.includes("products") && "!bg-white"
              }`}
            >
              <FaList />
              Produtos
            </Link>

            <Link
              to="/admin/orders"
              className={`${
                location.pathname.includes("orders") && "!bg-white"
              }`}
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

            <Button
              text="Sign Out"
              type="danger"
              className="rounded border p-1"
              onClick={signout}
            />
          </div>
        )}
      </div>
      {/* Content */}
      <div className="flex justify-center pt-10">
        {currentUser ? <Outlet /> : <SigninScreen />}
      </div>
    </div>
  );
};

export default AdminRoot;
