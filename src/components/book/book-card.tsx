import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

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
  handleDelete: (id: string) => void;
}

const BookCard = (props: BookCardProps) => {
  const { book, addToCart, handleDelete } = props;
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const handleCardClick = () => {
    navigate(`/book-details/${book.id}`);
  };

  const openDeleteDialog = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDialog(true);
  };

  const closeDeleteDialog = () => {
    setOpenDialog(false);
  };

  const confirmDelete = () => {
    handleDelete(book.id.toString());
    setOpenDialog(false);
  };

  return (
    <>
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
          "&:hover .delete-icon-btn": {
            opacity: 1,
            transform: "translateY(0)",
          },
        }}
        onClick={handleCardClick}
      >
        <IconButton
          className="delete-icon-btn"
          onClick={openDeleteDialog}
          sx={{
            position: "absolute",
            zIndex: 10,
            top: 8,
            right: 8,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            opacity: 0,
            transform: "translateY(-20px)",
            transition: "0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 1)",
            },
          }}
        >
          <RemoveCircleIcon sx={{ color: "crimson" }} />
        </IconButton>

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
            transform: "translateY(20px)",
            transition: "0.3s ease",
            "&:hover": {
              backgroundColor: "secondary.dark",
            },
          }}
        >
          Add to Cart
        </Button>
      </Card>

      <Dialog
        open={openDialog}
        onClose={closeDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Book?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this book? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BookCard;
