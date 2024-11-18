import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
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
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h5" textAlign="center" gutterBottom>
        Pending Book Approvals
      </Typography>
      {pendingBooks.length === 0 ? (
        <Typography textAlign="center" color="textSecondary">
          No pending books for approval.
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Title</strong>
                </TableCell>
                <TableCell>
                  <strong>Author</strong>
                </TableCell>
                <TableCell>
                  <strong>Genre</strong>
                </TableCell>
                <TableCell>
                  <strong>Price (₹)</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingBooks.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.genre}</TableCell>
                  <TableCell>{book.price}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="success"
                      sx={{ mr: 1 }}
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default AdminApproval;
