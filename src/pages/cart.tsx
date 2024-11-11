import { useEffect, useState } from "react";

import {
  Typography,
  Button,
  Container,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import CartItem from "../components/cart/cart-item";
import Layout from "../components/layout/layout";
import {
  fetchCartItems,
  removeFromCart,
  clearCart,
  updateCartQuantityService,
} from "../service/cart-service";
import { placeOrder } from "../service/order-service";
import { CartItem as CartItemType, Order } from "../types/data-types";

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isClearCartModalOpen, setIsClearCartModalOpen] = useState(false);

  const navigate = useNavigate();

  const totalCost = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

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

  const handleRemove = async (id: number) => {
    try {
      await removeFromCart(id);
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove item");
    }
  };

  const updateCartQuantity = async (id: number, quantity: number) => {
    try {
      await updateCartQuantityService(id, quantity);
      setCartItems((prevItems) =>
        prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update quantity"
      );
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
      setCartItems([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to clear cart");
    }
  };

  const handleOpenCheckoutModal = () => setIsCheckoutModalOpen(true);
  const handleCloseCheckoutModal = () => setIsCheckoutModalOpen(false);

  const handleOpenClearCartModal = () => setIsClearCartModalOpen(true);
  const handleCloseClearCartModal = () => setIsClearCartModalOpen(false);

  // const handleConfirmCheckout = () => {
  //   handleCloseCheckoutModal();
  //   navigate("/checkout");
  // };

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const handleConfirmBuy = async () => {
    setIsPlacingOrder(true);

    const order: Order = {
      userId: 999999999,
      items: cartItems,
      totalAmount: Number(totalCost.toFixed(2)),
      orderDate: new Date().toISOString(),
      status: "Processing",
      shippingAddress: {
        recipientName: "currentUser.name",
        street: "currentUser.address.street",
        city: "currentUser.address.city",
        state: "currentUser.address.state",
        zipCode: "currentUser.address.zipCode",
        country: "currentUser.address.country",
      },
    };

    try {
      await placeOrder(order);
      alert("Order placed successfully!");
      handleCloseCheckoutModal();
      handleClearCart();
    } catch (error) {
      alert("Failed to place order. Please try again.");
      console.error(error);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const handleConfirmClearCart = () => {
    handleClearCart();
    handleCloseClearCartModal();
  };

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
          <Box style={{ marginBottom: "16px" }}>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  {...item}
                  handleRemove={handleRemove}
                  updateCartQuantity={updateCartQuantity}
                />
              ))
            ) : (
              <Typography textAlign="center">Your cart is empty.</Typography>
            )}
          </Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" component="h2">
              Total: Rs {totalCost.toFixed(2)}
            </Typography>
            <Box>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleOpenClearCartModal}
              >
                Clear Cart
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ marginLeft: "8px" }}
                onClick={handleOpenCheckoutModal}
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </Button>
            </Box>
          </Box>
        </Paper>

        <Dialog open={isCheckoutModalOpen} onClose={handleCloseCheckoutModal}>
          <DialogTitle>Confirm Checkout</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to proceed with the checkout? Your total is{" "}
              Rs {totalCost.toFixed(2)}.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCheckoutModal} color="primary">
              Cancel
            </Button>
            {/* <Button onClick={handleConfirmCheckout} color="primary">
              Confirm
            </Button> */}

            <Button
              onClick={handleConfirmBuy}
              variant="contained"
              color="primary"
              sx={{ ml: 1 }}
              disabled={isPlacingOrder}
            >
              {isPlacingOrder ? "Placing Order..." : "Confirm Buy"}
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={isClearCartModalOpen} onClose={handleCloseClearCartModal}>
          <DialogTitle>Clear Cart</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to clear the cart?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseClearCartModal} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmClearCart} color="secondary">
              Clear
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Layout>
  );
};

export default Cart;
