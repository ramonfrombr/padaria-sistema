import React, { FC, useLayoutEffect } from "react";
import Product from "./Product";

interface ListOfProductsProps {
  products: IProduct[];
}

const ListOfProducts: FC<ListOfProductsProps> = ({
  products,
  /*deleteProduct,*/
}: ListOfProductsProps) => {

  return (
    <div className="mx-1 my-2 border-2 bg-slate-200 p-3">
      <h1>List of Products</h1>

      <p>Number of Products: {products.length}</p>
      <div className="grid grid-cols-4 gap-1 [&>span]:self-center">
        {products.length ? (
          <>
            <span className="font-bold">Image</span>
            <span className="font-bold p-2">Name</span>
            <span className="font-bold p-2">Price (R$)</span>
            <span className="font-bold">Options</span>
            {products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </>
        ) : (
          <p className="col-span-3">There are no products in your store</p>
        )}
      </div>
    </div>
  );
};

export default ListOfProducts;
