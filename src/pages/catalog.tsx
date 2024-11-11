import { useState, useEffect, useCallback, useMemo } from "react";

import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Box,
  CircularProgress,
  Drawer,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
// import axios from "axios";
import { useInView } from "react-intersection-observer";

import { deleteBook } from "src/service/book-service";

import BookCard from "../components/book/book-card";
import Filters from "../components/catalog/filters";
import Layout from "../components/layout/layout";

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  price: number;
  coverImage: string;
}

const Catalog = () => {
  const [books, setBooks] = useState<Book[]>([]);
  console.log("books: ", books);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGenre, setFilterGenre] = useState("All");
  const [priceValue, setPriceValue] = useState<number[]>([0, 100]);
  const [tempSearchQuery, setTempSearchQuery] = useState("");
  const [tempFilterGenre, setTempFilterGenre] = useState("All");
  const [tempPriceValue, setTempPriceValue] = useState<number[]>([0, 100]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  const [isLoading, setIsLoading] = useState(true);

  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const fetchBooks = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        searchQuery,
        filterGenre,
        priceMin: priceValue[0].toString(),
        priceMax: priceValue[1].toString(),
      });

      const response = await fetch(
        `http://localhost:5000/api/books?${params.toString()}`
      );

      if (!response.ok) throw new Error("Failed to fetch books");

      const data = (await response.json()) as Book[];
      if (data.length < 10) setHasMore(false);
      setBooks((prevBooks) => [...prevBooks, ...data]);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setIsLoading(false);
      console.log("Books:", books);
      console.log(
        "Search Query:",
        searchQuery,
        "Genre Filter:",
        filterGenre,
        "Price Range:",
        priceValue[0],
        priceValue[1]
      );
    }
  }, [page, searchQuery, filterGenre, priceValue]);

  // const fetchBooks = useCallback(async () => {
  //   setIsLoading(true);
  //   try {
  //     const params = new URLSearchParams({
  //       page: page.toString(),
  //       limit: "10",
  //       searchQuery,
  //       filterGenre,
  //       priceMin: priceValue[0].toString(),
  //       priceMax: priceValue[1].toString(),
  //     });

  //     const response = await fetch(
  //       `http://localhost:5000/api/books?${params.toString()}`
  //     );
  //     if (!response.ok) throw new Error("Failed to fetch books");

  //     const data = await response.json();

  //     console.log("Fetched data:", data);

  //     if (data.books.length < 10) setHasMore(false);
  //     // setBooks((prevBooks) => [...prevBooks, ...data.books]);

  //     setBooks((prevBooks) => {
  //       const updatedBooks = [...prevBooks, ...data.books];
  //       console.log("Updated books state:", updatedBooks); // Verify state update
  //       return updatedBooks;
  //     });
  //   } catch (error) {
  //     console.error("Error fetching books:", error);
  //   } finally {
  //     setIsLoading(false);
  //     setIsFetchingMore(false);
  //   }
  // }, [page, searchQuery, filterGenre, priceValue]);

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

  // const filteredBooks = useMemo(() => {
  //   return books.filter((book) => {
  //     const matchesSearch =
  //       (book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //         book.author?.toLowerCase().includes(searchQuery.toLowerCase())) ??
  //       false;

  //     const matchesGenre = filterGenre === "All" || book.genre === filterGenre;

  //     const matchesPrice =
  //       book.price >= priceValue[0] && book.price <= priceValue[1];

  //     return matchesSearch && matchesGenre && matchesPrice;
  //   });
  // }, [books, searchQuery, filterGenre, priceValue]);

  const handleDelete = async (id: number) => {
    try {
      await deleteBook(id); // Call delete book service
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id)); // Remove book from state
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
        Discover Your Next Read
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

      <Grid container sx={{ marginTop: { md: 2 } }}>
        {books.length > 0
          ? books.map((book, index) => (
              <Grid
                key={book.id + index}
                size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2.4 }}
              >
                <BookCard book={book} handleDelete={handleDelete} />
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

      {hasMore && <Box ref={ref} style={{ height: "1px" }} />}
    </Layout>
  );
};

export default Catalog;

// import { useState, useEffect, useCallback } from "react";
// import FilterListIcon from "@mui/icons-material/FilterList";
// import {
//   Box,
//   CircularProgress,
//   Drawer,
//   IconButton,
//   LinearProgress,
//   Typography,
// } from "@mui/material";
// import Grid from "@mui/material/Grid2";
// import { useInView } from "react-intersection-observer";

// import { deleteBook } from "src/service/book-service";

// import BookCard from "../components/book/book-card";
// import Filters from "../components/catalog/filters";
// import Layout from "../components/layout/layout";

// interface Book {
//   id: number;
//   title: string;
//   author: string;
//   genre: string;
//   price: number;
//   coverImage: string;
// }

