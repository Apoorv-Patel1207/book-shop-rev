// import React from "react";
// import CartItem from "../components/cart/cart-item"; // Ensure CartItem is also updated to use Material UI if necessary
// import Layout from "../components/layout/layout";
// import { Typography, Button, Container, Paper } from "@mui/material";

// const Cart: React.FC = () => {
//   const cartItems = [
//     { id: 1, title: "Book 1", author: "Author 1", price: 20, quantity: 2 },
//     { id: 2, title: "Book 2", author: "Author 2", price: 15, quantity: 1 },
//   ];

//   const totalCost = cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   return (
//     <Layout>
//       <Container maxWidth="lg" sx={{ marginTop: 4 }}>

//         <Typography
//           textAlign="center"
//           color="#1F2937"
//           fontWeight="bold"
//           sx={{ mb: { xs: 2, md: 4 } }}
//           fontSize={{ xs: 20, md: 26 }}
//         >
//           Shopping Cart
//         </Typography>

//         <Paper elevation={3} sx={{ padding: 2 }}>
//           <div style={{ marginBottom: "16px" }}>
//             {cartItems.map((item) => (
//               <CartItem key={item.id} {...item} />
//             ))}
//           </div>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <Typography variant="h6" component="h2">
//               Total: Rs {totalCost.toFixed(2)}
//             </Typography>
//             <Button variant="contained" color="primary">
//               Proceed to Checkout
//             </Button>
//           </div>
//         </Paper>
//       </Container>
//     </Layout>
//   );
// };

// export default Cart;

// import React, { useEffect, useState } from "react";
// import CartItem from "../components/cart/cart-item";
// import Layout from "../components/layout/layout";
// import { Typography, Button, Container, Paper } from "@mui/material";
// import { CartItem as CartItemType } from "../types/book"; // Import your CartItem type
// import {
//   fetchCartItems,
//   addToCart,
//   removeFromCart,
//   clearCart,
// } from "../service/cart-service";

// const Cart: React.FC = () => {
//   const [cartItems, setCartItems] = useState<CartItemType[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const totalCost = cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   // Fetch cart items from the backend
//   const getCartItems = async () => {
//     try {
//       const items = await fetchCartItems();
//       setCartItems(items);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "An error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Remove item from cart
//   const handleRemove = async (id: number) => {
//     try {
//       await removeFromCart(id);
//       setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to remove item");
//     }
//   };

//   // Clear the cart
//   const handleClearCart = async () => {
//     try {
//       await clearCart();
//       setCartItems([]);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to clear cart");
//     }
//   };

//   useEffect(() => {
//     getCartItems();
//   }, []);

//   const handleCheckout = () => {
//     console.log("Proceeding to checkout");
//     // You can use navigate("/checkout") here if you are using React Router
//   };

//   if (loading) {
//     return (
//       <Layout>
//         <Container maxWidth="lg" sx={{ marginTop: 4 }}>
//           <Typography textAlign="center">Loading...</Typography>
//         </Container>
//       </Layout>
//     );
//   }

//   if (error) {
//     return (
//       <Layout>
//         <Container maxWidth="lg" sx={{ marginTop: 4 }}>
//           <Typography textAlign="center" color="error">
//             {error}
//           </Typography>
//         </Container>
//       </Layout>
//     );
//   }

//   return (
//     <Layout>
//       <Container maxWidth="lg" sx={{ marginTop: 4 }}>
//         <Typography
//           textAlign="center"
//           color="#1F2937"
//           fontWeight="bold"
//           sx={{ mb: { xs: 2, md: 4 } }}
//           fontSize={{ xs: 20, md: 26 }}
//         >
//           Shopping Cart
//         </Typography>

//         <Paper elevation={3} sx={{ padding: 2 }}>
//           <div style={{ marginBottom: "16px" }}>
//             {cartItems.length > 0 ? (
//               cartItems.map((item) => <CartItem key={item.id} {...item} />)
//             ) : (
//               <Typography textAlign="center">Your cart is empty.</Typography>
//             )}
//           </div>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <Typography variant="h6" component="h2">
//               Total: Rs {totalCost.toFixed(2)}
//             </Typography>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleCheckout}
//               disabled={cartItems.length === 0}
//             >
//               Proceed to Checkout
//             </Button>
//           </div>
//         </Paper>
//       </Container>
//     </Layout>
//   );
// };

// export default Cart;

// src/pages/Cart.tsx
import React, { useEffect, useState } from "react";
import CartItem from "../components/cart/cart-item";
import Layout from "../components/layout/layout";
import { Typography, Button, Container, Paper } from "@mui/material";
import { CartItem as CartItemType } from "../types/book";
import {
  fetchCartItems,
  addToCart,
  removeFromCart,
  clearCart,
} from "../service/cart-service";

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const totalCost = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Fetch cart items
  const getCartItems = async () => {
    try {
      const items = await fetchCartItems();
      setCartItems(items);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Remove item from cart
  const handleRemove = async (id: number) => {
    try {
      await removeFromCart(id);
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove item");
    }
  };

  // Clear the cart
  const handleClearCart = async () => {
    try {
      await clearCart();
      setCartItems([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to clear cart");
    }
  };

  // Use effect to fetch cart items on component mount
  useEffect(() => {
    getCartItems();
  }, []);

  if (loading) {
    return (
      <Layout>
        <Container maxWidth="lg" sx={{ marginTop: 4 }}>
          <Typography textAlign="center">Loading...</Typography>
        </Container>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Container maxWidth="lg" sx={{ marginTop: 4 }}>
          <Typography textAlign="center" color="error">
            {error}
          </Typography>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        <Typography
          textAlign="center"
          color="#1F2937"
          fontWeight="bold"
          sx={{ mb: { xs: 2, md: 4 } }}
          fontSize={{ xs: 20, md: 26 }}
        >
          Shopping Cart
        </Typography>

        <Paper elevation={3} sx={{ padding: 2 }}>
          <div style={{ marginBottom: "16px" }}>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartItem key={item.id} {...item} handleRemove={handleRemove} />
              ))
            ) : (
              <Typography textAlign="center">Your cart is empty.</Typography>
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" component="h2">
              Total: Rs {totalCost.toFixed(2)}
            </Typography>
            <div>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClearCart}
              >
                Clear Cart
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ marginLeft: "8px" }}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </Paper>
      </Container>
    </Layout>
  );
};

export default Cart;
