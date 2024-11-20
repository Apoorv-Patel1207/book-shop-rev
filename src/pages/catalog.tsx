import { useState, useEffect, useCallback } from "react"

import FilterListIcon from "@mui/icons-material/FilterList"
import {
  Box,
  CircularProgress,
  Drawer,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material"
import Grid from "@mui/material/Grid2"
import { useInView } from "react-intersection-observer"

import { deleteBook } from "src/service/book-service"
import { Book, PaginatedBook } from "src/types/data-types"

import BookCard from "../components/book/book-card"
import Filters from "../components/catalog/filters"
import Layout from "../components/layout/layout"

const Catalog = () => {
  const [books, setBooks] = useState<Book[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterGenre, setFilterGenre] = useState("all")
  const [priceValue, setPriceValue] = useState<number[]>([0, 100])
  const [tempSearchQuery, setTempSearchQuery] = useState("")
  const [tempFilterGenre, setTempFilterGenre] = useState("all")
  const [tempPriceValue, setTempPriceValue] = useState<number[]>([0, 100])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const { ref, inView } = useInView()
  const [isLoading, setIsLoading] = useState(true)
  const [isFetchingMore, setIsFetchingMore] = useState(false)

  const fetchBooks = useCallback(async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        searchQuery,
        filterGenre,
        priceMin: priceValue[0].toString(),
        priceMax: priceValue[1].toString(),
      })

      const response = await fetch(
        `http://localhost:5000/api/books?${params.toString()}`,
      )

      if (!response.ok) throw new Error("Failed to fetch books")

      const data = (await response.json()) as PaginatedBook
      const { books: paginatedBooks, pagination } = data

      // Update the pagination state
      setHasMore(pagination.currentPage < pagination.totalPages)
      setBooks((prevBooks) => [...prevBooks, ...paginatedBooks]) // Add new books to the list
    } catch (error) {
      console.error("Error fetching books:", error)
    } finally {
      setIsLoading(false)
      setIsFetchingMore(false)
    }
  }, [page, searchQuery, filterGenre, priceValue])

  useEffect(() => {
    if (inView && hasMore) {
      setIsFetchingMore(true)
      setPage((prevPage) => prevPage + 1)
    }
  }, [inView, hasMore])

  // useEffect(() => {
  //   fetchBooks()
  //   setIsFetchingMore(false)
  // }, [fetchBooks])

  useEffect(() => {
    const loadBooks = async () => {
      await fetchBooks() // Await the fetchBooks call to ensure proper handling
      setIsFetchingMore(false)
    }

    loadBooks().catch((error) => {
      console.error("Error loading books:", error) // Catch any errors
    })
  }, [fetchBooks])

  const handleDelete = async (id: number) => {
    try {
      await deleteBook(id)
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id))
    } catch (error) {
      console.error("Error deleting book:", error)
    }
  }

  const handleUpdateBook = (updatedBook: Book) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === updatedBook.id ? updatedBook : book,
      ),
    )
  }

  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open)
  }

  const handleApplyFilters = () => {
    setSearchQuery(tempSearchQuery)
    setFilterGenre(tempFilterGenre)
    setPriceValue(tempPriceValue)
    setPage(1)
    setBooks([])
    setDrawerOpen(false)
  }

  const handleResetFilters = () => {
    setSearchQuery("")
    setFilterGenre("all")
    setPriceValue([0, 100])

    setTempSearchQuery("")
    setTempFilterGenre("all")
    setTempPriceValue([0, 100])
    setPage(1)
    setBooks([])
    setDrawerOpen(false)
  }

  return (
    <Layout>
      <Typography
        textAlign='center'
        color='#1F2937'
        fontWeight='bold'
        sx={{ mb: { xs: 2, md: 4 } }}
        fontSize={{ xs: 20, md: 26 }}
      >
        Discover Your Next Read
      </Typography>

      <Box display='flex' justifyContent='end'>
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

      <Drawer anchor='right' open={drawerOpen} onClose={toggleDrawer(false)}>
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
        <Box display='flex' justifyContent='center' my={4}>
          <CircularProgress />
        </Box>
      )}

      <Grid container sx={{ marginTop: { md: 2 } }}>
        {books.length > 0
          ? books.map((book) => (
              <Grid
                key={book.id}
                size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2.4 }}
              >
                <BookCard
                  book={book}
                  handleDelete={handleDelete}
                  handleUpdateBook={handleUpdateBook}
                />
              </Grid>
            ))
          : !isLoading && (
              <Grid>
                <Typography
                  variant='h6'
                  component='p'
                  textAlign='center'
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
  )
}

export default Catalog
