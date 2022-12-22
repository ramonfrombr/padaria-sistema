import React, { FC, useRef, useState } from "react";
import { Dispatch } from "redux";
import { v4 as uuidv4 } from "uuid";
import { createProduct } from "../state/action-creators";
import { ProductAction } from "../state/actions";
import { IProduct } from "../typings";
import { MutableRefObject } from "react";

interface CreateProductProps {
  createProduct: (
    product: IProduct
  ) => (dispatch: Dispatch<ProductAction>) => void;
}

const CreateProduct: FC<CreateProductProps> = ({
  createProduct,
}: CreateProductProps) => {
  const [newProductName, setNewProductName] = useState<string>("");
  const [newProductPrice, setNewProductPrice] = useState<number>(0);
  const priceInput = useRef<HTMLInputElement>(null);

  const handleCreateNewProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newProduct: IProduct = {
      id: uuidv4(),
      name: newProductName,
      price: newProductPrice,
    };

    createProduct(newProduct);
    setNewProductName("");
    if (priceInput.current) {
      priceInput.current.value = "";
    }
  };

  return (
    <div className="mx-1 my-2 border-2 bg-slate-200 p-3">
      <h1>Create Product</h1>

      <form onSubmit={handleCreateNewProduct} className="bg-white p-2">
        <div className="mb-1 flex flex-col border bg-gray-50 p-1">
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

        <div className="mb-2 flex flex-col border bg-gray-50 p-1">
          <label htmlFor="newProductPrice">Product Price</label>
          <input
            onChange={(e) => setNewProductPrice(Number(e.target.value))}
            ref={priceInput}
            type="number"
            step="0.01"
            name="newProductPrice"
            id="newProductPrice"
          />
        </div>

        <button className="rounded border border-blue-800 bg-blue-400 p-2 font-bold text-white">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
