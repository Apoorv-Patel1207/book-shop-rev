import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Container, TextField, Button, Typography, Grid } from "@mui/material";
import Layout from "../components/layout/layout";
import { useAuth0 } from "@auth0/auth0-react";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  address: Yup.string().optional(),
  profileImage: Yup.string().url("Must be a valid URL").optional(),
  dob: Yup.string().optional(),
  gender: Yup.string().optional(),
});

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [profile, setProfile] = useState<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (isAuthenticated && user?.sub) {
      fetch(`http://localhost:5000/api/users/profile`, {
        method: "GET",
        headers: {
          "x-user-id": user.sub, // Send Auth0 user ID
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setProfile(data);
          reset(data); // Populate form with data
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load user profile.");
          setLoading(false);
        });
    }
  }, [isAuthenticated, user?.sub, reset]);

  const onSubmit: SubmitHandler<any> = async (data) => {
    if (!user?.sub) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/users/profile/${user.sub}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-user-id": user.sub,
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const updatedProfile = await response.json();
        setProfile(updatedProfile);
        setEditing(false);
      } else {
        setError("Failed to update user profile.");
      }
    } catch {
      setError("Error submitting user profile.");
    }
  };

  if (loading) return <div>Loading...</div>;

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
          {editing ? "Edit Profile" : "User Profile"}
        </Typography>

        {error && <Typography color="error">{error}</Typography>}

        {!editing ? (
          <div>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">Name: {profile?.name}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Email: {profile?.email}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Phone: {profile?.phone}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">
                  Address: {profile?.address}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">DOB: {profile?.dob}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Gender: {profile?.gender}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Profile Image:</Typography>
                <img
                  src={profile?.profileImage}
                  alt="profile"
                  style={{ maxWidth: "100px" }}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setEditing(true)}
              sx={{ mt: 2 }}
            >
              Edit Profile
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone"
                  {...register("phone")}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  {...register("address")}
                  error={!!errors.address}
                  helperText={errors.address?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Profile Image URL"
                  {...register("profileImage")}
                  error={!!errors.profileImage}
                  helperText={errors.profileImage?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  type="date"
                  {...register("dob")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Gender" {...register("gender")} />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Save Changes
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setEditing(false)}
                  sx={{ mt: 2, ml: 2 }}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Container>
    </Layout>
  );
};

export default Profile;