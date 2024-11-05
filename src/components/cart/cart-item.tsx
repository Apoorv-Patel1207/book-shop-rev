// import React, { useState } from "react";
// import {
//   Button,
//   TextField,
//   Card,
//   CardContent,
//   Typography,
// } from "@mui/material";

// interface CartItemProps {
//   id: number;
//   title: string;
//   author: string;
//   price: number;
//   quantity: number;
//   handleRemove: any;
// }

// const CartItem: React.FC<CartItemProps> = ({
//   id,
//   title,
//   author,
//   price,
//   quantity,
//   handleRemove,
// }) => {
//   const [itemQuantity, setItemQuantity] = useState(quantity);

//   const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newQuantity = parseInt(e.target.value, 10);
//     if (newQuantity > 0) {
//       setItemQuantity(newQuantity);
//     }
//   };

//   return (
//     <Card
//       variant="outlined"
//       sx={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         padding: 2,
//         marginBottom: 2,
//       }}
//     >
//       <CardContent sx={{ flexGrow: 1 }}>
//         <Typography variant="h6" component="div" fontWeight="bold">
//           {title}
//         </Typography>
//         <Typography variant="body2">Author: {author}</Typography>
//         <Typography variant="body2">Price: Rs {price.toFixed(2)}</Typography>
//       </CardContent>
//       <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
//         <TextField
//           type="number"
//           inputProps={{ min: 1 }}
//           value={itemQuantity}
//           onChange={handleQuantityChange}
//           variant="outlined"
//           size="small"
//           sx={{ width: "80px" }}
//         />
//         <Button variant="contained" color="error">
//           Remove
//         </Button>
//       </div>
//     </Card>
//   );
// };

// export default CartItem;


import React, { useState } from "react";
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

interface CartItemProps {
  id: number;
  title: string;
  author: string;
  price: number;
  quantity: number;
  handleRemove: (id: number) => void; // Specify the function type
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  title,
  author,
  price,
  quantity,
  handleRemove,
}) => {
  const [itemQuantity, setItemQuantity] = useState(quantity);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity > 0) {
      setItemQuantity(newQuantity);
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
        marginBottom: 2,
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="div" fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="body2">Author: {author}</Typography>
        <Typography variant="body2">Price: Rs {price.toFixed(2)}</Typography>
      </CardContent>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <TextField
          type="number"
          inputProps={{ min: 1 }}
          value={itemQuantity}
          onChange={handleQuantityChange}
          variant="outlined"
          size="small"
          sx={{ width: "80px" }}
        />
        <Button
          variant="contained"
          color="error"
          onClick={() => handleRemove(id)} // Call handleRemove with the item's ID
        >
          Remove
        </Button>
      </div>
    </Card>
  );
};

export default CartItem;
