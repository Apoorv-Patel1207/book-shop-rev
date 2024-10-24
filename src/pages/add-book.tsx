import Layout from "../components/layout/layout";
import { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

const AdminPanel = () => {
  const [bookDetails, setBookDetails] = useState({
    title: "",
    author: "",
    genre: "",
    price: "",
    coverImage: "",
    description: "",
    publicationDate: "",
    ISBN: "",
    language: "",
    pages: "",
    publisher: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBookDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Book details submitted:", bookDetails);

    setBookDetails({
      title: "",
      author: "",
      genre: "",
      price: "",
      coverImage: "",
      description: "",
      publicationDate: "",
      ISBN: "",
      language: "",
      pages: "",
      publisher: "",
    });
  };

  return (
    <Layout>
      <Container maxWidth="md" sx={{ padding: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Panel - Add a New Book
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={bookDetails.title}
              onChange={handleChange}
              required
            />
          </Box>

          <Box mb={2}>
            <TextField
              fullWidth
              label="Author"
              name="author"
              value={bookDetails.author}
              onChange={handleChange}
              required
            />
          </Box>

          <Box mb={2}>
            <TextField
              fullWidth
              label="Genre"
              name="genre"
              value={bookDetails.genre}
              onChange={handleChange}
              required
            />
          </Box>

          <Box mb={2}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={bookDetails.price}
              onChange={handleChange}
              required
              inputProps={{ step: 0.01 }}
            />
          </Box>

          <Box mb={2}>
            <TextField
              fullWidth
              label="Cover Image URL"
              name="coverImage"
              value={bookDetails.coverImage}
              onChange={handleChange}
            />
          </Box>

          <Box mb={2}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={bookDetails.description}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </Box>

          <Box mb={2}>
            <TextField
              fullWidth
              label="Publication Date"
              name="publicationDate"
              type="date"
              value={bookDetails.publicationDate}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>

          <Box mb={2}>
            <TextField
              fullWidth
              label="ISBN"
              name="ISBN"
              value={bookDetails.ISBN}
              onChange={handleChange}
            />
          </Box>

          <Box mb={2}>
            <TextField
              fullWidth
              label="Language"
              name="language"
              value={bookDetails.language}
              onChange={handleChange}
            />
          </Box>

          <Box mb={2}>
            <TextField
              fullWidth
              label="Pages"
              name="pages"
              type="number"
              value={bookDetails.pages}
              onChange={handleChange}
            />
          </Box>

          <Box mb={2}>
            <TextField
              fullWidth
              label="Publisher"
              name="publisher"
              value={bookDetails.publisher}
              onChange={handleChange}
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Add Book
          </Button>
        </form>
      </Container>
    </Layout>
  );
};

export default AdminPanel;
