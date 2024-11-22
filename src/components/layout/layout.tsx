import React, { useEffect } from "react"

import { Box } from "@mui/material"

import { useAuth0 } from "@auth0/auth0-react"
import {
  getUserProfile,
  createUserProfile,
} from "src/service/user-profile-service"
import Footer from "./footer"
import Header from "./header"
import { useUser } from "../context/user-context"

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { user, isAuthenticated } = useAuth0()
  const { userData, setUserData } = useUser()
  console.log("userData: ", userData)

  useEffect(() => {
    const checkOrCreateUser = async () => {
      if (isAuthenticated && user?.sub && !userData) {
        try {
          const existingUser = await getUserProfile(user.sub)
          setUserData(existingUser)
        } catch (error) {
          console.error("Error fetching user profile:", error)
          try {
            const newUser = await createUserProfile(
              user.sub,
              user.name || "",
              user.email || "",
            )
            setUserData(newUser)
          } catch (err) {
            console.error("Error creating user profile:", err)
          }
        }
      }
    }

    if (isAuthenticated) {
      checkOrCreateUser().catch((err) =>
        console.error("Error while creating or fetching the user:", err),
      )
    }
  }, [isAuthenticated, user, userData, setUserData])

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Box
        sx={{
          flex: 1,
          marginTop: 12,
          paddingX: { xs: 1, sm: 4, md: 8, lg: 10, xl: 12 },
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  )
}

export default Layout

// /src/components/UserProfile.tsx
// import React from "react"
// import { useUser } from "../context/UserContext"

// const UserProfile = () => {
//   const { userData } = useUser()

//   if (!userData) {
//     return <div>Loading user data...</div>
//   }

//   return (
//     <div>
//       <h1>{userData.name}</h1>
//       <p>{userData.email}</p>
//     </div>
//   )
// }

// export default UserProfile
