import React, { FC, useRef, useState } from "react";
import { addDoc, collection } from "firebase/firestore"; 
import { db } from "../firebase";
import {
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";



const CreateProduct: FC = () => {
  const [showForm, setShowForm] = useState(false)
  const [newProductName, setNewProductName] = useState<string>("");
  const [newProductImage, setNewProductImage] = useState<string>("");
  const [newProductPrice, setNewProductPrice] = useState<number>(0);
  const priceInput = useRef<HTMLInputElement>(null);

  const handleCreateNewProduct = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    await addDoc(collection(db, "products"), {
      name: newProductName,
      price: newProductPrice,
      image: newProductImage
    })
    .then(() => {
      alert(`Product ${newProductName} created.`)})
    .catch(error => alert("Error: "+ error))
    .finally(() => {
      setNewProductName("");
      setNewProductPrice(0);
      priceInput.current!.value = "0";
      setNewProductImage("");
    });
  };

  return (
    <div className="mx-1 my-2 border-2 bg-slate-200 p-3">

      <div onClick={() => setShowForm(prev => !prev)} className="cursor-pointer flex items-center justify-between">
        <h1 className="mb-0">Create Product</h1>
        <div className="rounded bg-slate-300 p-1 h-fit">
          {showForm ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>
      
      {showForm && (
      <form onSubmit={handleCreateNewProduct} className="bg-white p-2 mt-3">
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

        <div className="mb-1 flex flex-col border bg-gray-50 p-1">
          <label htmlFor="newProductName">Product Image</label>
          <input
            value={newProductImage}
            onChange={(e) => setNewProductImage(e.target.value)}
            type="text"
            name="newProductImage"
            id="newProductImage"
            className="rounded p-1"
          />
        </div>

        <button className="rounded border border-blue-800 bg-blue-400 p-2 font-bold text-white">
          Create Product
        </button>
      </form>
      )}
    </div>
  );
};

export default CreateProduct;
