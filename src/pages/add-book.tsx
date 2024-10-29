import Layout from "../components/layout/layout";
import { Container, TextField, Button, Typography, Grid } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  genre: Yup.string().required("Genre is required"),
  price: Yup.number()
    .required("Price is required")
    .min(0, "Price must be a positive number"),
  coverImage: Yup.string().url("Must be a valid URL").optional(),
  description: Yup.string().optional(),
  publicationDate: Yup.date().optional(),
  ISBN: Yup.string().optional(),
  language: Yup.string().optional(),
  pages: Yup.number().min(1, "Pages must be at least 1").optional(),
  publisher: Yup.string().optional(),
});

const AdminPanel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const addedBook = await response.json();
        console.log("Book added successfully:", addedBook);
        // Optionally show a success message or update the state
      } else {
        console.error("Failed to add book:", response.statusText);
        // Optionally show an error message
      }
    } catch (error) {
      console.error("Error submitting book details:", error);
    }

    // Reset form fields after submission
    // You might consider using reset() from react-hook-form
  };

  return (
    <Layout>
      <Container maxWidth="md" sx={{ padding: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Panel - Add a New Book
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Title"
                {...register("title")}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Author"
                {...register("author")}
                error={!!errors.author}
                helperText={errors.author?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Genre"
                {...register("genre")}
                error={!!errors.genre}
                helperText={errors.genre?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price"
                type="number"
                {...register("price")}
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Cover Image URL"
                {...register("coverImage")}
                error={!!errors.coverImage}
                helperText={errors.coverImage?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                {...register("description")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Publication Date"
                type="date"
                {...register("publicationDate")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="ISBN" {...register("ISBN")} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Language" {...register("language")} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Pages"
                type="number"
                {...register("pages")}
                error={!!errors.pages}
                helperText={errors.pages?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Publisher"
                {...register("publisher")}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Add Book
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Layout>
  );
};

export default AdminPanel;
