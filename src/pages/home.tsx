import { Container, Typography, Button } from "@mui/material"

import Layout from "../components/layout/layout"

const Home = () => (
  <Layout>
    <Container maxWidth='sm' sx={{ textAlign: "center", marginTop: 4 }}>
      <Typography variant='h4' component='h1' gutterBottom>
        Welcome to the Online Bookstore!
      </Typography>
      <Typography variant='body1'>
        Browse through a wide variety of books and find your next great read.
      </Typography>
      <Button
        variant='contained'
        color='primary'
        href='/catalog'
        sx={{ marginTop: 2, bgcolor: "#001F3F" }}
      >
        Browse Books
      </Button>
    </Container>
  </Layout>
)

export default Home
