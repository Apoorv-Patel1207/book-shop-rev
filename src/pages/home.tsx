import React from "react";
import Layout from "../components/layout/layout";
import { Container, Typography, Button } from "@mui/material";

const Home: React.FC = () => {
  return (
    <Layout>
      <Container maxWidth="sm" sx={{ textAlign: "center", marginTop: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to the Online Bookstore!
        </Typography>
        <Typography variant="body1" paragraph>
          Browse through a wide variety of books and find your next great read.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href="/catalog"
          sx={{ marginTop: 2 }}
        >
          Browse Books
        </Button>
      </Container>
    </Layout>
  );
};

export default Home;
