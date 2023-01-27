import React, { FC, useEffect, useState } from "react";
import {
  FaCheck,
  FaTimes,
  FaPlus,
} from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { currencyFormatter } from "../utils";
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { db } from "../firebase";

interface CreateOrderProps {
  products: IProduct[];
}

const CreateOrder: FC<CreateOrderProps> = ({
  products,
}: CreateOrderProps) => {

  const [currentOrderItems, setCurrentOrderItems] = useState<IOrderItem[]>([]);
  const [currentOrderForDelivery, setCurrentOrderForDelivery] =
    useState<boolean>(false);

  const [currentSelectedProductId, setCurrentSelectedProductId] =
    useState<string>("0");
  const [numberCurrentSelectedProduct, setNumberCurrentSelectedProduct] =
    useState<number>(1);

  const [currentOrderComment, setCurrentOrderComment] = useState<string>("");
  const [currentOrderClientName, setCurrentOrderClientName] =
    useState<string>("");
  const [currentOrderClientPhone, setCurrentOrderClientPhone] =
    useState<string>("");
  const [currentOrderDeliveryAddress, setCurrentOrderDeliveryAddress] =
    useState<string>("");


  const handleAddProductToOrder = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    if (products.length) {

      const productName = products.filter(
        (product) => product.id === currentSelectedProductId
      )[0].data.name;

      const productPrice = products.filter(
        (product) => product.id === currentSelectedProductId
      )[0].data.price;

      const newItem: IOrderItem = {
        productName,
        productPrice,
        productImage: "",
        quantity: numberCurrentSelectedProduct,
      };

      setCurrentOrderItems((currentItems) => [...currentItems, newItem]);
    } else {
      window.alert("No product selected.");
    }

    // Reset order item form
    setNumberCurrentSelectedProduct(1);
  };

  const toggleForDeliveryButton = () => {
    setCurrentOrderClientName("");
    setCurrentOrderClientPhone("");
    setCurrentOrderDeliveryAddress("");
    setCurrentOrderComment("");
    setCurrentOrderForDelivery((prev) => !prev)
  }

  const handleCreateNewOrder = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const attendantName = "Ramon";


    const newOrder: IOrder = {
      attendantName: attendantName,
      clientName: currentOrderClientName,
      comment: currentOrderComment,
      date: serverTimestamp(),
      deliveryId: "",
      forDelivery: currentOrderForDelivery,
      items: currentOrderItems,
    };

    
    if (!currentOrderForDelivery) {
      console.log(newOrder);
      
      const docRef = await addDoc(collection(db, "orders"), newOrder);

      console.log("Document written with ID: ", docRef.id);
    } else {
      alert("Delivery registration not implemented")
    }

    setCurrentOrderForDelivery(false);
    setCurrentOrderComment("");
    setCurrentOrderClientName("");
    setCurrentOrderItems([]);
  };

  return (
    <div className="mx-1 my-2 border-2 bg-gray-100 p-3">
      <h1>Create Order</h1>
      <form
        onSubmit={handleAddProductToOrder}
        className="flex justify-between bg-white p-3"
      >
        <div className="flex w-full justify-between">
          <select
            defaultValue={products[0]?.id}
            onChange={(e) => setCurrentSelectedProductId(e.target.value)}
            className="mr-1 flex-1 rounded"
          >
            <option key={"0"} value={"0"}>
              Choose a product
            </option>
            {products.map((product, idx) => (
              <option key={product.id} value={product.id}>
                {product.data.name}
              </option>
            ))}
          </select>

          <input
            onChange={(e) =>
              setNumberCurrentSelectedProduct(Number(e.target.value))
            }
            value={numberCurrentSelectedProduct}
            min="1"
            type="number"
            name="nProduct"
            id="nProduct"
            className="mr-1 w-[60px] border border-slate-300 bg-slate-100 p-1 pl-5"
          />
        </div>

        <button type="submit" disabled={currentSelectedProductId === "0" ? true : false} className={`flex w-10 items-center justify-center rounded  p-1 font-bold text-white ${currentSelectedProductId === "0" ? 'bg-gray-500' : 'bg-green-600'}`}>
          <FaPlus />
        </button>
      </form>

      <div className="mt-5 mb-3 border-2 bg-slate-50 p-2">
        <h2>Order Items</h2>

        {currentOrderItems.map((orderItem, idx) => (
          <div key={idx} className="mb-1 rounded border bg-white p-1">
            {orderItem.productName}{" "}
            {currencyFormatter.format(orderItem.productPrice)} x{" "}
            {orderItem.quantity} ={" "}
            {currencyFormatter.format(
              orderItem.productPrice * orderItem.quantity
            )}
          </div>
        ))}

        <div className="my-5">
          <span className="mr-3 text-lg">Total:</span>

          <span className="text-2xl font-bold">
            {currencyFormatter.format(
              currentOrderItems.reduce(
                (accumulator, currentItem) =>
                  accumulator + currentItem.productPrice * currentItem.quantity,
                0
              )
            )}
          </span>
        </div>

        <button
          onClick={toggleForDeliveryButton}
          className="flex items-center justify-center rounded border-2 bg-white p-2"
        >
          <TbTruckDelivery size={"1.5em"} />
          <span className="mx-2">For Delivery</span>

          {currentOrderForDelivery ? (
            <FaCheck color="green" />
          ) : (
            <FaTimes color="red" />
          )}
        </button>

        {currentOrderForDelivery && (
          <>
            <span className="text-lg">Comment</span>
            <textarea
              onChange={(e) => setCurrentOrderComment(e.target.value)}
              value={currentOrderComment}
              className="w-full border-2 p-1"
              rows={1}
            ></textarea>

            <div className="flex flex-col">
              <span className="text-lg">Client's Name</span>
              <input
                className="border-2 p-1"
                onChange={(e) => setCurrentOrderClientName(e.target.value)}
                value={currentOrderClientName}
                type="text"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-lg">Client's Phone</span>
              <input
                className="border-2 p-1"
                onChange={(e) => setCurrentOrderClientPhone(e.target.value)}
                value={currentOrderClientPhone}
                type="text"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-lg">Delivery Address</span>
              <input
                className="border-2 p-1"
                onChange={(e) => setCurrentOrderDeliveryAddress(e.target.value)}
                value={currentOrderDeliveryAddress}
                type="text"
              />
            </div>
          </>
        )}
      </div>

      <button
        onClick={(e) =>
          !currentOrderItems.length
            ? alert("Add items to the order before submitting")
            : window.confirm("Confirm order?") && handleCreateNewOrder(e)
        }
        className={`bg-green-500 p-2 text-lg text-white ${
          !currentOrderItems.length && "bg-slate-400"
        }`}
      >
        Create Order
      </button>
    </div>
  );
};

export default CreateOrder;
