import React from "react";
import {
  TextField,
  Select,
  MenuItem,
  Slider,
  Typography,
  Box,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";

interface BookFilterProps {
  searchQuery: string;
  filterGenre: string;
  priceValue: number[];
  setSearchQuery: (query: string) => void;
  setFilterGenre: (genre: string) => void;
  setPriceValue: (priceValue: number[]) => void;
}

const BookFilter: React.FC<BookFilterProps> = ({
  searchQuery,
  filterGenre,
  priceValue,
  setSearchQuery,
  setFilterGenre,
  setPriceValue,
}) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleGenreFilter = (event: SelectChangeEvent) => {
    setFilterGenre(event.target.value as string);
  };

  const handleChangePriceFilter = (
    event: Event,
    newValue: number | number[]
  ) => {
    setPriceValue(newValue as number[]);
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

      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel>Genre</InputLabel>
          <Select
            value={filterGenre}
            label="Filter Genre"
            onChange={handleGenreFilter}
          >
            <MenuItem value="All">All Genres</MenuItem>
            <MenuItem value="Classic">Classic</MenuItem>
            <MenuItem value="Dystopian">Dystopian</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ flex: { md: "0 0 33%" }, width: "100%" }}>
        <Typography variant="subtitle2" gutterBottom>
          Price
        </Typography>

        <Slider
          getAriaLabel={() => "Temperature range"}
          value={priceValue}
          onChange={handleChangePriceFilter}
          valueLabelDisplay="auto"
          max={100}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            textAlign: "center",
          }}
        >
          <Typography variant="body2">Min: {priceValue[0]}</Typography>
          <Typography variant="body2">Max: {priceValue[1]}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default BookFilter;
