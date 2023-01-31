// Libraries
import React, { useEffect, useState } from "react";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const Products = () => {
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
    <div
      className="min-h-screen bg-white text-black"
      style={{ padding: "5rem calc((100vw - 1300px) / 2)" }}
    >
      {/* Heading */}
      <h1
        className="mb-20 text-center"
        style={{ fontSize: "clamp(3rem, 2.5vw, 3rem)" }}
      >
        Escolha seu Produto
      </h1>

      {/* Products Wrapper */}
      <div className="my-0 mx-auto flex flex-wrap justify-center">
        {products.map((product) => (
          <div className="my-0 mx-8 w-72 leading-loose" key={product.id}>
            <div className="h-72 w-72" style={{ boxShadow: "8px 8px #fdc500" }}>
              <img
                className="h-full w-full object-cover"
                src={product.data.image}
                alt={product.data.name}
              />
            </div>

            <div className="flex flex-col items-center justify-center p-8 text-center">
              <h2 className="text-2xl font-normal">{product.data.name}</h2>
              {/* Description!! */}
              <p className="mb-4">{product.data.name}</p>
              <p className="mb-4 text-3xl">R${product.data.price}</p>

              <div className="cursor-pointer border-0 bg-[#e31837] py-4 px-16 text-base text-white duration-200 ease-out hover:bg-[#ffc500] hover:text-black">
                Adicionar ao carrinho
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
