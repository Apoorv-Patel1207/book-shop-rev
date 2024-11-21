import { useCallback, useEffect, useState } from "react"

import {
  Typography,
  Button,
  Container,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
} from "@mui/material"
// import { useNavigate } from "react-router-dom"

import { useUserID } from "src/components/auth/userID"
import { getUserProfile } from "src/service/user-profie-service"

import CartItem from "../components/cart/cart-item"
import Layout from "../components/layout/layout"
import {
  fetchCartItems,
  removeFromCart,
  clearCart,
  updateCartQuantityService,
} from "../service/cart-service"
import { placeOrder } from "../service/order-service"
import {
  CartItem as CartItemType,
  Order,
  UserProfile,
} from "../types/data-types"

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false)
  const [isClearCartModalOpen, setIsClearCartModalOpen] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)

  // const navigate = useNavigate();

  const userID = useUserID()

  const getCartItems = useCallback(async () => {
    if (!userID) {
      alert("Please login to continue")
      return
    }

    try {
      const items = await fetchCartItems(userID)
      setCartItems(items)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }, [userID])

  useEffect(() => {
    const getProfile = async () => {
      if (!userID) return
      try {
        const profile = await getUserProfile(userID)
        setUserProfile(profile)
      } catch (err) {
        console.error("Failed to fetch user profile:", err)
      }
    }
    getCartItems().catch((err) => {
      console.error("Error loading book details:", err)
    })
    getProfile().catch((err) => {
      console.error("Error loading the profile details:", err)
    })
  }, [getCartItems, userID])

  const totalCost = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )

  const handleRemove = async (id: number) => {
    if (!userID) {
      alert("Please login to continue")
      return
    }

    try {
      await removeFromCart(userID, id)
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove item")
    }
  }

  const updateCartQuantity = async (id: number, quantity: number) => {
    if (!userID) {
      alert("Please login to continue")
      return
    }

    try {
      await updateCartQuantityService(userID, id, quantity)
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity } : item,
        ),
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update quantity")
    }
  }

  const handleClearCart = async () => {
    if (!userID) {
      alert("Please login to continue")
      return
    }

    try {
      await clearCart(userID)
      setCartItems([])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to clear cart")
    }
  }

  const handleOpenCheckoutModal = () => setIsCheckoutModalOpen(true)
  const handleCloseCheckoutModal = () => setIsCheckoutModalOpen(false)

  const handleOpenClearCartModal = () => setIsClearCartModalOpen(true)
  const handleCloseClearCartModal = () => setIsClearCartModalOpen(false)

  const [isPlacingOrder, setIsPlacingOrder] = useState(false)

  const handleConfirmBuy = async () => {
    if (!userID || !userProfile) {
      alert("Please login and complete your profile to continue.")
      return
    }

    setIsPlacingOrder(true)

    const order: Order = {
      userId: userID,
      items: cartItems,
      totalAmount: Number(totalCost.toFixed(2)),
      orderDate: new Date().toISOString(),
      status: "Processing",
      userProfile,
    }

    try {
      await placeOrder(order, userID)
      alert("Order placed successfully!")
      handleCloseCheckoutModal()
      handleClearCart().catch((err) => {
        console.error("Error clearing the cart:", err)
      })
    } catch (err) {
      alert("Failed to place order. Please try again.")
      console.error(err)
    } finally {
      setIsPlacingOrder(false)
    }
  }

  const handleConfirmClearCart = () => {
    handleClearCart().catch((err) => {
      console.error("Error clearing the cart:", err)
    })
    handleCloseClearCartModal()
  }

  useEffect(() => {
    getCartItems().catch((err) => {
      console.error("Error loading book details:", err)
    })
  }, [getCartItems])

  if (loading) {
    return (
      <Layout>
        <Container maxWidth='lg' sx={{ marginTop: 4 }}>
          <Typography textAlign='center'>Loading...</Typography>
        </Container>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <Container maxWidth='lg' sx={{ marginTop: 4 }}>
          <Typography textAlign='center' color='error'>
            {error}
          </Typography>
        </Container>
      </Layout>
    )
  }

  return (
    <Layout>
      <Container maxWidth='lg' sx={{ marginTop: 4 }}>
        <Typography
          textAlign='center'
          color='#1F2937'
          fontWeight='bold'
          sx={{ mb: { xs: 2, md: 4 } }}
          fontSize={{ xs: 20, md: 26 }}
        >
          Shopping Cart
        </Typography>

        <Paper elevation={3} sx={{ padding: 2 }}>
          <Box style={{ marginBottom: "16px" }}>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  {...item}
                  handleRemove={handleRemove}
                  updateCartQuantity={updateCartQuantity}
                />
              ))
            ) : (
              <Typography textAlign='center'>Your cart is empty.</Typography>
            )}
          </Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant='h6' component='h2'>
              Total: Rs {totalCost.toFixed(2)}
            </Typography>
            <Box>
              <Button
                variant='contained'
                color='secondary'
                onClick={handleOpenClearCartModal}
                disabled={cartItems.length === 0}
              >
                Clear Cart
              </Button>
              <Button
                variant='contained'
                color='primary'
                style={{ marginLeft: "8px" }}
                onClick={handleOpenCheckoutModal}
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </Button>
            </Box>
          </Box>
        </Paper>

        <Dialog open={isCheckoutModalOpen} onClose={handleCloseCheckoutModal}>
          <DialogTitle>Confirm Checkout</DialogTitle>
          <DialogContent>
            <Typography>
              Please confirm your details before proceeding. Your total is Rs{" "}
              {totalCost.toFixed(2)}.
            </Typography>
            <Box
              component='form'
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                mt: 2,
              }}
            >
              <TextField
                label='Name'
                variant='outlined'
                fullWidth
                value={userProfile?.name || ""}
                onChange={(e) =>
                  setUserProfile((prev) =>
                    prev ? { ...prev, name: e.target.value } : null,
                  )
                }
              />
              <TextField
                label='Mobile Number'
                variant='outlined'
                fullWidth
                value={userProfile?.phone || ""}
                onChange={(e) =>
                  setUserProfile((prev) =>
                    prev ? { ...prev, phone: e.target.value } : null,
                  )
                }
              />
              <TextField
                label='Address'
                variant='outlined'
                fullWidth
                multiline
                rows={3}
                value={userProfile?.address || ""}
                onChange={(e) =>
                  setUserProfile((prev) =>
                    prev ? { ...prev, address: e.target.value } : null,
                  )
                }
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCheckoutModal} color='primary'>
              Cancel
            </Button>
            <Button
              onClick={handleConfirmBuy}
              variant='contained'
              color='primary'
              sx={{ ml: 1 }}
              disabled={isPlacingOrder}
            >
              {isPlacingOrder ? "Placing Order..." : "Confirm Buy"}
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={isClearCartModalOpen} onClose={handleCloseClearCartModal}>
          <DialogTitle>Clear Cart</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to clear the cart?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseClearCartModal} color='primary'>
              Cancel
            </Button>
            <Button onClick={handleConfirmClearCart} color='secondary'>
              Clear
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Layout>
  )
}

export default Cart
