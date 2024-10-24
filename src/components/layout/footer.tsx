import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "grey.800",
        color: "white",
        padding: 2,
        marginTop: 4,
      }}
      component="footer"
    >
      <Typography variant="body2" align="center">
        &copy; 2024 Online Bookstore. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
