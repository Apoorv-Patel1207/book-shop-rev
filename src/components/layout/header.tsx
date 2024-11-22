import { useState } from "react"

import MenuIcon from "@mui/icons-material/Menu"
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Drawer,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import { Link, useLocation } from "react-router-dom"

import MobileSearch from "./mobileSearch"
import Search from "./search"
import Login from "../auth/login"
import { useUser } from "../context/user-context"

const navLinks = [
  { label: "Catalog", path: "/catalog" },
  { label: "Orders", path: "/order-history" },
  { label: "Cart", path: "/cart" },
  { label: "Admin", path: "/add-book" },
  { label: "Sales", path: "/sales-panel" },
]

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = (open: boolean) => () => setDrawerOpen(open)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const location = useLocation()
  const { userData } = useUser()

  if (!userData) {
    return <div>Loading user data...</div>
  }

  // const [userData, setUserData] = useState<UserProfile | null>(null)
  // console.log("userData: ", userData)

  // const { user, isAuthenticated } = useAuth0()

  // useEffect(() => {
  //   const checkOrCreateUser = async () => {
  //     if (isAuthenticated && user?.sub) {
  //       try {
  //         const response = await fetch(
  //           "http://localhost:5000/api/users/profile",
  //           {
  //             method: "GET",
  //             headers: {
  //               "x-user-id": user.sub,
  //             } as HeadersInit,
  //           },
  //         )

  //         if (response.status === 404) {
  //           // User doesn't exist, create a new one
  //           const createResponse = await fetch(
  //             "http://localhost:5000/api/users/profile",
  //             {
  //               method: "POST",
  //               headers: {
  //                 "Content-Type": "application/json",
  //                 "x-user-id": user.sub,
  //               } as HeadersInit,
  //               body: JSON.stringify({
  //                 name: user.name,
  //                 email: user.email,
  //               }),
  //             },
  //           )

  //           if (createResponse.ok) {
  //             const newUser = (await createResponse.json()) as UserProfile
  //             setUserData(newUser) // Set the newly created user
  //           }
  //         } else if (response.ok) {
  //           const existingUser = (await response.json()) as UserProfile
  //           setUserData(existingUser) // Set the fetched user data
  //         }
  //       } catch (error) {
  //         console.error("Failed to check or create user:", error)
  //       }
  //     }
  //   }

  //   if (isAuthenticated) {
  //     checkOrCreateUser().catch((err) => {
  //       console.error("Error while creating the user:", err)
  //     })
  //   }
  // }, [isAuthenticated, user])

  return (
    <AppBar
      position='fixed'
      sx={{
        backgroundColor: "#1F2937",
        paddingX: { xs: 1, sm: 4, md: 8, lg: 10, xl: 12 },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          component={Link}
          to='/'
          sx={{
            color: "white",
            textDecoration: "none",
            fontSize: { xs: "20px", md: "24px" },
          }}
        >
          Readify
        </Typography>

        {isMobile ? (
          <Box display='flex' justifyContent='end'>
            <MobileSearch />
          </Box>
        ) : (
          <Search isMobile={false} />
        )}

        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          {navLinks.map((link) => {
            if (userData?.role === "salesman" && link.label === "Admin") {
              return null
            }

            if (
              userData?.role === "customer" &&
              (link.label === "Admin" || link.label === "Sales")
            ) {
              return null
            }
            return (
              <Button
                key={link.path}
                component={Link}
                to={link.path}
                sx={{
                  color: "white",
                  textTransform: "none",
                  "&:hover": { color: "grey.400" },
                }}
              >
                {link.label}
              </Button>
            )
          })}
        </Box>

        <Login />

        <IconButton
          color='inherit'
          edge='end'
          onClick={toggleDrawer(true)}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer anchor='left' open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box
            sx={{
              width: 200,
              height: "100vh",
              backgroundColor: "#1F2937",
            }}
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            display='flex'
            flexDirection='column'
            pt={7}
          >
            {navLinks.map((link) => {
              if (userData?.role === "salesman" && link.label === "Admin") {
                return null
              }

              if (
                userData?.role === "customer" &&
                (link.label === "Admin" || link.label === "Sales")
              ) {
                return null
              }
              return (
                <Button
                  key={link.path}
                  component={Link}
                  to={link.path}
                  sx={{
                    fontWeight: "semibold",
                    color: location.pathname === link.path ? "black" : "white", // Active color

                    bgcolor: location.pathname === link.path ? "white" : "none", // Active color
                    textTransform: "none",
                    mb: 1,
                    borderRadius: 0,
                  }}
                >
                  {link.label}
                </Button>
              )
            })}
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  )
}

export default Header
