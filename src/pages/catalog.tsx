import { useState, useEffect, useCallback, useMemo } from "react";
import { useInView } from "react-intersection-observer";
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

  const [cart, setCart] = useState<Book[]>([]);
  console.log("cart: ", cart);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView(); 

  const fetchBooks = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/books", {
        params: { page, limit: 10 },
      });
      if (response.data.length < 10) setHasMore(false);
      setBooks((prevBooks) => [...prevBooks, ...response.data]);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }, [page]);

  useEffect(() => {
    if (inView && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = filterGenre === "All" || book.genre === filterGenre;
      const matchesPrice =
        book.price >= priceValue[0] && book.price <= priceValue[1];
      return matchesSearch && matchesGenre && matchesPrice;
    });
  }, [books, searchQuery, filterGenre, priceValue]);

  const addToCart = (book: Book) => {
    setCart((prevCart) => [...prevCart, book]);
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`http://localhost:5000/books/${id}`);
    fetchBooks();
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

      {hasMore && (
        <div ref={ref} style={{ height: "1px" }} /> 
      )}
    </Layout>
  );
};

export default Catalog;
