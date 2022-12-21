import React, { FC, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { IProduct } from "../App";

interface CreateProductProps {
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

const CreateProduct: FC<CreateProductProps> = ({
  setProducts,
}: CreateProductProps) => {
  const [newProductName, setNewProductName] = useState<string>("");
  const [newProductPrice, setNewProductPrice] = useState<number>(0);

  const handleCreateNewProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newProduct: IProduct = {
      id: uuidv4(),
      name: newProductName,
      price: newProductPrice,
    };

    setProducts((currentList) => [...currentList, newProduct]);
  };

  return (
    <div className="bg-slate-50 p-3 border-2 mx-1 my-2">
      <h1>Create Product</h1>

      <form onSubmit={handleCreateNewProduct} className="bg-white p-2">
        <div className="flex flex-col border bg-gray-50 p-1 mb-1">
          <label htmlFor="newProductName">Product Name</label>
          <input
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}
            type="text"
            name="newProductName"
            id="newProductName"
            className="rounded p-1"
          />
        </div>

        <div className="flex flex-col border bg-gray-50 p-1 mb-2">
          <label htmlFor="newProductPrice">Product Price</label>
          <input
            onChange={(e) => setNewProductPrice(Number(e.target.value))}
            type="number"
            step="0.01"
            name="newProductPrice"
            id="newProductPrice"
          />
        </div>

        <button className="p-2 bg-blue-400 rounded text-white font-bold border-blue-800 border">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
