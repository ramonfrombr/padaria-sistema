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
import { currencyFormatter } from "../utils";
import { calculateOrderTotal } from "../utils";

interface OrderProps {
  order: IOrder;
}

const Order: FC<OrderProps> = ({ order }: OrderProps) => {

  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="border-1 mb-4 rounded border-gray-100 bg-white p-1 drop-shadow">
      <div
        className="flex items-center justify-between"
        onClick={() => setShowDetails((prev) => !prev)}
      >
        <div className="flex flex-wrap items-center gap-1">
          {/* ORDER DATE */}
          <div className="mr-2 flex flex-wrap items-center border bg-gray-50 p-1">
            <FaClock className="mr-2" />
            <span className="mr-2">
              {/*order.date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })*/}
            </span>

            <FaCalendar className="mr-2" />
            {/*order.date.toLocaleDateString("pt-BR")*/}
          </div>

          {/* ITEM QUANTITY */}
          <div className="mr-2 flex items-center border bg-gray-50 p-1">
            <FaShoppingCart className="mr-1" />
            {order.items.length} items
          </div>

          {/* TOTAL */}
          <div className="mr-2 flex items-center border bg-gray-50 p-1">
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
              <TbTruckDelivery className="mr-1" /> For Delivery
            </div>
          )}
        </div>

        <div className="rounded bg-slate-300 p-1">
          {showDetails ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>

      {showDetails && (
        <>
          <div className="border-1 mt-2 border bg-gray-50 p-3">
            {order.items.map((item, idx) => {
              return (
                <div key={idx}>
                  <span className="mr-1">#{idx + 1}</span>
                  {item.productName} | {currencyFormatter.format(item.productPrice)}{" "}
                  x {item.quantity} ={" "}
                  {currencyFormatter.format(item.productPrice * item.quantity)}
                </div>
              );
            })}

            <p className="mt-3 flex items-center bg-white border border-green-500">
              <BiMoney className="mr-1" />
              <b>Total:</b> {currencyFormatter.format(calculateOrderTotal(order.items))}
            </p>
          </div>

          <div className="border-1 mt-2 border bg-gray-50 p-2 ">
            <p className="flex items-center">
              <GrNotes className="mr-1" />
              Additional Information: {order.comment}
            </p>
            <p className="flex items-center">
              <BsPersonFill className="mr-1" /> Client: {order.clientName}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Order;
