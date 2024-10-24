import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, List, ListItem, ListItemText, Paper } from "@mui/material";

interface Book {
  id: string;
  title: string;
  author: string;
}

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const navigate = useNavigate();

  const books: Book[] = [
    { id: "1", title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: "2", title: "1984", author: "George Orwell" },
    { id: "3", title: "To Kill a Mockingbird", author: "Harper Lee" },
  ];

  useEffect(() => {
    if (searchQuery) {
      const filtered = books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks([]);
    }
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleBookClick = (bookId: string) => {
    navigate(`/books/${bookId}`);
  };

  return (
    <div style={{ position: "relative" }}>
      <TextField
        variant="outlined"
        placeholder="Search by title or author"
        value={searchQuery}
        onChange={handleSearchChange}
        fullWidth
      />
      {filteredBooks.length > 0 && (
        <Paper style={{ position: "absolute", width: "100%", zIndex: 10 }}>
          <List>
            {filteredBooks.map((book) => (
              <li key={book.id} onClick={() => handleBookClick(book.id)}>
                <ListItemText primary={`${book.title} by ${book.author}`} />
              </li>
            ))}
          </List>
        </Paper>
      )}
    </div>
  );
};

export default Search;
