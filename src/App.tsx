import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Order from "./components/Order";
import CreateProduct from "./components/CreateProduct";
import CreateOrder from "./components/CreateOrder";
import ListOfProducts from "./components/ListOfProducts";

export interface IProduct {
  id: string;
  name: string;
  price: number;
}

export interface IOrderItem {
  item: IProduct;
  quantity: number;
}

export interface IOrder {
  id: string;
  items: IOrderItem[];
  registerDate: Date;
  attendant: string;
  client: string;
  forDelivery: boolean;
  totalValue: number;
  comment: string;
}

// Create our number formatter.
export const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const orders = [];

const listOfProducts = [
  { id: uuidv4(), name: "Pão Caseiro", price: 8 },
  { id: uuidv4(), name: "Empadinha", price: 2.5 },
  { id: uuidv4(), name: "Suco 200ml", price: 1.5 },
];

export const calculateOrderTotal = (order: IOrder["items"]) => {
  return order.reduce(
    (accumulator, currentItem) =>
      accumulator + currentItem.item.price * currentItem.quantity,
    0
  );
};

function App() {
  const [products, setProducts] = useState<IProduct[]>(listOfProducts);
  const [orders, setOrders] = useState<IOrder[]>([]);

  return (
    <div className="App">
      <CreateProduct setProducts={setProducts} />

      <ListOfProducts products={products} />

      <CreateOrder products={products} setOrders={setOrders} />

      <div className="mx-1 my-2 border-2 bg-slate-200 p-3">
        <h1>List of Orders</h1>

        {orders.map((order, idx) => {
          return <Order key={idx} order={order} />;
        })}
      </div>
    </div>
  );
}

export default App;
