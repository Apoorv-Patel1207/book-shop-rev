import { useNavigate } from "react-router-dom";
import {
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
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
        },
        overflow: "hidden",
      }}
      onClick={handleCardClick}
    >
      <CardMedia
        component="img"
        height="200"
        image={book.coverImage}
        alt={book.title}
        sx={{
          transition: "transform 0.3s",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      />
      <CardContent>
        <Typography variant="h6" component="div" fontWeight="bold">
          {book.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          by {book.author}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Genre: {book.genre}
        </Typography>
        <Typography variant="h6" color="green">
          Rs {book.price.toFixed(2)}
        </Typography>
      </CardContent>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={(e) => {
            e.stopPropagation();
            addToCart(book);
          }}
          sx={{ width: "100%" }}
        >
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};

export default BookCard;
