import React, { FC } from "react";
import { currencyFormatter, IProduct } from "../App";

interface ListOfProductsProps {
  products: IProduct[];
}

const ListOfProducts: FC<ListOfProductsProps> = ({
  products,
}: ListOfProductsProps) => {
  return (
    <div className="mx-1 my-2 border-2 bg-gray-50 p-3">
      <h1>List Of Products</h1>
      <div className="grid grid-cols-2">
        <span className="font-bold">Name</span>
        <span className="font-bold">Price</span>
        {products.map((product, idx) => (
          <React.Fragment key={idx}>
            <span>{product.name}</span>
            <span>{currencyFormatter.format(product.price)}</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ListOfProducts;
