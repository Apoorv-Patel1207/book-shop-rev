import { useEffect, useState } from "react";

import {
  Container,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import Layout from "../components/layout/layout";
import { fetchOrders } from "../service/order-service";
import { Order } from "../types/data-types";
import { useUserID } from "src/components/auth/userID";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  console.log("orders: ", orders);

  const userID = useUserID();

  useEffect(() => {
    if (userID) {
      const loadOrders = async () => {
        try {
          const fetchedOrders = await fetchOrders(userID);
          setOrders(fetchedOrders);
        } catch (error) {
          console.error("Failed to load orders", error);
        }
      };
      loadOrders();
    }
  }, [userID]);

  if (!userID) {
    return <div>Please log in to view your orders.</div>; // Optional: show message if not logged in
  }

  return (
    <Layout>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          Order History
        </Typography>
        {orders.map((order) => (
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
                {order.items.map((book) => (
                  <ListItem key={book.id}>
                    <ListItemText
                      primary={book.title}
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
              {order.userProfile && (
                <>
                  {" "}
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Shipping Address:
                  </Typography>
                  <Typography>{order.userProfile.name}</Typography>
                  <Typography>{order.userProfile.address}</Typography>
                  <Typography>{order.userProfile.phone}</Typography>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </Container>
    </Layout>
  );
};

export default OrderHistoryPage;
