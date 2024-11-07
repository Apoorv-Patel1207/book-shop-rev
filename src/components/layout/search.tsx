import React, { useState, useEffect } from "react";

import { TextField, List, ListItemText, Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
    navigate(`/api/book-details/${bookId}`);
  };

  return (
    <Box style={{}}>
      <TextField
        variant="outlined"
        placeholder="Search by title or author"
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{
          backgroundColor: "white",
          width: { md: "250px", lg: "500px" },
          borderRadius: 2,
          "& .MuiOutlinedInput-root": {
            height: "40px",
            "& input": {
              padding: "8px",
            },
          },
        }}
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
