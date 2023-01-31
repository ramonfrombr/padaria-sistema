import React, { FC, useState } from "react";
import { FaCheck, FaTimes, FaPlus } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { currencyFormatter } from "../../utils";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import axios from "axios";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface CreateOrderProps {
  products: IProduct[];
}

const CreateOrder: FC<CreateOrderProps> = ({ products }: CreateOrderProps) => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [items, setItems] = useState<IOrderItem[]>([]);
  const [forDelivery, setForDelivery] = useState<boolean>(false);

  const [selectedProductId, setSelectedProductId] = useState<string>("0");
  const [numberSelectedProduct, setNumberSelectedProduct] = useState<number>(1);

  const [comment, setComment] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [deliveryAddress, setDeliveryAddress] = useState<string>("");
  const [alreadyPaid, setAlreadyPaid] = useState(false);

  const GOOGLE_BASE_URL =
    "https://maps.googleapis.com/maps/api/geocode/json?address=";

  const handleAddProductToOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (products.length) {
      const productName = products.filter(
        (product) => product.id === selectedProductId
      )[0].data.name;

      const productPrice = products.filter(
        (product) => product.id === selectedProductId
      )[0].data.price;

      const newItem: IOrderItem = {
        productName,
        productPrice,
        productImage: "",
        quantity: numberSelectedProduct,
      };

      setItems((currentItems) => [...currentItems, newItem]);
    } else {
      window.alert("No product selected.");
    }

    // Reset order item form
    setNumberSelectedProduct(1);
  };

  const toggleForDeliveryButton = () => {
    setClientName("");
    setClientPhone("");
    setDeliveryAddress("");
    setComment("");
    setForDelivery((prev) => !prev);
  };

  const handleCreateNewOrder = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const attendantName = "Ramon";

    const newOrder: IOrder = {
      attendantName,
      clientName,
      comment,
      date: serverTimestamp(),
      deliveryId: "",
      forDelivery,
      items,
    };

    const docRef = await addDoc(collection(db, "orders"), newOrder);
    console.log("Document written: ", docRef);

    if (forDelivery) {
      //https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=

      const GOOGLE_GEOCODING_API_URL = `${GOOGLE_BASE_URL}${deliveryAddress.replace(
        / /g,
        "+"
      )}+Serra+ES&key=${process.env.REACT_APP_GOOGLE_MAPS_API}`;

      console.log(GOOGLE_GEOCODING_API_URL);

      let deliveryCoordinates = { lat: 0, lng: 0 };

      axios
        .get(GOOGLE_GEOCODING_API_URL)
        .then(async (response) => {
          // handle success
          console.log(response.data.results[0]);
          deliveryCoordinates = response.data.results[0].geometry.location;

          const newDelivery: IDelivery = {
            coordinates: {
              latitude: deliveryCoordinates.lat,
              longitude: deliveryCoordinates.lng,
            },
            address: deliveryAddress,
            clientName,
            clientPhone,
            orderItems: items,
            alreadyPaid,
            alreadyDelivered: false,
            deliveryDate: serverTimestamp(),
            orderId: docRef.id,
            details: comment,
          };

          // Add a new document with a generated id.
          const deliveryRef = await addDoc(
            collection(db, "deliveries"),
            newDelivery
          );
          console.log("Document written with ID: ", deliveryRef.id);

          navigate("/admin/deliveries");
        })
        .catch(function (error) {
          // handle error
          alert("Couldn't finish the order!");
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    }

    setForDelivery(false);
    setComment("");
    setClientName("");
    setItems([]);
  };

  return (
    <div className="mx-1 my-2 border-2 bg-gray-100 p-3">
      <div
        onClick={() => setShowForm((prev) => !prev)}
        className="flex cursor-pointer items-center justify-between"
      >
        <h1 className="mb-0">Criar Pedido</h1>
        <div className="h-fit rounded bg-slate-300 p-1">
          {showForm ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>

      {showForm && (
        <>
          <form
            onSubmit={handleAddProductToOrder}
            className="mt-3 flex justify-between bg-white p-3"
          >
            <div className="flex w-full justify-between">
              <select
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="mr-1 flex-1 rounded"
              >
                <option key={"0"} value={"0"}>
                  Escolha um produto
                </option>
                {products.map((product, idx) => (
                  <option key={product.id} value={product.id}>
                    {product.data.name}
                  </option>
                ))}
              </select>

              <input
                onChange={(e) =>
                  setNumberSelectedProduct(Number(e.target.value))
                }
                value={numberSelectedProduct}
                min="1"
                type="number"
                name="nProduct"
                id="nProduct"
                className="mr-1 w-[60px] border border-slate-300 bg-slate-100 p-1 pl-5"
              />
            </div>

            <button
              type="submit"
              disabled={selectedProductId === "0" ? true : false}
              className={`flex w-10 items-center justify-center rounded  p-1 font-bold text-white ${
                selectedProductId === "0" ? "bg-gray-500" : "bg-green-600"
              }`}
            >
              <FaPlus />
            </button>
          </form>

          <div className="mt-5 mb-3 border-2 bg-slate-50 p-2">
            <h2>Itens do Pedido</h2>

            {items.map((orderItem, idx) => (
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
                  items.reduce(
                    (accumulator, currentItem) =>
                      accumulator +
                      currentItem.productPrice * currentItem.quantity,
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
              <span className="mx-2">Para Entrega</span>

              {forDelivery ? (
                <FaCheck color="green" />
              ) : (
                <FaTimes color="red" />
              )}
            </button>

            {forDelivery && (
              <>
                <div className="flex flex-col">
                  <label className="mt-2 text-lg" htmlFor="comment">
                    Detalhes da Entrega
                  </label>
                  <textarea
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                    className="w-full border-2 p-1"
                    rows={1}
                    name="comment"
                  ></textarea>
                </div>

                <div className="flex flex-col">
                  <label className="mt-2 text-lg" htmlFor="clientName">
                    Nome do Cliente
                  </label>
                  <input
                    className="border-2 p-1"
                    onChange={(e) => setClientName(e.target.value)}
                    value={clientName}
                    type="text"
                    name="clientName"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mt-2 text-lg" htmlFor="clientPhone">
                    Telefone do Cliente
                  </label>
                  <input
                    className="border-2 p-1"
                    onChange={(e) => setClientPhone(e.target.value)}
                    value={clientPhone}
                    type="text"
                    name="clientPhone"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mt-2 text-lg" htmlFor="deliveryAddress">
                    Endereço de Entrega
                  </label>
                  <input
                    className="border-2 p-1"
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    value={deliveryAddress}
                    type="text"
                    name="deliveryAddress"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mt-2 text-lg" htmlFor="alreadyPaid">
                    Pedido já pago
                  </label>
                  <input
                    onChange={() => {
                      setAlreadyPaid((prev) => !prev);
                    }}
                    type="checkbox"
                    name="alreadyPaid"
                    id="alreadyPaid"
                    className="m-2 scale-[2] self-start"
                  />
                </div>
              </>
            )}
          </div>

          <button
            onClick={(e) =>
              !items.length
                ? alert("Add items to the order before submitting")
                : window.confirm("Confirm order?") && handleCreateNewOrder(e)
            }
            className={`bg-green-500 p-2 text-lg text-white ${
              !items.length && "bg-slate-400"
            }`}
          >
            Criar Pedido
          </button>
        </>
      )}
    </div>
  );
};

export default CreateOrder;
