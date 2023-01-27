interface IProduct {
  id: string;
  data: {
    name: string;
    price: number;
    image: string;
  }
}

interface IOrderItem {
  productImage: string;
  productName: string;
  productPrice: number;
  quantity: number
}

interface IOrder {
  attendantName: string;
  clientName: string;
  comment: string;
  date: Date | FieldValue;
  deliveryId: string;
  forDelivery: boolean;
  items: IOrderItem[];
}

interface IOrderFirebase {
  id: string;
  data: IOrder;
}

interface IDeliveryFirestore {
  id: string;
  data: () => IDelivery
}

interface IDeliveryWithID {
  id: string;
  data: IDelivery
}

interface IDelivery {
  coordinates: {
    latitude: number;
    longitude: number;
  },
  address: string;
  clientName: string;
  clientPhone: string;
  orderItems: IOrderItem[];
  alreadyPaid: boolean;
  alreadyDelivered: boolean;
  deliveryDate: FieldValue;
  orderId: string
}