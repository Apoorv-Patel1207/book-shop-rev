import { yupResolver } from "@hookform/resolvers/yup";
import {
  Container,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useForm, SubmitHandler } from "react-hook-form";
import * as Yup from "yup";

import { Book } from "src/types/data-types";

import Layout from "../components/layout/layout";
import { GENRES } from "src/constant/genres";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  genre: Yup.string().required("Genre is required"),
  price: Yup.number()
    .required("Price is required")
    .min(0, "Price must be a positive number"),
  coverImage: Yup.string().url("Must be a valid URL").optional(),
  description: Yup.string().optional(),
  publicationDate: Yup.string().optional(),
  language: Yup.string().optional(),
  pages: Yup.number().min(1, "Pages must be at least 1").optional(),
  publisher: Yup.string().optional(),
  ISBN: Yup.string().optional(),
  stockQuantity: Yup.number()
    .required("Stock Quantity is required")
    .min(0, "Stock quantity must be a positive number"),
});

const AdminPanel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      price: 0,
      coverImage:
        "https://media.istockphoto.com/id/1460007178/photo/library-books-on-table-and-background-for-studying-learning-and-research-in-education-school.jpg?s=1024x1024&w=is&k=20&c=cuzIXmvKHLpoGxGIft9zCiTw-jeL0Gjp7UNZau0MNkk=",
      description: "",
      publicationDate: new Date().toISOString().split("T")[0],
      language: "English",
      pages: 0,
      publisher: "Unknown",
      ISBN: "",
      stockQuantity: 0, // Set initial value for stockQuantity
    },
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const addedBook = (await response.json()) as Book;
        console.log("Book added successfully:", addedBook);
      } else {
        console.error("Failed to add book:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting book details:", error);
    }
    reset();
  };

  return (
    <Layout>
      <Container maxWidth="md" sx={{ padding: 4 }}>
        <Typography
          textAlign="center"
          color="#1F2937"
          fontWeight="bold"
          sx={{ mb: { xs: 2, md: 4 } }}
          fontSize={{ xs: 20, md: 26 }}
        >
          Admin Panel - Add a New Book
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Title"
                {...register("title")}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Author"
                {...register("author")}
                error={!!errors.author}
                helperText={errors.author?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth error={!!errors.genre}>
                <InputLabel>Genre</InputLabel>
                <Select {...register("genre")}>
                  {GENRES.map((genre) => (
                    <MenuItem key={genre.value} value={genre.value}>
                      {genre.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.genre && (
                  <Typography color="error">{errors.genre.message}</Typography>
                )}
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Price"
                type="number"
                {...register("price")}
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Cover Image URL"
                {...register("coverImage")}
                error={!!errors.coverImage}
                helperText={errors.coverImage?.message}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                {...register("description")}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Publication Date"
                type="date"
                {...register("publicationDate")}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Language" {...register("language")} />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Pages"
                type="number"
                {...register("pages")}
                error={!!errors.pages}
                helperText={errors.pages?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Publisher"
                {...register("publisher")}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="ISBN"
                {...register("ISBN")}
                error={!!errors.ISBN}
                helperText={errors.ISBN?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Stock Quantity"
                type="number"
                {...register("stockQuantity")}
                error={!!errors.stockQuantity}
                helperText={errors.stockQuantity?.message}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 2, bgcolor: "#1F2937" }}
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
