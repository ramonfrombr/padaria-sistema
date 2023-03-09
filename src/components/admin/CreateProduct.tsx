import React, { FC, useRef, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import {
  Heading,
  FormGroup,
  Button,
} from "@aprendaagora/simple-react-component-library";

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
        setNewProductDescription("");
        setNewProductPrice(0);
        priceInput.current!.value = "0";
        setNewProductImage("");
      });
  };

  return (
    <div className="mx-1 my-2 border bg-white p-3">
      <div
        onClick={() => setShowForm((prev) => !prev)}
        className="flex cursor-pointer items-center justify-between"
      >
        <Heading text="Criar Produto" level={5} />
        <div className="h-fit rounded bg-slate-300 p-1">
          {showForm ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleCreateNewProduct} className="mt-3 bg-white p-2">
          <FormGroup
            value={newProductName}
            onChange={setNewProductName}
            label="Nome do Produto"
            name="newProductName"
            className="mb-3"
          />

          <FormGroup
            value={newProductDescription}
            onChange={setNewProductDescription}
            label="Descrição do Produto"
            name="newProductDescription"
            className="mb-3"
          />

          <div className="mb-2 flex flex-col">
            <label htmlFor="newProductPrice">Preço do Produto</label>
            <input
              onChange={(e) => setNewProductPrice(Number(e.target.value))}
              ref={priceInput}
              type="number"
              step="0.01"
              name="newProductPrice"
              id="newProductPrice"
              className="rounded border p-1"
            />
          </div>

          <FormGroup
            value={newProductImage}
            onChange={setNewProductImage}
            label="Imagem do Produto"
            name="newProductImage"
            className="mb-3"
          />

          <Button className="rounded p-1" type="primary" text="Criar produto" />
        </form>
      )}
    </div>
  );
};

export default CreateProduct;
