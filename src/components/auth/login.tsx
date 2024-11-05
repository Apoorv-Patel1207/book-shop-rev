import { useAuth0 } from "@auth0/auth0-react";
import { Button, Typography, Box, Avatar, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const LoginButton = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } =
    useAuth0();

  console.log("user", user);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box display="flex" alignItems="center" gap={1}>
      {isAuthenticated ? (
        <>
          {/* {user?.picture && (
            <Avatar
              src={user.picture}
              alt={user.name}
              sx={{ width: 30, height: 30, ml: 2 }}
            />
          )} */}
          <AccountCircleIcon sx={{ width: 30, height: 30, ml: 2 }} />
          <Typography fontSize={14}>{user?.given_name}</Typography>

          <IconButton color="inherit">
            <LogoutIcon
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            />
          </IconButton>
        </>
      ) : (
        <Button
          variant="text"
          sx={{
            color: "white",

            textTransform: "none",
          }}
          onClick={() => loginWithRedirect()}
        >
          Log In
        </Button>
      )}
    </Box>
  );
};

export default LoginButton;
