

interface DeliveryProps {
  delivery: IDelivery
}

const Delivery = ({delivery}: DeliveryProps) => {
  return (
    <div className={`border rounded  p-3 ${delivery.alreadyDelivered ? 'bg-green-300' : 'bg-slate-200'}`}>
      <ul>
        <li><b>Delivery Date:</b> {new Date(delivery.deliveryDate.toDate()).toLocaleString()}</li>
        <li><b>Number of items:</b> {delivery.orderItems.length}</li>
        <li><b>Address:</b> {delivery.address}</li>
        <li><b>Customer Name:</b> {delivery.clientName}</li>
        <li><b>Customer Phone:</b> {delivery.clientPhone}</li>
        <li><b>Already Paid:</b> {delivery.alreadyPaid ? "Yes" : "No"}</li>
        <li><b>Already Delivered:</b> {delivery.alreadyDelivered ? "Yes" : "No"}</li>
      </ul>
    </div>
  )
}

export default Delivery