import React, { FC, useState } from "react";
import { FaPen } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { IProduct } from "../typings";
import { currencyFormatter } from "../utils";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionsCreators, State } from "../state";

interface ProductProps {
  product: IProduct;
}

const Product: FC<ProductProps> = ({ product }: ProductProps) => {
  const dispatch = useDispatch();

  const [currentName, setCurrentName] = useState(product.name);
  const [currentPrice, setCurrentPrice] = useState(product.price);

  const [newName, setNewName] = useState(product.name);
  const [newPrice, setNewPrice] = useState(product.price);

  const [inputsEnabled, setInputsEnabled] = useState<boolean>(false);

  const { deleteProduct, editProduct } = bindActionCreators(
    actionsCreators,
    dispatch
  );

  const handleCancelEditing = () => {
    setNewName(product.name);
    setNewPrice(product.price);
    setInputsEnabled(false);
  };

  const saveEdit = () => {
    editProduct({ id: product.id, name: newName, price: newPrice });
    setInputsEnabled(false);
    window.alert("The product info was saved");
  };

  return (
    <React.Fragment>
      <input
        disabled={!inputsEnabled}
        onChange={(e) => setNewName(e.target.value)}
        value={newName}
        type="text"
        className="!text-black"
      />
      <input
        disabled={!inputsEnabled}
        value={newPrice}
        onChange={(e) => setNewPrice(Number(e.target.value))}
        step="0.01"
        type="number"
        name=""
        id=""
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
            <span
              className="bg-red-600"
              onClick={() => deleteProduct(product.id)}
            >
              <MdDeleteForever /> Delete
            </span>
          </>
        )}
      </span>
    </React.Fragment>
  );
};

export default Product;
