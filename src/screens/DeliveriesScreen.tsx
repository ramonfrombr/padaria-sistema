// Libraries

import React, { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import Delivery from "../components/Delivery";


const DeliveriesScreen = () => {
  const [deliveries, setDeliveries] = useState<IDeliveryWithID[]>([])
  
  // Gets deliveries data
  useEffect(() => {
    const onResult = (querySnapshot: any) => {
      const deliveries: IDeliveryWithID[] = []

      querySnapshot.forEach((doc: IDeliveryFirestore) => {
        const tempData: IDeliveryWithID = {id: doc.id, data: doc.data()}
        deliveries.push(tempData);
      })

      setDeliveries(deliveries)
    }

    function onError(error: any) {
      console.log(error);
    }

    const unsubscribe = onSnapshot(collection(db, "deliveries"), onResult, onError)

    return unsubscribe;
  }, [])
  
  return (
    <div>
      <h1>Deliveries</h1>
      {deliveries.length ? deliveries.map(delivery => <Delivery key={delivery.id} delivery={delivery.data} />) : (<p className="col-span-3">There are no deliveries.</p>)}
    </div>
  );
};

export default DeliveriesScreen;
