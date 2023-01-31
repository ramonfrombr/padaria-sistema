import React, { FC, useRef, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const CreateProduct: FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [newProductName, setNewProductName] = useState<string>("");
  const [newProductDescription, setNewProductDescription] =
    useState<string>("");
  const [newProductImage, setNewProductImage] = useState<string>("");
  const [newProductPrice, setNewProductPrice] = useState<number>(0);
  const priceInput = useRef<HTMLInputElement>(null);

  const handleCreateNewProduct = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    await addDoc(collection(db, "products"), {
      name: newProductName,
      price: newProductPrice,
      description: newProductDescription,
      image: newProductImage,
    })
      .then(() => {
        alert(`Product ${newProductName} created.`);
      })
      .catch((error) => alert("Error: " + error))
      .finally(() => {
        setNewProductName("");
        setNewProductPrice(0);
        priceInput.current!.value = "0";
        setNewProductImage("");
      });
  };

  return (
    <div className="mx-1 my-2 border-2 bg-slate-200 p-3">
      <div
        onClick={() => setShowForm((prev) => !prev)}
        className="flex cursor-pointer items-center justify-between"
      >
        <h1 className="mb-0">Criar Produto</h1>
        <div className="h-fit rounded bg-slate-300 p-1">
          {showForm ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleCreateNewProduct} className="mt-3 bg-white p-2">
          <div className="mb-1 flex flex-col border bg-gray-50 p-1">
            <label htmlFor="newProductName">Nome do Produto</label>
            <input
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
              type="text"
              name="newProductName"
              id="newProductName"
              className="rounded p-1"
            />
          </div>

          <div className="mb-1 flex flex-col border bg-gray-50 p-1">
            <label htmlFor="newProductName">Descrição do Produto</label>
            <input
              value={newProductDescription}
              onChange={(e) => setNewProductDescription(e.target.value)}
              type="text"
              name="newProductDescription"
              id="newProductDescription"
              className="rounded p-1"
            />
          </div>

          <div className="mb-2 flex flex-col border bg-gray-50 p-1">
            <label htmlFor="newProductPrice">Preço do Produto</label>
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
            <label htmlFor="newProductName">Imagem do Produto</label>
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
            Criar Produto
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateProduct;
