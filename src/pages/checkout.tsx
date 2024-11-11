import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Button,
  Stack,
  CardMedia,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import Layout from "../components/layout/layout";

const Checkout = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/"); 
  };

  return (
    <Layout>
      <Container maxWidth="md" sx={{ mt: 10, textAlign: "center" }}>
        {/* Success Message */}
        <Box display="flex" flexDirection="column" alignItems="center">
          <CheckCircleIcon color="success" sx={{ fontSize: 60 }} />
          <Typography variant="h4" fontWeight="bold" sx={{ mt: 2 }}>
            Thank You for Your Purchase!
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
            Your order has been successfully placed. We hope you enjoy your new
            books!
          </Typography>
        </Box>

        {/* Order Summary Card */}
        <Card variant="outlined" sx={{ mt: 4, p: 2 }}>
          <CardContent>
            <Typography
              variant="h5"
              fontWeight="bold"
              align="center"
              gutterBottom
            >
              Order Summary
            </Typography>

            {/* Dummy Book List */}
            <Stack spacing={2} mt={3}>
              <Box display="flex" alignItems="center">
                <CardMedia
                  component="img"
                  alt="Book Cover"
                  height="60"
                  image="https://via.placeholder.com/60x90.png" // Dummy image
                  sx={{ borderRadius: 1, mr: 2 }}
                />
                <Box textAlign="left">
                  <Typography variant="body1" fontWeight="bold">
                    The Great Gatsby
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Quantity: 1
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ₹ 299.00
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" alignItems="center">
                <CardMedia
                  component="img"
                  alt="Book Cover"
                  height="60"
                  image="https://via.placeholder.com/60x90.png" // Dummy image
                  sx={{ borderRadius: 1, mr: 2 }}
                />
                <Box textAlign="left">
                  <Typography variant="body1" fontWeight="bold">
                    To Kill a Mockingbird
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Quantity: 2
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ₹ 499.00
                  </Typography>
                </Box>
              </Box>
            </Stack>

            {/* Divider */}
            <Divider sx={{ my: 2 }} />

            {/* Total Price */}
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="body1" fontWeight="bold">
                Total
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                ₹ 1297.00
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Footer Buttons */}
        <Box mt={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleBackToHome}
            sx={{ mr: 2 }}
          >
            Continue Shopping
          </Button>
          <Button variant="outlined" color="secondary">
            View Order Details
          </Button>
        </Box>
      </Container>
    </Layout>
  );
};

export default Checkout;
