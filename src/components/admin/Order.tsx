import React, { FC, useState } from "react";
import {
  FaClock,
  FaCalendar,
  FaChevronDown,
  FaChevronUp,
  FaShoppingCart,
} from "react-icons/fa";

import { TbTruckDelivery } from "react-icons/tb";
import { BiMoney } from "react-icons/bi";
import { GrNotes } from "react-icons/gr";
import { BsPersonFill } from "react-icons/bs";
import { currencyFormatter } from "../../utils";
import { calculateOrderTotal } from "../../utils";

interface OrderProps {
  order: IOrder;
}

const Order: FC<OrderProps> = ({ order }: OrderProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="mb-4 cursor-pointer rounded border bg-gray-50 p-1">
      <div
        className="flex items-center justify-between"
        onClick={() => setShowDetails((prev) => !prev)}
      >
        <div className="flex flex-wrap items-center gap-1">
          {/* ORDER DATE */}
          <div className="mr-2 flex flex-wrap items-center border bg-white p-1">
            <FaClock className="mr-2" />
            <span className="mr-2">
              {new Date(order?.date?.toDate()).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>

            <FaCalendar className="mr-2" />
            {new Date(order?.date?.toDate()).toLocaleDateString("pt-BR")}
          </div>

          {/* ITEM QUANTITY */}
          <div className="mr-2 flex items-center border bg-white p-1">
            <FaShoppingCart className="mr-1" />
            {order.items.length} itens
          </div>

          {/* TOTAL */}
          <div className="mr-2 flex items-center border bg-white p-1">
            <BiMoney className="mr-1" />
            Total:{" "}
            {currencyFormatter.format(
              order.items.reduce(
                (accumulator: number, currentItem: IOrderItem) =>
                  accumulator + currentItem.productPrice * currentItem.quantity,
                0
              )
            )}
          </div>

          {order.forDelivery && (
            <div className="flex items-center border bg-blue-500 p-1 font-bold text-white">
              <TbTruckDelivery className="mr-1" /> Para Entrega
            </div>
          )}
        </div>

        <div className="rounded bg-slate-300 p-1">
          {showDetails ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>

      {showDetails && (
        <>
          <div className="mt-2 border bg-white p-3">
            <table className="w-full">
              <tr className="text-left">
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Preço</th>
                <th>Subtotal</th>
              </tr>

              <tbody>
                {order.items.map((item, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{item.productName}</td>
                      <td>{item.quantity}</td>
                      <td>{currencyFormatter.format(item.productPrice)}</td>

                      <td>
                        {currencyFormatter.format(
                          item.productPrice * item.quantity
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <p className="mt-3 flex items-center bg-white text-lg">
              <BiMoney className="mr-1" />
              Total:
              <b className="ml-2">
                {currencyFormatter.format(calculateOrderTotal(order.items))}
              </b>
            </p>
          </div>

          <div className="border-1 mt-2 border bg-white p-2 ">
            <p className="flex items-center">
              <GrNotes className="mr-1" />
              Detalhes do Pedido: {order.comment}
            </p>
            <p className="flex items-center">
              <BsPersonFill className="mr-1" /> Cliente: {order.clientName}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Order;
