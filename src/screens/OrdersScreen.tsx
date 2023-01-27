import React, { useEffect, useLayoutEffect, useState } from "react";
import CreateOrder from "../components/CreateOrder";
import Order from "../components/Order";
import { collection, getDocs, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

const OrdersScreen = () => {

  const [orders, setOrders] = useState<IOrderFirebase[]>([])
  const [products, setProducts] = useState<IProduct[]>([])

  useLayoutEffect(() => {
    function onResult(querySnapshot: any) {
      const orders: IOrderFirebase[] = []
      querySnapshot.forEach(function(doc: any) {
        const tempData: IOrderFirebase = {id: doc.id, data: doc.data()}
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
      const products: IProduct[] = []
      querySnapshot.forEach(function(doc: any) {
        const tempData: IProduct = {id: doc.id, data: doc.data()}
        products.push(tempData);
      });
      setProducts(products);
    }

    function onError(error: any) {
      console.log(error);
    }
  
    const unsubscribe = onSnapshot(collection(db, "products"), onResult, onError);
    return unsubscribe;
  }, []);

  return (
    <div>
       
      <CreateOrder products={products} /*createOrder={createOrder}*/ />

      <div className="mx-1 my-2 border-2 bg-slate-200 p-3">
        <h1>List of Orders</h1>

        {orders.map((order) => {
          return <Order key={order.id} order={order.data} />;
        })}
      </div>
    </div>
  );
};

export default OrdersScreen;
