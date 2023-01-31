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

        <span className={`${delivery.alreadyPaid ? 'bg-green-500' : 'bg-red-500'} text-white font-bold p-1 rounded`}>{delivery.alreadyPaid ? 'Pago' : 'Não Pago'}</span>
      </div>

      {showInfo && (
        <div className="bg-white p-1 mt-3">
          <div className="mb-3 p-2">
            <p className="text-center text-lg mb-2">Itens</p>
            <div className="grid grid-cols-3">
              <span className="font-bold">Produto ({delivery.orderItems.length})</span>
              <span className="font-bold">Quantidade</span>
              <span className="font-bold">Preço</span>
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
            <li><b>Endereço:</b> {delivery.address}</li>
            <li><b>Nome do Cliente:</b> {delivery.clientName}</li>
            <li><b>Telefone do Cliente:</b> {delivery.clientPhone}</li>
            <li><b>Pedido Entregue?</b> {delivery.alreadyDelivered ? "Sim" : "Não"}</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Delivery