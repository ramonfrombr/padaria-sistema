// Libraries
import React, { useEffect, useState } from "react";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

// Components
import CreateProduct from "../components/admin/CreateProduct";
import ListOfProducts from "../components/admin/ListOfProducts";
import { Heading } from "@aprendaagora/simple-react-component-library";

const ProductsScreen = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

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
      <Heading text="Produtos" level={3} />
      <CreateProduct />
      <ListOfProducts products={products} />
    </div>
  );
};

export default ProductsScreen;
