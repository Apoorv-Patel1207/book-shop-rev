import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
} from "@mui/material";
import  { useEffect, useState } from "react";
import {
  approveBook,
  fetchPendingBooks,
  rejectBook,
} from "src/service/pending-book-service";
import { Book } from "src/types/data-types";

const AdminApproval = () => {
  const [pendingBooks, setPendingBooks] = useState<Book[]>([]);

  useEffect(() => {
    loadPendingBooks();
  }, []);

  const loadPendingBooks = async () => {
    const books = await fetchPendingBooks();
    setPendingBooks(books);
  };

  const handleApprove = async (bookId: number) => {
    await approveBook(bookId);
    setPendingBooks(pendingBooks.filter((book) => book.id !== bookId));
  };

  const handleReject = async (bookId: number) => {
    await rejectBook(bookId);
    setPendingBooks(pendingBooks.filter((book) => book.id !== bookId));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" textAlign="center" gutterBottom>
        Pending Book Approvals
      </Typography>
      {pendingBooks.length === 0 ? (
        <Typography textAlign="center" color="textSecondary">
          No pending books for approval.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {pendingBooks.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book.id}>
              <Card variant="outlined" sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {book.title}
                  </Typography>
                  <Typography color="textSecondary">
                    Author: {book.author}
                  </Typography>
                  <Typography color="textSecondary">
                    Genre: {book.genre}
                  </Typography>
                  <Typography color="textSecondary">
                    Price: ₹ {book.price}
                  </Typography>
                </CardContent>
                <Box display="flex" justifyContent="space-around" p={2}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleApprove(book.id)}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleReject(book.id)}
                  >
                    Reject
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default AdminApproval;
