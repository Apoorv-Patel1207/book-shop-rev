import React from "react";
import CartItem from "../components/cart/cart-item"; // Ensure CartItem is also updated to use Material UI if necessary
import Layout from "../components/layout/layout";
import { Typography, Button, Container, Paper } from "@mui/material";

const Cart: React.FC = () => {
  const cartItems = [
    { id: 1, title: "Book 1", author: "Author 1", price: 20, quantity: 2 },
    { id: 2, title: "Book 2", author: "Author 2", price: 15, quantity: 1 },
  ];

  const totalCost = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Shopping Cart
        </Typography>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <div style={{ marginBottom: "16px" }}>
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" component="h2">
              Total: Rs {totalCost.toFixed(2)}
            </Typography>
            <Button variant="contained" color="primary">
              Proceed to Checkout
            </Button>
          </div>
        </Paper>
      </Container>
    </Layout>
  );
};

export default Cart;
