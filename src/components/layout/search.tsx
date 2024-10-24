import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, List, ListItemText, Paper, Box } from "@mui/material";

import booksData from "../../constant/books.json";

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  price: number;
  coverImage: string;
}

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const navigate = useNavigate();

  // const books: Book[] = [
  //   { id: "1", title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  //   { id: "2", title: "1984", author: "George Orwell" },
  //   { id: "3", title: "To Kill a Mockingbird", author: "Harper Lee" },
  // ];

  useEffect(() => {
    if (searchQuery) {
      const filtered = booksData.filter(
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
    navigate(`/book-details/${bookId}`);
  };

  return (
    <Box style={{}}>
      <TextField
        variant="outlined"
        placeholder="Search by title or author"
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ backgroundColor: "white", width: "500px", borderRadius: 2 }}
      />
      {filteredBooks.length > 0 && (
        <Paper style={{ position: "absolute", width: "500px", zIndex: 10 }}>
          <List>
            {filteredBooks.map((book) => (
              <li
                key={book.id}
                onClick={() => handleBookClick(book.id.toString())}
              >
                <ListItemText primary={`${book.title} by ${book.author}`} />
              </li>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default Search;
