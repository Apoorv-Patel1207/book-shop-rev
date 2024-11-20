import React, { useState } from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

import { updateBook } from "src/service/book-service";
import { Book } from "src/types/data-types";

interface UpdateBookModalProps {
  book: Book;
  open: boolean;
  onClose: () => void;
  handleUpdateBook: (updatedBook: Book) => void;
}

const UpdateBookModal: React.FC<UpdateBookModalProps> = ({
  book,
  open,
  onClose,
  handleUpdateBook,
}) => {
  const [price, setPrice] = useState(book.price);
  const [stockQuantity, setStockQuantity] = useState(book.stockQuantity);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const updatedBook = await updateBook(book.id, { price, stockQuantity });
      handleUpdateBook(updatedBook);
      onClose(); // Close the modal
    } catch (error) {
      alert("Failed to update book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Book</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You can update the price and stock quantity of this book.
        </DialogContentText>
        <Box display="flex" flexDirection="column" gap={2} marginTop={2}>
          <TextField
            label="Price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            type="number"
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Stock Quantity"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(Number(e.target.value))}
            type="number"
            variant="outlined"
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdate} color="primary" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateBookModal;
