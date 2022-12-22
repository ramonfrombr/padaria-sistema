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