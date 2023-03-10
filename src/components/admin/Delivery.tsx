import React, { useState } from "react";
import { FaCalendarCheck, FaMapMarkerAlt } from "react-icons/fa";

interface DeliveryProps {
  delivery: IDelivery;
}

const Delivery = ({ delivery }: DeliveryProps) => {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div
      onClick={() => setShowInfo((prev) => !prev)}
      className={`mb-2 cursor-pointer rounded border  p-3 ${
        delivery.alreadyDelivered ? "bg-green-200" : "bg-white"
      }`}
    >
      <div className="flex flex-wrap">
        <span className="mr-2 flex items-center">
          <FaCalendarCheck className="mr-1" />{" "}
          {new Date(delivery.deliveryDate.toDate()).toLocaleString()}
        </span>

        <span className="mr-2 flex items-center">
          <FaMapMarkerAlt className="mr-1" /> {delivery.address}
        </span>

        <span
          className={`${
            delivery.alreadyPaid ? "bg-green-500" : "bg-red-500"
          } rounded p-1 font-bold text-white`}
        >
          {delivery.alreadyPaid ? "Pago" : "Não Pago"}
        </span>
      </div>

      {showInfo && (
        <div className="mt-3 bg-white p-1">
          <div className="mb-3 p-2">
            <p className="mb-2 text-center text-lg">Itens</p>
            <div className="grid grid-cols-3">
              <span className="font-bold">
                Produto ({delivery.orderItems.length})
              </span>
              <span className="font-bold">Quantidade</span>
              <span className="font-bold">Preço</span>
              {delivery.orderItems.map((item, idx) => (
                <React.Fragment key={idx}>
                  <span>{item.productName}</span>
                  <span>{item.quantity}</span>
                  <span>{item.productPrice}</span>
                </React.Fragment>
              ))}
            </div>
          </div>
          <hr />
          <ul className="mt-3 p-2">
            <li>
              <b>Endereço:</b> {delivery.address}
            </li>
            <li>
              <b>Nome do Cliente:</b> {delivery.clientName}
            </li>
            <li>
              <b>Telefone do Cliente:</b> {delivery.clientPhone}
            </li>
            <li>
              <b>Pedido Entregue?</b>{" "}
              {delivery.alreadyDelivered ? "Sim" : "Não"}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Delivery;
