import { useState, useEffect, useCallback, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import Layout from "../components/layout/layout";
import BookCard from "../components/book/book-card";
import Filters from "../components/catalog/filters";
import {
  Box,
  CircularProgress,
  Drawer,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import axios from "axios";
import FilterListIcon from "@mui/icons-material/FilterList";

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

  const [tempSearchQuery, setTempSearchQuery] = useState("");
  const [tempFilterGenre, setTempFilterGenre] = useState("All");
  const [tempPriceValue, setTempPriceValue] = useState<number[]>([0, 100]);

  const [cart, setCart] = useState<Book[]>([]);
  console.log("cart: ", cart);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  const [isLoading, setIsLoading] = useState(true);

  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const fetchBooks = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/books", {
        params: { page, limit: 10 },
      });
      if (response.data.length < 10) setHasMore(false);
      setBooks((prevBooks) => [...prevBooks, ...response.data]);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    if (inView && hasMore) {
      setIsFetchingMore(true);
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore]);

  useEffect(() => {
    fetchBooks();
    setIsFetchingMore(false);
  }, [fetchBooks]);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        (book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author?.toLowerCase().includes(searchQuery.toLowerCase())) ??
        false;

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
    try {
      await axios.delete(`http://localhost:5000/books/${id}`);

      setBooks((prevBooks) =>
        prevBooks.filter((book) => book.id.toString() !== id)
      );
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleApplyFilters = () => {
    setSearchQuery(tempSearchQuery);
    setFilterGenre(tempFilterGenre);
    setPriceValue(tempPriceValue);
    setDrawerOpen(false);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setFilterGenre("All");
    setPriceValue([0, 100]);

    setTempSearchQuery("");
    setTempFilterGenre("All");
    setTempPriceValue([0, 100]);
    setDrawerOpen(false);
  };

  return (
    <Layout>
      <Typography
        textAlign="center"
        color="#1F2937"
        fontWeight="bold"
        sx={{ mb: { xs: 2, md: 4 } }}
        fontSize={{ xs: 20, md: 26 }}
      >
        "Discover Your Next Read"
      </Typography>

      <Box display="flex" justifyContent="end">
        <IconButton
          onClick={toggleDrawer(true)}
          sx={{
            bgcolor: "#1F2937",
            color: "white",
            mr: 2,
            "&:hover": {
              color: "black",
            },
          }}
        >
          <FilterListIcon />
        </IconButton>
      </Box>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Filters
          tempSearchQuery={tempSearchQuery}
          setTempSearchQuery={setTempSearchQuery}
          tempFilterGenre={tempFilterGenre}
          setTempFilterGenre={setTempFilterGenre}
          tempPriceValue={tempPriceValue}
          setTempPriceValue={setTempPriceValue}
          handleApplyFilters={handleApplyFilters}
          handleResetFilters={handleResetFilters}
        />
      </Drawer>

      {isLoading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      <Grid
        container
        // spacing={2}
        sx={{ marginTop: { md: 2 } }}
      >
        {filteredBooks.length > 0
          ? filteredBooks.map((book, index) => (
              <Grid
                key={book.id + index}
                size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2.4 }}
              >
                <BookCard
                  book={book}
                  addToCart={addToCart}
                  handleDelete={handleDelete}
                />
              </Grid>
            ))
          : !isLoading && (
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

      {isFetchingMore && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}

      {hasMore && <div ref={ref} style={{ height: "1px" }} />}
    </Layout>
  );
};

export default Catalog;
