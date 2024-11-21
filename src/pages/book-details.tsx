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
} from "@mui/material"
import { useParams, useNavigate } from "react-router-dom"

import { useUserID } from "src/components/auth/userID"
import ConfirmPurchaseDialog from "src/components/book-details/confirm-purchase-dialog"
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
      alert("Please login and complete your profile to continue.")
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
      await placeOrder(order, userID)
      alert("Order placed successfully!")
      handleCloseModal()
    } catch (err) {
      alert("Failed to place order. Please try again.")
      console.error(err)
    } finally {
      setIsPlacingOrder(false)
    }
  }

  const handleAddToCart = async () => {
    if (!book) return

    if (!userID) {
      alert("Please login to continue")
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
          <Typography variant='h4' fontWeight='bold'>
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
          <Typography variant='h4' fontWeight='bold'>
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
            <Grid item xs={12} md={4}>
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
                      src='/images/sold out.png'
                      alt='Sold Out'
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                      }}
                    />
                  </Box>
                )}
                <CardMedia
                  component='img'
                  alt={book.title}
                  height='300'
                  image={book.coverImage}
                  sx={{
                    objectFit: "cover",
                    zIndex: 0,
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={8}>
              <CardContent>
                <Typography variant='h4' fontWeight='bold'>
                  {book.title}
                </Typography>
                <Typography variant='h6' color='text.secondary'>
                  by {book.author}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Genre: {book.genre}
                </Typography>
                <Typography variant='h6' fontWeight='bold' marginTop={2}>
                  Description
                </Typography>
                <Typography variant='body1' color='text.secondary'>
                  {book.description}
                </Typography>
                <Typography variant='h5' fontWeight='bold' marginTop={2}>
                  Price: ₹ {book.price.toFixed(2)}
                </Typography>
                <TextField
                  id='quantity'
                  type='number'
                  value={quantity}
                  onChange={(e: { target: { value: string } }) =>
                    setQuantity(parseInt(e.target.value, 10))
                  }
                  label='Quantity'
                  inputProps={{ min: 1 }}
                  variant='outlined'
                  size='small'
                  sx={{ marginTop: 2 }}
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
              <Button variant='outlined' onClick={() => navigate("/catalog")}>
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
                  <Button variant='contained' onClick={handleAddToCart}>
                    Add to Cart
                  </Button>
                  <Button
                    variant='contained'
                    color='success'
                    onClick={handleBuyNow}
                  >
                    Buy Now
                  </Button>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>

        <ConfirmPurchaseDialog
          isModalOpen={isModalOpen}
          book={book}
          quantity={quantity}
          userProfile={userProfile}
          isPlacingOrder={isPlacingOrder}
          handleCloseModal={handleCloseModal}
          handleConfirmBuy={handleConfirmBuy}
          setUserProfile={setUserProfile}
        />
      </Box>
    </Layout>
  )
}

export default BookDetails
