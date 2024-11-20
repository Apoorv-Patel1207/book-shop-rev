import { useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Book } from "src/types/data-types";

import DeleteConfirmationDialog from "./delete-book-modal";
import UpdateBookModal from "./update-book-modal";

interface BookCardProps {
  book: Book;
  handleDelete: (id: number) => void;
  handleUpdateBook: (updatedBook: Book) => void;
}

const BookCard = (props: BookCardProps) => {
  const { book, handleDelete, handleUpdateBook } = props;
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

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

  const openUpdateModalHandler = (e: React.MouseEvent) => {
    e.stopPropagation();

    setOpenUpdateModal(true);
  };

  const closeUpdateModalHandler = () => {
    setOpenUpdateModal(false);
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

          "&:hover .edit-icon-btn": {
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
              zIndex: 5,
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

        <IconButton
          className="edit-icon-btn"
          onClick={openUpdateModalHandler}
          sx={{
            position: "absolute",
            top: 50,
            right: 8,
            zIndex: 10,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            opacity: isMobile ? 1 : 0,
            transform: isMobile ? "translateY(0)" : "translateY(-20px)",
            transition: "0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 1)",
            },
          }}
        >
          <EditIcon sx={{ color: "primary.main" }} />
        </IconButton>

        <Box paddingX={4} paddingTop={4} paddingBottom={0}>
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
          {book.stockQuantity < 6 && book.stockQuantity > 0 && (
            <Typography
              sx={{
                color: "error.main",
                fontWeight: "bold",
                borderRadius: "8px",
                fontSize: "12px",
                position: "absolute",
              }}
            >
              Only {book.stockQuantity} left in stock!
            </Typography>
          )}
          <Typography
            fontWeight="bold"
            color="#1F2937"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: isMobile ? "1rem" : "1.1rem",
              mt: 2,
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

      <UpdateBookModal
        book={book}
        open={openUpdateModal}
        onClose={closeUpdateModalHandler}
        handleUpdateBook={handleUpdateBook}
      />

      <DeleteConfirmationDialog
        open={openDialog}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default BookCard;
