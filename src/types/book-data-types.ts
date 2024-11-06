export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  price: number;
  coverImage: string;
  description: string;
  publicationDate: string;
  ISBN: string;
  language: string;
  pages: number;
  publisher: string;
}

export interface CartItem extends Book {
  quantity: number;
}

// export interface Order {
//   id: number;
//   items: CartItem[];
//   totalAmount: number;
//   user: {
//     name: string;
//     email: string;
//     address: string;
//   };
//   timestamp: string;
// }

export interface ShippingAddress {
  recipientName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  orderId: number;
  userId: number;
  items: CartItem[];
  totalAmount: number;
  orderDate: string;
  status: "Shipped" | "Delivered" | "Processing";
  shippingAddress: ShippingAddress;
}
