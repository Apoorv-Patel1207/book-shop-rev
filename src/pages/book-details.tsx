import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/layout/layout";
import booksData from "../constant/books.json";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Grid,
} from "@mui/material";

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const book = booksData.find((b) => b.id === parseInt(id ?? "", 10));

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${book?.title} to the cart.`);
    navigate("/cart"); // Redirect to the cart page after adding
  };

  const handleBuyNow = () => {
    console.log(`Buying ${quantity} of ${book?.title} now.`);
    navigate("/checkout"); // Redirect to checkout page
  };

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
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <CardContent>
                <Typography variant="h4" fontWeight="bold">
                  {book.title}
                </Typography>
                <Typography variant="h6" color="textSecondary">
                  by {book.author}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Genre: {book.genre}
                </Typography>
                <Typography variant="h6" fontWeight="bold" marginTop={2}>
                  Description
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {book.description}
                </Typography>
                <Typography variant="h5" fontWeight="bold" marginTop={2}>
                  Price: ${book.price.toFixed(2)}
                </Typography>
                <div style={{ marginTop: "16px" }}>
                  <TextField
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                    label="Quantity"
                    inputProps={{ min: 1 }}
                    variant="outlined"
                    size="small"
                  />
                </div>
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
              <div style={{ display: "flex", gap: "8px" }}>
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
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default BookDetails;
