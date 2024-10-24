import React from "react";
import OrderHistory from "../constant/order-history.json";
import Layout from "../components/layout/layout";
import {
  Container,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";

const OrderHistoryPage = () => {
  return (
    <Layout>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          Order History
        </Typography>
        {OrderHistory.map((order) => (
          <Card key={order.orderId} variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Order ID: {order.orderId}
              </Typography>
              <Typography color="text.secondary">
                Order Date: {order.orderDate}
              </Typography>
              <Typography color="text.secondary">
                Status: {order.status}
              </Typography>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Books Ordered:
              </Typography>
              <List>
                {order.books.map((book) => (
                  <ListItem key={book.bookId}>
                    <ListItemText
                      primary={<strong>{book.title}</strong>}
                      secondary={`by ${book.author} - Rs ${book.price.toFixed(
                        2
                      )} x ${book.quantity}`}
                    />
                  </ListItem>
                ))}
              </List>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Total Amount: Rs {order.totalAmount.toFixed(2)}
              </Typography>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Shipping Address:
              </Typography>
              <Typography>{order.shippingAddress.recipientName}</Typography>
              <Typography>{order.shippingAddress.street}</Typography>
              <Typography>
                {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                {order.shippingAddress.zipCode}
              </Typography>
              <Typography>{order.shippingAddress.country}</Typography>
            </CardContent>
          </Card>
        ))}
      </Container>
    </Layout>
  );
};

export default OrderHistoryPage;
