import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  price: number;
  coverImage: string;
}

interface BookCardProps {
  book: Book;
  addToCart: (book: Book) => void;
}

const BookCard = (props: BookCardProps) => {
  const { book, addToCart } = props;
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/book-details/${book.id}`);
  };

  return (
    <Card
      sx={{
        position: "relative",
        transition: "0.3s",
        "&:hover": {
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
          transform: "translateY(-5px)",
        },
        overflow: "hidden",
        maxWidth: 300,
        margin: 2,
        "&:hover .add-to-cart-btn": {
          opacity: 1,
          transform: "translateY(0)",
        },
      }}
      onClick={handleCardClick}
    >
      <Box paddingX={4} paddingTop={4} paddingBottom={2}>
        <CardMedia
          component="img"
          height="200"
          image={book.coverImage}
          alt={book.title}
          sx={{
            transition: "transform 0.3s",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        />
      </Box>

      <CardContent>
        <Typography component="div" fontWeight="bold" color="#1F2937">
          {book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          by {book.author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Genre: {book.genre}
        </Typography>
        <Typography color="success.main" fontWeight="bold">
          Rs {book.price.toFixed(2)}
        </Typography>
      </CardContent>

      {/* Add to Cart button */}
      <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={(e) => {
          e.stopPropagation();
          addToCart(book);
        }}
        className="add-to-cart-btn"
        sx={{
          position: "absolute",
          bottom: 10,
          right: 10,
          backgroundColor: "#1F2937",
          opacity: 0,
          transform: "translateY(20px)", // Move down a bit initially
          transition: "0.3s ease", // Smooth transition
          "&:hover": {
            backgroundColor: "secondary.dark",
          },
        }}
      >
        Add to Cart
      </Button>
    </Card>
  );
};

export default BookCard;
