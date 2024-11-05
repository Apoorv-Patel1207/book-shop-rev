import { CartItem } from "../types/book";

const API_URL = "http://localhost:5000/api/cart";

// Fetch cart items from the server
export const fetchCartItems = async (): Promise<CartItem[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch cart items");
  }
  return response.json();
};

// Add an item to the cart
export const addToCart = async (item: CartItem): Promise<CartItem> => {
  const response = await fetch(`${API_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  if (!response.ok) {
    throw new Error("Failed to add item to cart");
  }
  return response.json();
};

// Remove an item from the cart by ID
export const removeFromCart = async (id: number): Promise<CartItem> => {
  const response = await fetch(`${API_URL}/remove/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to remove item from cart");
  }
  return response.json();
};

// Clear the cart
export const clearCart = async (): Promise<void> => {
  const response = await fetch(`${API_URL}/clear`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to clear cart");
  }
};
