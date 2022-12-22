import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionsCreators, State } from "../state";
import CreateOrder from "../components/CreateOrder";
import Order from "../components/Order";

const OrdersScreen = () => {
  const dispatch = useDispatch();

  const { createOrder } = bindActionCreators(actionsCreators, dispatch);

  const orders = useSelector((state: State) => state.orders);
  const products = useSelector((state: State) => state.products);

  return (
    <div>
      <CreateOrder products={products} createOrder={createOrder} />

      <div className="mx-1 my-2 border-2 bg-slate-200 p-3">
        <h1>List of Orders</h1>

        {orders.map((order, idx) => {
          return <Order key={idx} order={order} />;
        })}
      </div>
    </div>
  );
};

export default OrdersScreen;
