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
  stockQuantity: number;
}

export interface CartItem extends Book {
  quantity: number;
}

export interface ShippingAddress {
  recipientName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  orderId?: number;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  orderDate: string;
  status: "Shipped" | "Delivered" | "Processing";
  shippingAddress?: ShippingAddress;
}
