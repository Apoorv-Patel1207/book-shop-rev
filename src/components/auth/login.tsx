// import { useAuth0 } from "@auth0/auth0-react";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import LogoutIcon from "@mui/icons-material/Logout";
// import { Button, Typography, Box, IconButton } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const LoginButton = () => {
//   const { user, isAuthenticated, isLoading, loginWithRedirect, logout } =
//     useAuth0();

//   console.log("user", user);

//   const navigate = useNavigate();

//   const navigateToProfile = () => {
//     navigate("/profile");
//   };

//   if (isLoading) {
//     return <Typography>Loading...</Typography>;
//   }

//   return (
//     <Box display="flex" alignItems="center" gap={1}>
//       {isAuthenticated ? (
//         <>
//           <IconButton color="inherit" onClick={navigateToProfile}>
//             <AccountCircleIcon sx={{ width: 30, height: 30 }} />
//           </IconButton>

//           <Typography fontSize={14}>{user?.given_name}</Typography>

//           <IconButton
//             color="inherit"
//             onClick={() =>
//               logout({ logoutParams: { returnTo: window.location.origin } })
//             }
//           >
//             <LogoutIcon />
//           </IconButton>
//         </>
//       ) : (
//         <Button
//           variant="text"
//           sx={{
//             color: "white",

//             textTransform: "none",
//           }}
//           onClick={() => loginWithRedirect()}
//         >
//           Log In
//         </Button>
//       )}
//     </Box>
//   );
// };

// export default LoginButton;

import { useEffect } from "react"

import { useAuth0 } from "@auth0/auth0-react"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import LogoutIcon from "@mui/icons-material/Logout"
import { Button, Typography, Box, IconButton } from "@mui/material"
import { useNavigate } from "react-router-dom"

const LoginButton = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } =
    useAuth0()
  const navigate = useNavigate()

  const navigateToProfile = () => {
    navigate("/profile")
  }

  useEffect(() => {
    const checkOrCreateUser = async () => {
      if (isAuthenticated && user?.sub) {
        try {
          const response = await fetch(
            "http://localhost:5000/api/users/profile",
            {
              method: "GET",
              headers: {
                "x-user-id": user.sub,
              } as HeadersInit,
            },
          )

          if (response.status === 404) {
            // User doesn't exist, create a new one
            await fetch("http://localhost:5000/api/users/profile", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-user-id": user.sub,
              } as HeadersInit,
              body: JSON.stringify({
                name: user.name,
                email: user.email,
              }),
            })
          }
        } catch (error) {
          console.error("Failed to check or create user:", error)
        }
      }
    }

    if (isAuthenticated) {
      checkOrCreateUser().catch((err) => {
        console.error("Error while creating the user:", err)
      })
    }
  }, [isAuthenticated, user])

  if (isLoading) {
    return <Typography>Loading...</Typography>
  }

  return (
    <Box display='flex' alignItems='center' gap={1}>
      {isAuthenticated ? (
        <>
          <IconButton color='inherit' onClick={navigateToProfile}>
            <AccountCircleIcon sx={{ width: 30, height: 30 }} />
          </IconButton>

          <Typography fontSize={14}>
            {user?.given_name || user?.email}
          </Typography>

          <IconButton
            color='inherit'
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            <LogoutIcon />
          </IconButton>
        </>
      ) : (
        <Button
          variant='text'
          sx={{ color: "white", textTransform: "none" }}
          onClick={() => loginWithRedirect()}
        >
          Log In
        </Button>
      )}
    </Box>
  )
}

export default LoginButton
