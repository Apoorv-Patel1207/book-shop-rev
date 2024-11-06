import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/layout/layout";
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
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Book, CartItem } from "../types/book";
import { addToCart } from "../service/cart-service";

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/books/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch book details");
        }
        const data: Book = await response.json();
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

  const handleConfirmBuy = () => {
    console.log(`Buying ${quantity} of ${book?.title} now.`);
    setIsModalOpen(false);
    navigate("/checkout");
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
        <div className="container mx-auto my-10 text-center">
          <CircularProgress />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto my-10 text-center">
          <Typography variant="h4" fontWeight="bold">
            {error}
          </Typography>
        </div>
      </Layout>
    );
  }

  if (!book) {
    return (
      <Layout>
        <div className="container mx-auto my-10 text-center">
          <Typography variant="h4" fontWeight="bold">
            Book not found
          </Typography>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto my-10 p-4">
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
                  onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
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
            <div
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
            </div>
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
              <Typography variant="body1">
                <strong>Quantity:</strong> {quantity}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Total:</strong> ₹ {(book.price * quantity).toFixed(2)}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center", mb: 2 }}>
            <Button onClick={handleCloseModal} variant="outlined" color="error">
              Cancel
            </Button>
            <Button
              onClick={handleConfirmBuy}
              variant="contained"
              color="primary"
              sx={{ ml: 1 }}
            >
              Confirm Buy
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Layout>
  );
};

export default BookDetails;
