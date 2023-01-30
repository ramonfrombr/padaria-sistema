import React, { FC, useState } from "react";
import { FaPen } from "react-icons/fa";
import placeholder from '../assets/images/placeholder.png'
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

interface ProductProps {
  product: IProduct;
}

const Product: FC<ProductProps> = ({ product }: ProductProps) => {
  const [newName, setNewName] = useState(product.data.name);
  const [newPrice, setNewPrice] = useState(product.data.price);
  const [inputsEnabled, setInputsEnabled] = useState<boolean>(false);

  const handleCancelEditing = () => {
    setNewName(product.data.name);
    setNewPrice(product.data.price);
    setInputsEnabled(false);
  };

  const saveEdit = async () => {
    const productRef = doc(db, 'products', product.id);
    await updateDoc(productRef, {
      name: newName,
      price: newPrice,
    })
    setInputsEnabled(false);
    window.alert("The product info was saved");
  };

  return (
    <React.Fragment>
      <img className="w-16" src={product.data.image ? product.data.image : placeholder} alt="" />
      <input
        disabled={!inputsEnabled}
        onChange={(e) => setNewName(e.target.value)}
        value={newName}
        type="text"
        className="!text-black h-fit p-2 self-center"
      />
      <input
        disabled={!inputsEnabled}
        value={newPrice}
        onChange={(e) => setNewPrice(Number(e.target.value))}
        step="0.01"
        type="number"
        name=""
        id=""
        className="h-fit p-2 self-center"
      />
      {/** 
      <span>{product.name}</span>
      <span>{currencyFormatter.format(product.price)}</span>
      */}
      <span className="flex [&>span]:mr-2 [&>span]:flex [&>span]:cursor-pointer [&>span]:items-center [&>span]:rounded [&>span]:border [&>span]:border-white [&>span]:p-1 [&>span]:font-bold [&>span]:text-white">
        {inputsEnabled ? (
          <>
            <span className="bg-green-600" onClick={() => saveEdit()}>
              <FaPen /> Save
            </span>

            <span className="bg-gray-600" onClick={() => handleCancelEditing()}>
              <FaPen /> Cancel
            </span>
          </>
        ) : (
          <>
            <span
              className="bg-blue-600"
              onClick={() => setInputsEnabled(true)}
            >
              <FaPen /> Edit
            </span>

          </>
        )}
      </span>
    </React.Fragment>
  );
};

export default Product;
