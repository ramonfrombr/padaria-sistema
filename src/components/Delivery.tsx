interface DeliveryProps {
  delivery: IDelivery
}

const Delivery = ({delivery}: DeliveryProps) => {
  return (
    <div className="border rounded bg-slate-100 p-3">
      <ul>
        <li><b>Number of items:</b> {delivery.orderItems.length}</li>
        <li><b>Address:</b> {delivery.address}</li>
        <li><b>Customer Name:</b> {delivery.clientName}</li>
        <li><b>Customer Phone:</b> {delivery.clientPhone}</li>
        <li><b>Already Paid:</b> {delivery.alreadyPaid ? "Yes" : "No"}</li>
        <li><b>Already Delivered:</b> {delivery.alreadyDelivered ? "Yes" : "No"}</li>
        <li><b>Delivery Date:</b> {delivery.deliveryDate}</li>
      </ul>
    </div>
  )
}

export default Delivery