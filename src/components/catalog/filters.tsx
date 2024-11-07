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
  Button,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

interface BookFilterProps {
  tempSearchQuery: string;
  tempFilterGenre: string;
  tempPriceValue: number[];
  setTempSearchQuery: (query: string) => void;
  setTempFilterGenre: (genre: string) => void;
  setTempPriceValue: (tempPriceValue: number[]) => void;
  handleApplyFilters: () => void;
  handleResetFilters: () => void;
}

const BookFilter = ({
  tempSearchQuery,
  tempFilterGenre,
  tempPriceValue,
  setTempSearchQuery,
  setTempFilterGenre,
  setTempPriceValue,
  handleApplyFilters,
  handleResetFilters,
}: BookFilterProps) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempSearchQuery(event.target.value.toLowerCase());
  };

  const handleGenreFilter = (event: SelectChangeEvent<string>) => {
    setTempFilterGenre(event.target.value);
  };

  const handleChangePriceFilter = (
    event: Event,
    newValue: number | number[]
  ) => {
    setTempPriceValue(newValue as number[]);
  };

  return (
    <Box
      sx={{
        padding: 2,
        width: 300,
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Search by title or author"
        value={tempSearchQuery}
        onChange={handleSearch}
        fullWidth
      />

      <Box sx={{ minWidth: 120, marginTop: 2 }}>
        <FormControl fullWidth>
          <InputLabel>Genre</InputLabel>
          <Select
            value={tempFilterGenre}
            label="Filter Genre"
            onChange={handleGenreFilter}
          >
            <MenuItem value="All">All Genres</MenuItem>
            <MenuItem value="Classic">Classic</MenuItem>
            <MenuItem value="Dystopian">Dystopian</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ marginTop: 2, px: 1 }}>
        <Typography variant="subtitle2" gutterBottom>
          Price
        </Typography>

        <Slider
          value={tempPriceValue}
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
          <Typography variant="body2">Min: {tempPriceValue[0]}</Typography>
          <Typography variant="body2">Max: {tempPriceValue[1]}</Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 1, marginTop: 2 }}>
        <Button
          variant="contained"
          onClick={handleApplyFilters}
          sx={{ flex: 1 }}
        >
          Apply
        </Button>
        <Button
          variant="outlined"
          onClick={handleResetFilters}
          sx={{ flex: 1 }}
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default BookFilter;
