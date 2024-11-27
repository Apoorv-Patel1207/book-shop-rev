import React, { useState } from "react"

import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  FormHelperText,
} from "@mui/material"

interface CartItemProps {
  id: number
  title: string
  author: string
  price: number
  quantity: number
  stockQuantity: number
  handleRemove: (id: number) => void
  updateCartQuantity: (id: number, quantity: number) => void
}

const CartItem = ({
  id,
  title,
  author,
  price,
  quantity,
  stockQuantity,
  handleRemove,
  updateCartQuantity,
}: CartItemProps) => {
  const [itemQuantity, setItemQuantity] = useState(quantity)
  const [error, setError] = useState<string>("")

  const handleIncrement = () => {
    if (itemQuantity < stockQuantity) {
      const newQuantity = itemQuantity + 1
      setItemQuantity(newQuantity)
      updateCartQuantity(id, newQuantity)
      setError("")
    } else {
      setError(`Maximum available stock is ${stockQuantity}`)
    }
  }

  const handleDecrement = () => {
    if (itemQuantity > 1) {
      const newQuantity = itemQuantity - 1
      setItemQuantity(newQuantity)
      updateCartQuantity(id, newQuantity)
      setError("")
    }
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Math.max(1, parseInt(e.target.value, 10) || 1)

    if (newQuantity <= stockQuantity) {
      setItemQuantity(newQuantity)
      updateCartQuantity(id, newQuantity)
      setError("")
    } else {
      setError(`Maximum available stock is ${stockQuantity}`)
    }
  }

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
        marginBottom: 2,
      }}
      variant='outlined'
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography fontWeight='bold' variant='h6'>
          {title}
        </Typography>
        <Typography variant='body2'>Author: {author}</Typography>
        <Typography variant='body2'>Price: Rs {price.toFixed(2)}</Typography>
      </CardContent>
      <Box>
        <Box style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <IconButton disabled={itemQuantity <= 1} onClick={handleDecrement}>
            <RemoveIcon />
          </IconButton>
          <TextField
            inputProps={{ min: 1 }}
            onChange={handleQuantityChange}
            size='small'
            sx={{ width: "80px" }}
            // type='number'
            value={itemQuantity}
            variant='outlined'
          />
          <IconButton
            disabled={itemQuantity >= stockQuantity}
            onClick={handleIncrement}
          >
            <AddIcon />
          </IconButton>
          <Button
            color='error'
            onClick={() => handleRemove(id)}
            variant='contained'
          >
            Remove
          </Button>
        </Box>
        {error && (
          <FormHelperText error sx={{ marginTop: 1 }}>
            {error}
          </FormHelperText>
        )}
      </Box>
    </Card>
  )
}

export default CartItem
