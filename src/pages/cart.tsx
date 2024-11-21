import { useCallback, useEffect, useState } from "react"

import { Typography, Button, Container, Paper, Box } from "@mui/material"

import { useUserID } from "src/components/auth/userID"
import { getUserProfile } from "src/service/user-profie-service"

import ClearCartDialog from "src/components/cart/clear-cart-dialog"
import CartConfirmPurchaseDailog from "src/components/cart/cart-confirm-purchase-dailog"
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

        <CartConfirmPurchaseDailog
          isCheckoutModalOpen={isCheckoutModalOpen}
          handleCloseCheckoutModal={handleCloseCheckoutModal}
          totalCost={totalCost}
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          handleConfirmBuy={handleConfirmBuy}
          isPlacingOrder={isPlacingOrder}
        />

        <ClearCartDialog
          isClearCartModalOpen={isClearCartModalOpen}
          handleCloseClearCartModal={handleCloseClearCartModal}
          handleConfirmClearCart={handleConfirmClearCart}
        />
      </Container>
    </Layout>
  )
}

export default Cart
