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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Search from "./search";

const navLinks = [
  { label: "Catalog", path: "/catalog" },
  { label: "Order History", path: "/order-history" },
  { label: "Cart", path: "/cart" },
  { label: "Login", path: "/login" },
  { label: "Add Book", path: "/add-book" },
];

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#1F2937", paddingX: 8 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ color: "white", textDecoration: "none" }}
        >
          Online Bookstore
        </Typography>

        <Search />

        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          {navLinks.map((link) => (

            <Button
              component={Link}
              to={link.path}
              sx={{ color: "white", "&:hover": { color: "grey.400" } }}
            >
              {link.label}
            </Button>
          ))}
        </Box>

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
