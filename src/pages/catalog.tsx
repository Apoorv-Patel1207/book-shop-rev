import { useState, useEffect } from "react";
// import booksData from "../constant/books.json";
import Layout from "../components/layout/layout";
import BookCard from "../components/book/book-card";
import Filters from "../components/catalog/filters";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import axios from "axios";

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
  const [priceValue, setPriceValue] = useState<number[]>([0, 100]);

  // useEffect(() => {
  //   setBooks(booksData);
  // }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get("http://localhost:5000/books");
      setBooks(response.data);
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = filterGenre === "All" || book.genre === filterGenre;
    const matchesPrice =
      book.price >= priceValue[0] && book.price <= priceValue[1];
    return matchesSearch && matchesGenre && matchesPrice;
  });

  const [cart, setCart] = useState<Book[]>([]);

  console.log("cart: ", cart);

  const addToCart = (book: Book) => {
    setCart((prevCart) => [...prevCart, book]);
  };

  // const [refresh, setRefresh] = useState(false);

  const handleDelete = async (id: string) => {
    await axios.delete(`http://localhost:5000/books/${id}`);
    //  setRefresh((prev) => !prev); // Trigger re-fetch of books
  };

  return (
    <Layout>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        textAlign="center"
        color="#1F2937"
        fontWeight="bold"
        mb={4}
      >
        "Discover Your Next Read"
      </Typography>

      <Filters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterGenre={filterGenre}
        setFilterGenre={setFilterGenre}
        priceValue={priceValue}
        setPriceValue={setPriceValue}
      />

      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <Grid key={book.id} size={{ xs: 2, sm: 4, md: 4, lg: 2.4 }}>
              <BookCard
                book={book}
                addToCart={addToCart}
                handleDelete={handleDelete}
                // key={refresh}
              />
            </Grid>
          ))
        ) : (
          <Grid>
            <Typography
              variant="h6"
              component="p"
              textAlign="center"
              sx={{ width: "100%", padding: 2 }}
            >
              No books found.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Layout>
  );
};

export default Catalog;
