import { createBrowserRouter } from "react-router-dom";
import AdminScreen from "../screens/AdminScreen";
import DeliveriesScreen from "../screens/DeliveriesScreen";
import DeliveryMapScreen from "../screens/DeliveryMapScreen";
import ErrorScreen from "../screens/ErrorScreen";
import HomeScreen from "../screens/HomeScreen";
import OrdersScreen from "../screens/OrdersScreen";
import ProductsScreen from "../screens/ProductsScreen";
import SigninScreen from "../screens/SigninScreen";

import AdminRoot from "./AdminRoot";
import Root from "./Root";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorScreen />,
    children: [
      {
        path: "",
        element: <HomeScreen />,
      },
    ],
  },
  {
    path: "/admin/",
    element: <AdminRoot />,
    errorElement: <ErrorScreen />,
    children: [
      {
        path: "",
        element: <AdminScreen />,
      },
      {
        path: "products",
        element: <ProductsScreen />,
      },
      {
        path: "orders",
        element: <OrdersScreen />,
      },
      {
        path: "deliveries",
        element: <DeliveriesScreen />,
      },
      {
        path: "deliverymap",
        element: <DeliveryMapScreen />,
      },
    ],
  },
]);
