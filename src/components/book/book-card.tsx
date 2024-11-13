import { useState } from "react";

import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Book } from "src/types/data-types";

interface BookCardProps {
  book: Book;
  handleDelete: (id: number) => void;
}

const BookCard = (props: BookCardProps) => {
  const { book, handleDelete } = props;
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
    handleDelete(book.id);
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
          maxWidth: isMobile ? "100%" : 300,
          margin: 2,

          "&:hover .delete-icon-btn": {
            opacity: 1,
            transform: "translateY(0)",
          },
        }}
        onClick={handleCardClick}
      >
        {book.stockQuantity < 1 && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 20,
            }}
          >
            <img
              src="/images/sold out.png"
              alt="Sold Out"
              style={{ maxWidth: "80%" }}
            />
          </Box>
        )}

        <IconButton
          className="delete-icon-btn"
          onClick={openDeleteDialog}
          sx={{
            position: "absolute",
            zIndex: 10,
            top: 8,
            right: 8,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            opacity: isMobile ? 1 : 0,
            transform: isMobile ? "translateY(0)" : "translateY(-20px)",
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
          <Typography
            fontWeight="bold"
            color="#1F2937"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: isMobile ? "1rem" : "1.1rem",
            }}
          >
            {book.title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: isMobile ? "0.875rem" : "1rem",
            }}
          >
            by {book.author}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: isMobile ? "0.875rem" : "1rem",
            }}
          >
            Genre: {book.genre}
          </Typography>
          <Typography color="success.main" fontWeight="bold">
            ₹ {book.price.toFixed(2)}
          </Typography>
        </CardContent>
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
          <Button onClick={confirmDelete} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BookCard;
