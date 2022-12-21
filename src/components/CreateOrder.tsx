import React, { FC, useState } from "react";
import {
  FaCheck,
  FaTimes,
  FaPlus,
  FaClock,
  FaCalendar,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { currencyFormatter, IOrder, IOrderItem, IProduct } from "../App";
import { v4 as uuidv4 } from "uuid";
import { TbTruckDelivery } from "react-icons/tb";

interface CreateOrderProps {
  products: IProduct[];
  setOrders: React.Dispatch<React.SetStateAction<IOrder[]>>;
}

const CreateOrder: FC<CreateOrderProps> = ({
  products,
  setOrders,
}: CreateOrderProps) => {
  const [currentOrderItems, setCurrentOrderItems] = useState<IOrderItem[]>([]);
  const [currentOrderForDelivery, setCurrentOrderForDelivery] =
    useState<boolean>(false);

  const [currentSelectedProductId, setCurrentSelectedProductId] =
    useState<string>(products[0].id);
  const [numberCurrentSelectedProduct, setNumberCurrentSelectedProduct] =
    useState<number>(1);

  const [currentOrderComment, setCurrentOrderComment] = useState<string>("");
  const [currentOrderClientName, setCurrentOrderClientName] =
    useState<string>("anonymous client");

  const handleAddProductToOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const productName = products.filter(
      (product) => product.id === currentSelectedProductId
    )[0].name;
    const productPrice = products.filter(
      (product) => product.id === currentSelectedProductId
    )[0].price;

    const newItem: IOrderItem = {
      item: {
        id: currentSelectedProductId,
        name: productName,
        price: productPrice,
      },
      quantity: numberCurrentSelectedProduct,
    };

    setCurrentOrderItems((currentItems) => [...currentItems, newItem]);

    // Reset order item form
    setNumberCurrentSelectedProduct((value) => 1);
  };

  const handleCreateNewOrder = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const attendantName = "Ramon";

    const newOrder: IOrder = {
      id: uuidv4(),
      items: currentOrderItems,
      registerDate: new Date(),
      attendant: attendantName,
      client: currentOrderClientName,
      forDelivery: currentOrderForDelivery,
      totalValue: currentOrderItems.reduce(
        (accumulator, currentItem) =>
          accumulator + currentItem.item.price * currentItem.quantity,
        0
      ),
      comment: currentOrderComment,
    };

    setOrders((currentOrders) => [...currentOrders, newOrder]);

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
            defaultValue={products[0].id}
            onChange={(e) => setCurrentSelectedProductId(e.target.value)}
            className="mr-1 flex-1 rounded"
          >
            {products.map((product, idx) => (
              <option key={product.id} value={product.id}>
                {product.name}
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

        <button className="flex w-10 items-center justify-center rounded bg-green-600 p-1 font-bold text-white">
          <FaPlus />
        </button>
      </form>

      <div className="mt-5 mb-3 border-2 bg-slate-50 p-2">
        <h2>Order Items</h2>

        {currentOrderItems.map((orderItem, idx) => (
          <div key={idx} className="mb-1 rounded border bg-white p-1">
            {orderItem.item.name}{" "}
            {currencyFormatter.format(orderItem.item.price)} x{" "}
            {orderItem.quantity} ={" "}
            {currencyFormatter.format(
              orderItem.item.price * orderItem.quantity
            )}
          </div>
        ))}

        <div className="my-5">
          <span className="mr-3 text-lg">Total:</span>

          <span className="text-2xl font-bold">
            {currencyFormatter.format(
              currentOrderItems.reduce(
                (accumulator, currentItem) =>
                  accumulator + currentItem.item.price * currentItem.quantity,
                0
              )
            )}
          </span>
        </div>

        <button
          onClick={() => setCurrentOrderForDelivery((prev) => !prev)}
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
              className="w-full border-2 p-1"
              name=""
              id=""
              rows={1}
            ></textarea>

            <div className="flex flex-col">
              <span className="text-lg">Client's Name</span>
              <input
                className="border-2 p-1"
                onChange={(e) => setCurrentOrderClientName(e.target.value)}
                type="text"
                name=""
                id=""
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
