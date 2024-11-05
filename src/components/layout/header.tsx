import { useState } from "react";
import { Link } from "react-router-dom";
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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Search from "./search";
import SearchIcon from "@mui/icons-material/Search";
import Login from "../auth/login";

const navLinks = [
  { label: "Catalog", path: "/catalog" },
  { label: "Orders", path: "/order-history" },
  { label: "Cart", path: "/cart" },
  { label: "Add Book", path: "/add-book" },
];

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar
      position="fixed"
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
          to="/"
          sx={{
            color: "white",
            textDecoration: "none",
            fontSize: { xs: "20px", md: "24px" },
          }}
        >
          Readify
        </Typography>

        {isMobile ? (
          <Box display="flex" justifyContent="end">
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>
          </Box>
        ) : (
          <Search />
        )}

        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          {navLinks.map((link) => (
            <Button
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
          ))}
        </Box>

        <Login />

        <IconButton
          color="inherit"
          edge="end"
          onClick={toggleDrawer(true)}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 250 }}
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <ul>
              {navLinks.map((link) => (
                <li>
                  <Button
                    component={Link}
                    to={link.path}
                    sx={{ color: "black", "&:hover": { color: "grey.400" } }}
                  >
                    {link.label}
                  </Button>
                </li>
              ))}
            </ul>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
