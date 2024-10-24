import { Link } from "react-router-dom";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import Search from "./search";

const Header = () => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "grey.800" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ color: "white", textDecoration: "none" }}
        >
          Online Bookstore
        </Typography>

        <Search />

        <Box sx={{ flexGrow: 1 }} />

        <nav>
          <ul style={{ display: "flex", listStyle: "none", padding: 0 }}>
            <li>
              <Button
                component={Link}
                to="/catalog"
                sx={{ color: "white", "&:hover": { color: "grey.400" } }}
              >
                Catalog
              </Button>
            </li>
            <li>
              <Button
                component={Link}
                to="/order-history"
                sx={{ color: "white", "&:hover": { color: "grey.400" } }}
              >
                Order History
              </Button>
            </li>
            <li>
              <Button
                component={Link}
                to="/cart"
                sx={{ color: "white", "&:hover": { color: "grey.400" } }}
              >
                Cart
              </Button>
            </li>
            <li>
              <Button
                component={Link}
                to="/login"
                sx={{ color: "white", "&:hover": { color: "grey.400" } }}
              >
                Login
              </Button>
            </li>
            <li>
              <Button
                component={Link}
                to="/add-book"
                sx={{ color: "white", "&:hover": { color: "grey.400" } }}
              >
                Add Book
              </Button>
            </li>
          </ul>
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
