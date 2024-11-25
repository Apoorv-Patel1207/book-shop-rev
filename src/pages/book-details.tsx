import { useEffect, useState } from "react"

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Grid,
  CircularProgress,
  Box,
  AlertColor,
} from "@mui/material"
import { useParams, useNavigate } from "react-router-dom"
import { useUserID } from "src/components/auth/userID"
import ConfirmPurchaseDialog from "src/components/book-details/confirm-purchase-dialog"
import SnackbarAlert from "src/components/utility-components/snackbar"
import { getUserProfile } from "src/service/user-profile-service"

import Layout from "../components/layout/layout"
import { addToCart } from "../service/cart-service"
import { placeOrder } from "../service/order-service"
import { Book, CartItem, Order, UserProfile } from "../types/data-types"

const BookDetails = () => {
  const { id } = useParams<{ id: string }>()
  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)

  const navigate = useNavigate()
  const userID = useUserID()

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success" as AlertColor,
  })

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }))
  }

  const showSnackbar = (message: string, type: AlertColor = "success") => {
    setSnackbar({ open: true, message, type })
  }

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        if (id) {
          const response = await fetch(`http://localhost:5000/api/books/${id}`)

          if (!response.ok) {
            throw new Error("Failed to fetch book details")
          }
          const data = (await response.json()) as Book
          setBook(data)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    // fetchBookDetails()

    fetchBookDetails().catch((err) => {
      console.error("Error loading book details:", err)
    })
  }, [id])

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
    getProfile().catch((err) => {
      console.error("Error getting the profile details:", err)
    })
  }, [userID])

  const handleBuyNow = () => {
    setIsModalOpen(true)
  }

  const [isPlacingOrder, setIsPlacingOrder] = useState(false)

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleConfirmBuy = async () => {
    if (!book) {
      console.error("Book data is missing.")
      return
    }

    if (!userID || !userProfile) {
      showSnackbar(
        "Please login and complete your profile to continue.",
        "error",
      )
      return
    }

    setIsPlacingOrder(true)

    const order: Order = {
      userId: userID,
      items: [{ ...book, quantity }],
      totalAmount: book.price * quantity,
      orderDate: new Date().toISOString(),
      status: "Processing",
      userProfile,
    }

    try {
      const response = await placeOrder(order, userID)
      showSnackbar("Order placed successfully!", "success")
      handleCloseModal()
      if (response.orderId) navigate(`/checkout/${response.orderId}`)
    } catch (err) {
      showSnackbar("Failed to place order. Please try again.", "error")
      console.error(err)
    } finally {
      setIsPlacingOrder(false)
    }
  }

  const handleAddToCart = async () => {
    if (!book) return

    if (!userID) {
      showSnackbar(
        "Please login and complete your profile to continue.",
        "error",
      )
      return
    }

    const item: CartItem = {
      ...book,
      quantity,
    }

    try {
      await addToCart(item, userID)
      console.log("Item added to cart:", item)
      navigate("/cart")
    } catch (err) {
      setError((err as Error).message)
      console.error("Error adding item to cart:", err)
    }
  }

  if (loading) {
    return (
      <Layout>
        <Box className='container mx-auto my-10 text-center'>
          <CircularProgress />
        </Box>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <Box className='container mx-auto my-10 text-center'>
          <Typography fontWeight='bold' variant='h4'>
            {error}
          </Typography>
        </Box>
      </Layout>
    )
  }

  if (!book) {
    return (
      <Layout>
        <Box className='container mx-auto my-10 text-center'>
          <Typography fontWeight='bold' variant='h4'>
            Book not found
          </Typography>
        </Box>
      </Layout>
    )
  }

  return (
    <Layout>
      <Box className='container mx-auto my-10 p-4'>
        <Card variant='outlined'>
          <Grid container spacing={2}>
            <Grid item md={4} xs={12}>
              <Box sx={{ position: "relative" }}>
                {book.stockQuantity < 1 && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 1,
                    }}
                  >
                    <img
                      alt='Sold Out'
                      src='/images/sold out.png'
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                      }}
                    />
                  </Box>
                )}
                <CardMedia
                  alt={book.title}
                  component='img'
                  height='300'
                  image={book.coverImage}
                  sx={{
                    objectFit: "cover",
                    zIndex: 0,
                  }}
                />
              </Box>
            </Grid>

            <Grid item md={8} xs={12}>
              <CardContent>
                <Typography fontWeight='bold' variant='h4'>
                  {book.title}
                </Typography>
                <Typography color='text.secondary' variant='h6'>
                  by {book.author}
                </Typography>
                <Typography color='text.secondary' variant='body2'>
                  Genre: {book.genre}
                </Typography>
                <Typography fontWeight='bold' marginTop={2} variant='h6'>
                  Description
                </Typography>
                <Typography color='text.secondary' variant='body1'>
                  {book.description}
                </Typography>
                <Typography fontWeight='bold' marginTop={2} variant='h5'>
                  Price: ₹ {book.price.toFixed(2)}
                </Typography>
                <TextField
                  id='quantity'
                  inputProps={{ min: 1 }}
                  label='Quantity'
                  onChange={(e: { target: { value: string } }) =>
                    setQuantity(parseInt(e.target.value, 10))
                  }
                  size='small'
                  sx={{ marginTop: 2 }}
                  type='number'
                  value={quantity}
                  variant='outlined'
                />
              </CardContent>
            </Grid>
          </Grid>
          <CardContent>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "16px",
              }}
            >
              <Button onClick={() => navigate("/catalog")} variant='outlined'>
                Back to Books
              </Button>

              {book.stockQuantity < 1 && (
                <Typography color='red'>
                  The book is not available currently
                </Typography>
              )}

              {!userID && book.stockQuantity > 1 && (
                <Typography color='red'>
                  Please log in to proceed with the purchase.
                </Typography>
              )}

              {userID && book.stockQuantity > 0 && (
                <Box style={{ display: "flex", gap: "8px" }}>
                  <Button
                    onClick={handleAddToCart}
                    sx={{ bgcolor: "#001F3F" }}
                    variant='contained'
                  >
                    Add to Cart
                  </Button>
                  <Button
                    color='success'
                    onClick={handleBuyNow}
                    variant='outlined'
                  >
                    Buy Now
                  </Button>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>

        <ConfirmPurchaseDialog
          book={book}
          handleCloseModal={handleCloseModal}
          handleConfirmBuy={handleConfirmBuy}
          isModalOpen={isModalOpen}
          isPlacingOrder={isPlacingOrder}
          quantity={quantity}
          setUserProfile={setUserProfile}
          userProfile={userProfile}
        />

        <SnackbarAlert
          message={snackbar.message}
          onClose={handleSnackbarClose}
          open={snackbar.open}
          type={snackbar.type}
        />
      </Box>
    </Layout>
  )
}

export default BookDetails
