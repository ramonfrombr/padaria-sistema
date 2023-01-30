// Libraries
import React, { useEffect, useState } from "react";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

// Components
import CreateProduct from "../components/CreateProduct";
import ListOfProducts from "../components/ListOfProducts";

const ProductsScreen = () => {
  
  const [products, setProducts] = useState<IProduct[]>([])

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
    <div className="sm:w-3/4 mx-auto pt-12 px-8">
      <h1>Produtos</h1>
      <CreateProduct />
      <ListOfProducts products={products} />
    </div>
  );
};

export default ProductsScreen;
