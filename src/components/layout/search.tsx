import React, { useState, useRef } from "react";
import { TextField, List, ListItemText, Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Book } from "src/types/data-types";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const navigate = useNavigate();
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null); 

  
  const fetchBooks = async (query: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/books/search-books?searchQuery=${query}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setFilteredBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (query) {
        fetchBooks(query); 
      } else {
        setFilteredBooks([]); 
      }
    }, 1000); 
  };

  const handleBookClick = (bookId: number) => {
    navigate(`/book-details/${bookId}`); 
  };

  return (
    <Box style={{ position: "relative" }}>
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
                onClick={() => handleBookClick(book.id)}
                style={{ cursor: "pointer" }}
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
