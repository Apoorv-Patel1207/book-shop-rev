import { useEffect, useState } from "react";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

import Layout from "../components/layout/layout";
import { addToCart } from "../service/cart-service";
import { placeOrder } from "../service/order-service";
import { Book, CartItem, Order } from "../types/data-types";
import { useUserID } from "src/components/auth/userID";

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const userID = useUserID();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/books/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch book details");
        }
        const data = (await response.json()) as Book;
        setBook(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleBuyNow = () => {
    setIsModalOpen(true);
  };

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const handleConfirmBuy = async () => {
    if (!book) {
      console.error("Book data is missing.");
      return;
    }

    if (!userID) {
      alert("Please login to place order");
      return;
    }

    setIsPlacingOrder(true);

    const order: Order = {
      userId: 999999999,
      items: [{ ...book, quantity }],
      totalAmount: book.price * quantity,
      orderDate: new Date().toISOString(),
      status: "Processing",
      shippingAddress: {
        recipientName: "currentUser.name",
        street: "currentUser.address.street",
        city: "currentUser.address.city",
        state: "currentUser.address.state",
        zipCode: "currentUser.address.zipCode",
        country: "currentUser.address.country",
      },
    };

    try {
      await placeOrder(order, userID);
      alert("Order placed successfully!");
      handleCloseModal();
    } catch (error) {
      alert("Failed to place order. Please try again.");
      console.error(error);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddToCart = async () => {
    if (!book) return;

    const item: CartItem = {
      ...book,
      quantity,
    };

    try {
      await addToCart(item);
      console.log("Item added to cart:", item);
      navigate("/cart");
    } catch (err) {
      setError((err as Error).message);
      console.error("Error adding item to cart:", err);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Box className="container mx-auto my-10 text-center">
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Box className="container mx-auto my-10 text-center">
          <Typography variant="h4" fontWeight="bold">
            {error}
          </Typography>
        </Box>
      </Layout>
    );
  }

  if (!book) {
    return (
      <Layout>
        <Box className="container mx-auto my-10 text-center">
          <Typography variant="h4" fontWeight="bold">
            Book not found
          </Typography>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box className="container mx-auto my-10 p-4">
        <Card variant="outlined">
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <CardMedia
                component="img"
                alt={book.title}
                height="300"
                image={book.coverImage}
                sx={{ objectFit: "cover" }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <CardContent>
                <Typography variant="h4" fontWeight="bold">
                  {book.title}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  by {book.author}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Genre: {book.genre}
                </Typography>
                <Typography variant="h6" fontWeight="bold" marginTop={2}>
                  Description
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {book.description}
                </Typography>
                <Typography variant="h5" fontWeight="bold" marginTop={2}>
                  Price: ₹ {book.price.toFixed(2)}
                </Typography>
                <TextField
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e: { target: { value: string } }) =>
                    setQuantity(parseInt(e.target.value, 10))
                  }
                  label="Quantity"
                  inputProps={{ min: 1 }}
                  variant="outlined"
                  size="small"
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
              <Button variant="outlined" onClick={() => navigate("/catalog")}>
                Back to Books
              </Button>
              <Box style={{ display: "flex", gap: "8px" }}>
                <Button variant="contained" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Buy Now Confirmation Modal */}
        <Dialog
          open={isModalOpen}
          onClose={handleCloseModal}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
            <CheckCircleOutlineIcon
              color="success"
              sx={{ marginRight: 1, fontSize: 30 }}
            />
            Confirm Purchase
          </DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection="column" alignItems="center">
              <CardMedia
                component="img"
                alt={book.title}
                height="150"
                image={book.coverImage}
                sx={{ objectFit: "cover", borderRadius: 2, mb: 2 }}
              />
              <Typography variant="h6" fontWeight="bold">
                {book.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                by {book.author}
              </Typography>
              <Divider sx={{ my: 2, width: "100%" }} />
              <Typography variant="body1">Quantity: {quantity}</Typography>
              <Typography variant="body1" gutterBottom>
                Total: ₹ {(book.price * quantity).toFixed(2)}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center", mb: 2 }}>
            <Button onClick={handleCloseModal} variant="outlined" color="error">
              Cancel
            </Button>
            {/* <Button
              onClick={handleConfirmBuy}
              variant="contained"
              color="primary"
              sx={{ ml: 1 }}
            >
              Confirm Buy
            </Button> */}

            <Button
              onClick={handleConfirmBuy}
              variant="contained"
              color="primary"
              sx={{ ml: 1 }}
              disabled={isPlacingOrder}
            >
              {isPlacingOrder ? "Placing Order..." : "Confirm Buy"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Layout>
  );
};

export default BookDetails;
