import React, { useState } from "react"
import { FaCalendarCheck, FaMapMarkerAlt } from "react-icons/fa"

interface DeliveryProps {
  delivery: IDelivery
}

const Delivery = ({delivery}: DeliveryProps) => {

  const [showInfo, setShowInfo] = useState(false)
  return (
    <div onClick={() => setShowInfo(prev => !prev)} className={`cursor-pointer mb-2 border rounded  p-3 ${delivery.alreadyDelivered ? 'bg-green-200' : 'bg-slate-100'}`}>
      <div className="flex flex-wrap">
        <span className="flex items-center mr-2"><FaCalendarCheck className="mr-1" /> {new Date(delivery.deliveryDate.toDate()).toLocaleString()}</span>

        <span className="flex items-center mr-2"><FaMapMarkerAlt className="mr-1" /> {delivery.address}</span>

        <span className={`${delivery.alreadyPaid ? 'bg-green-500' : 'bg-red-500'} text-white font-bold p-1 rounded`}>{delivery.alreadyPaid ? 'Paid' : 'Not Paid'}</span>
      </div>

      {showInfo && (
        <div className="bg-white p-1 mt-3">
          <div className="mb-3 p-2">
            <p className="text-center text-lg mb-2">Items</p>
            <div className="grid grid-cols-3">
              <span className="font-bold">Product ({delivery.orderItems.length})</span>
              <span className="font-bold">Quantity</span>
              <span className="font-bold">Price</span>
            {delivery.orderItems.map((item,idx) => (
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
            <li><b>Address:</b> {delivery.address}</li>
            <li><b>Customer Name:</b> {delivery.clientName}</li>
            <li><b>Customer Phone:</b> {delivery.clientPhone}</li>
            <li><b>Already Delivered:</b> {delivery.alreadyDelivered ? "Yes" : "No"}</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Delivery