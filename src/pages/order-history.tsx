import { useEffect, useState } from "react"

import {
  Container,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Box,
  Grid,
} from "@mui/material"

import { useUserID } from "src/components/auth/userID"

import PageHeading from "src/components/utility-components/page-headings"
import NoDataFound from "src/components/utility-components/no-data"
import Layout from "../components/layout/layout"
import { fetchOrders } from "../service/order-service"
import { Order } from "../types/data-types"

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState<Order[]>([])

  const userID = useUserID()

  useEffect(() => {
    if (userID) {
      const loadOrders = async () => {
        try {
          const fetchedOrders = await fetchOrders(userID)
          setOrders(fetchedOrders)
        } catch (error) {
          console.error("Failed to load orders", error)
        }
      }
      loadOrders().catch((err) => {
        console.error("Error loading the order details:", err)
      })
    }
  }, [userID])

  return (
    <Layout>
      <Container maxWidth='lg'>
        <PageHeading>Order History</PageHeading>

        {orders.length === 0 ? (
          // <Typography variant='body1' color='text.secondary'>
          //   You have not placed any orders yet.
          // </Typography>
          <NoDataFound description=' You have not placed any orders yet.' />
        ) : (
          orders.map((order) => (
            <Card key={order.orderId} variant='outlined' sx={{ mb: 3 }}>
              <CardContent>
                <Box sx={{ mb: 2 }}>
                  <Typography fontWeight='bold'>
                    Order ID: {order.orderId}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Order Date: {order.orderDate}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Status: {order.status}
                  </Typography>

                  {order.userProfile && (
                    <>
                      <Typography fontWeight='bold' variant='body2'>
                        Shipping Details:
                      </Typography>

                      <Typography variant='body2' color='text.secondary'>
                        Name: {order.userProfile.name}
                      </Typography>
                      <Typography variant='body2'>
                        Address: {order.userProfile.address}
                      </Typography>
                      <Typography variant='body2'>
                        Phone: {order.userProfile.phone}
                      </Typography>
                    </>
                  )}
                </Box>

                <Typography fontWeight='bold' sx={{ mt: 2 }}>
                  Books Ordered:
                </Typography>
                <TableContainer component={Paper} sx={{ mt: 2 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Book</TableCell>
                        <TableCell sx={{ minWidth: "150px" }}>Title</TableCell>
                        <TableCell>Author</TableCell>
                        <TableCell sx={{ minWidth: "100px" }}>Price</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell sx={{ minWidth: "100px" }}>Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {order.items.map((book) => (
                        <TableRow key={book.id}>
                          <TableCell>
                            <Avatar
                              src={book.coverImage}
                              alt={book.title}
                              variant='rounded'
                              sx={{ width: 56, height: 56 }}
                            />
                          </TableCell>
                          <TableCell>{book.title}</TableCell>
                          <TableCell>{book.author}</TableCell>
                          <TableCell>₹ {book.price.toFixed(2)}</TableCell>
                          <TableCell>{book.quantity}</TableCell>
                          <TableCell>
                            ₹ {(book.price * book.quantity).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Grid container justifyContent='flex-end' sx={{ mt: 2 }}>
                  <Grid item>
                    <Typography fontWeight='bold'>
                      Total Amount: ₹ {order.totalAmount.toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))
        )}
      </Container>
    </Layout>
  )
}

export default OrderHistoryPage
