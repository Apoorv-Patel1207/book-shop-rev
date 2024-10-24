import { useState, useEffect } from "react";
import booksData from "../constant/books.json";
import Layout from "../components/layout/layout";
import BookCard from "../components/book/book-card"; // Ensure BookCard is also updated to use Material UI if necessary
import Filters from "../components/catalog/filters"; // Import the Filters component
import { Typography, Container, Grid, Paper } from "@mui/material";

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  price: number;
  coverImage: string;
}

const Catalog: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGenre, setFilterGenre] = useState("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);

  useEffect(() => {
    setBooks(booksData);
  }, []);

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = filterGenre === "All" || book.genre === filterGenre;
    const matchesPrice =
      book.price >= priceRange[0] && book.price <= priceRange[1];
    return matchesSearch && matchesGenre && matchesPrice;
  });

  const [cart, setCart] = useState<Book[]>([]);

  const addToCart = (book: Book) => {
    setCart([...cart, book]);
  };

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ padding: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom textAlign="center">
          "Discover Your Next Read"
        </Typography>

        <Filters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterGenre={filterGenre}
          setFilterGenre={setFilterGenre}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />

        <Grid container spacing={3} sx={{ marginTop: 2 }}>
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={book.id}>
                <BookCard book={book} addToCart={addToCart} />
              </Grid>
            ))
          ) : (
            <Typography
              variant="h6"
              component="p"
              textAlign="center"
              sx={{ width: "100%" }}
            >
              No books found.
            </Typography>
          )}
        </Grid>
      </Container>
    </Layout>
  );
};

export default Catalog;