// const Catalog = () => {
//   const [books, setBooks] = useState<Book[]>([]);
//   console.log("books: ", books);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterGenre, setFilterGenre] = useState("All");
//   const [priceValue, setPriceValue] = useState<number[]>([0, 100]);
//   const [tempSearchQuery, setTempSearchQuery] = useState("");
//   const [tempFilterGenre, setTempFilterGenre] = useState("All");
//   const [tempPriceValue, setTempPriceValue] = useState<number[]>([0, 100]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const { ref, inView } = useInView();
//   const [isLoading, setIsLoading] = useState(true);
//   const [isFetchingMore, setIsFetchingMore] = useState(false);

//   const fetchBooks = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const params = new URLSearchParams({
//         page: page.toString(),
//         limit: "10",
//         searchQuery,
//         filterGenre,
//         priceMin: priceValue[0].toString(),
//         priceMax: priceValue[1].toString(),
//       });

//       const response = await fetch(
//         `http://localhost:5000/api/books?${params.toString()}`
//       );
//       if (!response.ok) throw new Error("Failed to fetch books");

//       const data = await response.json();
//       if (data.books.length < 10) setHasMore(false);
//       setBooks((prevBooks) => [...prevBooks, ...data.books]);
//     } catch (error) {
//       console.error("Error fetching books:", error);
//     } finally {
//       setIsLoading(false);
//       setIsFetchingMore(false);
//     }
//   }, [page, searchQuery, filterGenre, priceValue]);

//   useEffect(() => {
//     if (inView && hasMore) {
//       setIsFetchingMore(true);
//       setPage((prevPage) => prevPage + 1);
//     }
//   }, [inView, hasMore]);

//   useEffect(() => {
//     fetchBooks();
//   }, [fetchBooks]);

//   const handleDelete = async (id: number) => {
//     try {
//       await deleteBook(id); // Call delete book service
//       setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id)); // Remove book from state
//     } catch (error) {
//       console.error("Error deleting book:", error);
//     }
//   };

//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const toggleDrawer = (open: boolean) => () => {
//     setDrawerOpen(open);
//   };

//   const handleApplyFilters = () => {
//     setSearchQuery(tempSearchQuery);
//     setFilterGenre(tempFilterGenre);
//     setPriceValue(tempPriceValue);
//     setPage(1);
//     setBooks([]); // Clear current books for fresh API call
//     setHasMore(true);
//     setDrawerOpen(false);
//   };

//   const handleResetFilters = () => {
//     setSearchQuery("");
//     setFilterGenre("All");
//     setPriceValue([0, 100]);

//     setTempSearchQuery("");
//     setTempFilterGenre("All");
//     setTempPriceValue([0, 100]);
//     setPage(1);
//     setBooks([]); // Clear current books for fresh API call
//     setHasMore(true);
//     setDrawerOpen(false);
//   };

//   return (
//     <Layout>
//       <Typography
//         textAlign="center"
//         color="#1F2937"
//         fontWeight="bold"
//         sx={{ mb: { xs: 2, md: 4 } }}
//         fontSize={{ xs: 20, md: 26 }}
//       >
//         Discover Your Next Read
//       </Typography>

//       <Box display="flex" justifyContent="end">
//         <IconButton
//           onClick={toggleDrawer(true)}
//           sx={{
//             bgcolor: "#1F2937",
//             color: "white",
//             mr: 2,
//             "&:hover": {
//               color: "black",
//             },
//           }}
//         >
//           <FilterListIcon />
//         </IconButton>
//       </Box>

//       <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
//         <Filters
//           tempSearchQuery={tempSearchQuery}
//           setTempSearchQuery={setTempSearchQuery}
//           tempFilterGenre={tempFilterGenre}
//           setTempFilterGenre={setTempFilterGenre}
//           tempPriceValue={tempPriceValue}
//           setTempPriceValue={setTempPriceValue}
//           handleApplyFilters={handleApplyFilters}
//           handleResetFilters={handleResetFilters}
//         />
//       </Drawer>

//       {isLoading && (
//         <Box display="flex" justifyContent="center" my={4}>
//           <CircularProgress />
//         </Box>
//       )}

//       <Grid container sx={{ marginTop: { md: 2 } }}>
//         {books.length > 0
//           ? books.map((book) => (
//               <Grid
//                 key={book.id}
//                 size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2.4 }}
//               >
//                 <BookCard book={book} handleDelete={handleDelete} />
//               </Grid>
//             ))
//           : !isLoading && (
//               <Grid>
//                 <Typography
//                   variant="h6"
//                   component="p"
//                   textAlign="center"
//                   sx={{ width: "100%", padding: 2 }}
//                 >
//                   No books found.
//                 </Typography>
//               </Grid>
//             )}
//       </Grid>

//       {isFetchingMore && (
//         <Box sx={{ width: "100%" }}>
//           <LinearProgress />
//         </Box>
//       )}

//       {hasMore && <Box ref={ref} style={{ height: "1px" }} />}
//     </Layout>
//   );
// };

// export default Catalog;
