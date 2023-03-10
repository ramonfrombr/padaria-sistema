// Libraries
import React, { useLayoutEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import Delivery from "../components/admin/Delivery";

const DeliveriesScreen = () => {
  const [deliveries, setDeliveries] = useState<IDeliveryWithID[]>([])
  
  // Gets deliveries data
  useLayoutEffect(() => {
    const onResult = (querySnapshot: any) => {
      const deliveries: IDeliveryWithID[] = []

      querySnapshot.forEach((doc: IDeliveryFirestore) => {
        const tempData: IDeliveryWithID = {id: doc.id, data: doc.data()}
        deliveries.push(tempData);
      })

      console.log("deliveries >>>> ", deliveries)
      setDeliveries(deliveries)
    }

    function onError(error: any) {
      console.log(error);
    }

    const q = query(collection(db, "deliveries"), orderBy("deliveryDate", "desc"));
  
    const unsubscribe = onSnapshot(q, onResult, onError);

    return unsubscribe;
  }, [])
  
  return (
    <div className="sm:w-3/4 mx-auto pt-12 px-8">
      <h1>Entregas</h1>

      {deliveries.length ? deliveries.map(delivery => <Delivery key={delivery.id} delivery={delivery.data} />) : (<p className="col-span-3">Não há entregas registradas.</p>)}
    </div>
  );
};

export default DeliveriesScreen;
