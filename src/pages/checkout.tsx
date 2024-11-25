import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"

import { useEffect, useState } from "react"
import { Order } from "src/types/data-types"
import { fetchOrderById } from "src/service/order-service"
import { useUserID } from "src/components/auth/userID"
import Layout from "../components/layout/layout"

const Checkout = () => {
  const [order, setOrder] = useState<Order | null>(null)
  const { id } = useParams<{ id: string }>()
  const userID = useUserID()

  const navigate = useNavigate()

  useEffect(() => {
    if (userID) {
      const loadOrder = async () => {
        try {
          const fetchedOrder = await fetchOrderById(Number(id), userID)
          setOrder(fetchedOrder)
        } catch (err) {
          console.error("Failed to load orders", err)
        }
      }
      loadOrder().catch((err) => {
        console.error("Error loading the order details:", err)
      })
    }
  }, [id, userID])

  const handleBackToHome = () => {
    navigate("/")
  }

  return (
    <Layout>
      <Container maxWidth='md'>
       
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          sx={{
            background: "linear-gradient(135deg, #e0f7fa, #fff)",
            p: 4,
            borderRadius: 2,
          }}
        >
          <CheckCircleIcon color='success' sx={{ fontSize: 80 }} />
          <Typography
            variant='h4'
            fontWeight='bold'
            sx={{ mt: 2, color: "#00796b" }}
          >
            Thank You for Your Purchase!
          </Typography>
          <Typography variant='subtitle1' color='text.secondary' sx={{ mt: 1 }}>
            Your order has been successfully placed. We hope you enjoy your new
            books!
          </Typography>
        </Box>

        {/* Order Summary Table */}
        <Box sx={{ mt: 4 }}>
          <Typography
            variant='h5'
            fontWeight='bold'
            align='center'
            gutterBottom
            sx={{
              background: "linear-gradient(135deg, #00796b, #004d40)",
              color: "white",
              p: 1,
              borderRadius: 1,
            }}
          >
            Order Summary
          </Typography>

          <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Book Title</strong>
                  </TableCell>
                  <TableCell align='center'>
                    <strong>Quantity</strong>
                  </TableCell>
                  <TableCell align='right'>
                    <strong>Price (₹)</strong>
                  </TableCell>
                  <TableCell align='right'>
                    <strong>Subtotal (₹)</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order?.items.map((item) => {
                  const { id: bookID, title, quantity, price } = item
                  const subtotal = quantity * price
                  return (
                    <TableRow key={bookID}>
                      <TableCell>{title}</TableCell>
                      <TableCell align='center'>{quantity}</TableCell>
                      <TableCell align='right'>₹ {price}</TableCell>
                      <TableCell align='right'>₹ {subtotal}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
              <TableRow>
                <TableCell
                  colSpan={3}
                  align='right'
                  sx={{ fontWeight: "bold" }}
                >
                  Total
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: "bold" }}>
                  ₹ {order?.totalAmount}
                </TableCell>
              </TableRow>
            </Table>
          </TableContainer>
        </Box>

        {/* Footer Buttons */}
        <Box mt={4}>
          <Button
            variant='contained'
            color='primary'
            onClick={handleBackToHome}
            sx={{ marginTop: 2, bgcolor: "#001F3F" }}
          >
            Continue Shopping
          </Button>

          <Button
            variant='contained'
            color='primary'
            href='/order-history'
            sx={{ marginTop: 2, bgcolor: "#001F3F" }}
          >
            View All Orders
          </Button>
        </Box>
      </Container>
    </Layout>
  )
}

export default Checkout
