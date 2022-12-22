import React, { FC } from "react";
import { Dispatch } from "redux";
import { IProduct } from "../typings";
import { ProductAction } from "../state/actions";
import { currencyFormatter } from "../utils";
import { FaPen } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Product from "./Product";

interface ListOfProductsProps {
  products: IProduct[];
  deleteProduct: (
    productId: string
  ) => (dispatch: Dispatch<ProductAction>) => void;
}

const ListOfProducts: FC<ListOfProductsProps> = ({
  products,
  deleteProduct,
}: ListOfProductsProps) => {
  return (
    <div className="mx-1 my-2 border-2 bg-slate-200 p-3">
      <h1>List of Products</h1>
      <div className="grid grid-cols-3 gap-1 [&>span]:self-center">
        {products.length ? (
          <>
            <span className="font-bold">Name</span>
            <span className="font-bold">Price (R$)</span>
            <span className="font-bold">Options</span>
            {products.map((product, idx) => (
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
