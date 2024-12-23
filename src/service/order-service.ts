
import { Order } from "../types/data-types";

const API_URL = "http://localhost:5000/api/orders";

// Fetch all orders
export const fetchOrders = async (userID: string): Promise<Order[]> => {
  if (!userID) {
    throw new Error("User is not authenticated");
  }

  const response = await fetch(API_URL, {
    headers: {
      "x-user-id": userID,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }
  return (await response.json()) as Order[];
};

// Fetch a single order by ID
export const fetchOrderById = async (
  orderId: number,
  userID: string
): Promise<Order> => {
  if (!userID) {
    throw new Error("User is not authenticated");
  }

  const response = await fetch(`${API_URL}/${orderId}`, {
    headers: {
      "x-user-id": userID,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch order");
  }
  return (await response.json()) as Order;
};

// Place an order
export const placeOrder = async (
  order: Order,
  userID: string
): Promise<Order> => {
  if (!userID) {
    throw new Error("User is not authenticated");
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-user-id": userID,
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    throw new Error("Failed to place order");
  }
  return (await response.json()) as Order;
};

// Update order status
export const updateOrderStatus = async (
  id: number,
  status: string,
  userID: string
): Promise<Order> => {
  if (!userID) {
    throw new Error("User is not authenticated");
  }

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-user-id": userID,
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) throw new Error("Failed to update order status");
  return (await response.json()) as Order;
};

// Delete an order
export const deleteOrder = async (
  id: number,
  userID: string
): Promise<void> => {
  if (!userID) {
    throw new Error("User is not authenticated");
  }

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "x-user-id": userID,
    },
  });
  if (!response.ok) throw new Error("Failed to delete order");
};
