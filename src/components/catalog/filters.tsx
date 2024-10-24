import React from "react";
import {
  TextField,
  Select,
  MenuItem,
  Slider,
  Typography,
  Box,
} from "@mui/material";

interface BookFilterProps {
  searchQuery: string;
  filterGenre: string;
  priceRange: [number, number];
  setSearchQuery: (query: string) => void;
  setFilterGenre: (genre: string) => void;
  setPriceRange: (range: [number, number]) => void;
}

const BookFilter: React.FC<BookFilterProps> = ({
  searchQuery,
  filterGenre,
  priceRange,
  setSearchQuery,
  setFilterGenre,
  setPriceRange,
}) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleGenreFilter = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilterGenre(event.target.value as string);
  };

  const handlePriceRangeChange = (event: Event, newValue: number[]) => {
    setPriceRange(newValue as [number, number]);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        mb: 4,
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Search by title or author"
        value={searchQuery}
        onChange={handleSearch}
        fullWidth
        sx={{ flex: { md: "0 0 33%" } }}
      />
      {/* <Select
        value={filterGenre}
        onChange={handleGenreFilter}
        displayEmpty
        fullWidth
        sx={{ flex: { md: "0 0 25%" } }}
      >
        <MenuItem value="">
          <em>Filter by Genre</em>
        </MenuItem>
        <MenuItem value="All">All Genres</MenuItem>
        <MenuItem value="Classic">Classic</MenuItem>
        <MenuItem value="Dystopian">Dystopian</MenuItem>
      </Select> */}
      <Box sx={{ flex: { md: "0 0 33%" }, width: "100%" }}>
        <Typography variant="subtitle2" gutterBottom>
          Price
        </Typography>

        {/* <Slider
          value={priceRange}
          onChange={handlePriceRangeChange}
          valueLabelDisplay="auto"
          min={0}
          max={50}
          step={1}
          aria-labelledby="price-range-slider"
        /> */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            textAlign: "center",
          }}
        >
          <Typography variant="body2">Min: {priceRange[0]}</Typography>
          <Typography variant="body2">Max: {priceRange[1]}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default BookFilter;
