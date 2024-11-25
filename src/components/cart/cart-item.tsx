import React, { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
} from "@mui/material";

interface CartItemProps {
  id: number;
  title: string;
  author: string;
  price: number;
  quantity: number;
  handleRemove: (id: number) => void;
  updateCartQuantity: (id: number, quantity: number) => void;
}

const CartItem = ({
  id,
  title,
  author,
  price,
  quantity,
  handleRemove,
  updateCartQuantity,
}: CartItemProps) => {
  const [itemQuantity, setItemQuantity] = useState(quantity);

  const handleIncrement = () => {
    const newQuantity = itemQuantity + 1;
    setItemQuantity(newQuantity);
    updateCartQuantity(id, newQuantity);
  };

  const handleDecrement = () => {
    if (itemQuantity > 1) {
      const newQuantity = itemQuantity - 1;
      setItemQuantity(newQuantity);
      updateCartQuantity(id, newQuantity);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Math.max(1, parseInt(e.target.value, 10) || 1);
    setItemQuantity(newQuantity);
    updateCartQuantity(id, newQuantity);
  };

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
        marginBottom: 2,
      }}
      variant="outlined"
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography fontWeight="bold" variant="h6">
          {title}
        </Typography>
        <Typography variant="body2">Author: {author}</Typography>
        <Typography variant="body2">Price: Rs {price.toFixed(2)}</Typography>
      </CardContent>
      <Box style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <IconButton onClick={handleDecrement}>
          <RemoveIcon />
        </IconButton>
        <TextField
          inputProps={{ min: 1 }}
          onChange={handleQuantityChange}
          size="small"
          sx={{ width: "80px" }}
          type="number"
          value={itemQuantity}
          variant="outlined"
        />
        <IconButton onClick={handleIncrement}>
          <AddIcon />
        </IconButton>
        <Button
          color="error"
          onClick={() => handleRemove(id)}
          variant="contained"
        >
          Remove
        </Button>
      </Box>
    </Card>
  );
};

export default CartItem;
