import React, { useEffect, useLayoutEffect, useState } from "react";
import CreateOrder from "../components/admin/CreateOrder";
import Order from "../components/admin/Order";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { Heading } from "@aprendaagora/simple-react-component-library";

const OrdersScreen = () => {
  const [orders, setOrders] = useState<IOrderFirebase[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);

  useLayoutEffect(() => {
    function onResult(querySnapshot: any) {
      const orders: IOrderFirebase[] = [];
      querySnapshot.forEach(function (doc: any) {
        const tempData: IOrderFirebase = { id: doc.id, data: doc.data() };
        orders.push(tempData);
      });
      setOrders(orders);
    }

    function onError(error: any) {
      console.log(error);
    }

    const q = query(collection(db, "orders"), orderBy("date", "desc"));

    const unsubscribe = onSnapshot(q, onResult, onError);

    //const unsubscribe = onSnapshot(collection(db, "orders"), onResult, onError);
    return unsubscribe;
  }, []);

  useEffect(() => {
    function onResult(querySnapshot: any) {
      const products: IProduct[] = [];
      querySnapshot.forEach(function (doc: any) {
        const tempData: IProduct = { id: doc.id, data: doc.data() };
        products.push(tempData);
      });
      setProducts(products);
    }

    function onError(error: any) {
      console.log(error);
    }

    const unsubscribe = onSnapshot(
      collection(db, "products"),
      onResult,
      onError
    );
    return unsubscribe;
  }, []);

  return (
    <div className="mx-auto px-8 pt-12 sm:w-3/4">
      <Heading text="Pedidos" level={5} />

      <CreateOrder products={products} />

      <div className="mx-1 mt-5 border bg-white p-3">
        <Heading text="Lista de Pedidos" level={6} className="mb-3" />
        {orders.length ? (
          orders.map((order) => {
            return <Order key={order.id} order={order.data} />;
          })
        ) : (
          <p className="col-span-3">Não há pedidos registrados.</p>
        )}
      </div>
    </div>
  );
};

export default OrdersScreen;
