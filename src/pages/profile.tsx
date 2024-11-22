"use client"

import { useEffect, useState } from "react"

import { yupResolver } from "@hookform/resolvers/yup"
import { Container, TextField, Button, Typography, Grid } from "@mui/material"
import {
  useForm,
  Controller,
  SubmitHandler,
  UseFormProps,
} from "react-hook-form"
import * as Yup from "yup"

import { useUserID } from "src/components/auth/userID"
import {
  getUserProfile,
  updateUserProfile,
} from "src/service/user-profile-service"
import { UserProfile } from "src/types/data-types"

import PageHeading from "src/components/utility-components/page-headings"
import Layout from "../components/layout/layout"

// Form value types
interface ProfileFormValues {
  name: string
  email: string
  phone: string
  address?: string
  profileImage?: string
  dob?: string
  gender?: string
}

// Validation schema
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
})

const Profile = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [editing, setEditing] = useState<boolean>(false)
  const [profile, setProfile] = useState<UserProfile | null>(null)

  const userID = useUserID()

  // React Hook Form configuration
  const formConfig: UseFormProps<ProfileFormValues> = {
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      profileImage: "",
      dob: "",
      gender: "",
    },
    resolver: yupResolver(validationSchema),
    mode: "all",
  }

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProfileFormValues>(formConfig)

  // Fetch user profile
  useEffect(() => {
    if (!userID) return

    const fetchUserProfile = async () => {
      setLoading(true)
      try {
        const data = await getUserProfile(userID)
        if (data) {
          setProfile(data)
          reset(data) // Populate form with fetched data
        } else {
          setError("Failed to load user profile.")
        }
      } catch (err) {
        setError("Failed to load user profile.")
      } finally {
        setLoading(false)
      }
    }

    fetchUserProfile().catch((err) =>
      console.error("Error fetching profile:", err),
    )
  }, [userID, reset])

  // Form submission handler
  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    if (!userID) return

    try {
      const updatedProfile = await updateUserProfile(userID, {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address || "",
        profileImage: data.profileImage || "",
        dob: data.dob || "",
        gender: data.gender || "",
        
      })
      if (updatedProfile) {
        setProfile(updatedProfile)
        setEditing(false)
      } else {
        setError("Failed to update user profile.")
      }
    } catch {
      setError("Error submitting user profile.")
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <Layout>
      <Container maxWidth='md'>
     

        <PageHeading>{editing ? "Edit Profile" : "User Profile"}</PageHeading>

        {error && <Typography color='error'>{error}</Typography>}

        {!editing ? (
          <div>
            <Grid container spacing={2}>
              {[
                { label: "Name", value: profile?.name },
                { label: "Email", value: profile?.email },
                { label: "Phone", value: profile?.phone },
                { label: "Address", value: profile?.address },
                { label: "DOB", value: profile?.dob },
                { label: "Gender", value: profile?.gender },
              ].map((item) => (
                <Grid item xs={12} key={item.value}>
                  <Typography variant='h6'>
                    {item.label}: {item.value || "N/A"}
                  </Typography>
                </Grid>
              ))}
              <Grid item xs={12}>
                <Typography variant='h6'>Profile Image:</Typography>
                {profile?.profileImage && (
                  <img
                    src={profile.profileImage}
                    alt='profile'
                    style={{ maxWidth: "100px" }}
                  />
                )}
              </Grid>
            </Grid>
            <Button
              variant='contained'
              color='primary'
              onClick={() => setEditing(true)}
              sx={{ mt: 2 }}
            >
              Edit Profile
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid container spacing={2}>
              {[
                { name: "name", label: "Name", type: "text" },
                { name: "email", label: "Email", type: "email" },
                { name: "phone", label: "Phone", type: "text" },
                { name: "address", label: "Address", type: "text" },
                {
                  name: "profileImage",
                  label: "Profile Image URL",
                  type: "text",
                },
                { name: "dob", label: "Date of Birth", type: "date" },
                { name: "gender", label: "Gender", type: "text" },
              ].map((field) => (
                <Grid item xs={12} key={field.name}>
                  <Controller
                    name={field.name as keyof ProfileFormValues}
                    control={control}
                    render={({ field: controllerField }) => (
                      <TextField
                        {...controllerField}
                        fullWidth
                        label={field.label}
                        type={field.type}
                        error={!!errors[field.name as keyof ProfileFormValues]}
                        helperText={
                          errors[field.name as keyof ProfileFormValues]?.message
                        }
                      />
                    )}
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  disabled={isSubmitting}
                  sx={{ mt: 2 }}
                >
                  Save Changes
                </Button>
                <Button
                  variant='outlined'
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
  )
}

export default Profile
