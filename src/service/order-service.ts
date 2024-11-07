// src/service/order-service.ts

import { Order } from "../types/data-types";

const API_URL = "http://localhost:5000/api/orders";

export const fetchOrders = async (): Promise<Order[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }
  return response.json();
};

export const fetchOrderById = async (orderId: number): Promise<Order> => {
  const response = await fetch(`${API_URL}/${orderId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch order");
  }
  return response.json();
};

export const placeOrder = async (order: Order): Promise<Order> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
  if (!response.ok) {
    throw new Error("Failed to place order");
  }
  return response.json();
};

export const updateOrderStatus = async (
  id: number,
  status: string
): Promise<Order> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error("Failed to update order status");
  return response.json();
};

// Delete an order
export const deleteOrder = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete order");
};
