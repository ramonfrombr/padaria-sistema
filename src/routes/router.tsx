import { createBrowserRouter } from "react-router-dom";
import DeliveriesScreen from "../screens/DeliveriesScreen";
import DeliveryMapScreen from "../screens/DeliveryMapScreen";
import ErrorScreen from "../screens/ErrorScreen";
import OrdersScreen from "../screens/OrdersScreen";
import ProductsScreen from "../screens/ProductsScreen";

import Root from "./root";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorScreen />,
    children: [
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
