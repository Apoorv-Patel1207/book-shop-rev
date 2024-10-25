import React from "react";
import Header from "./header";
import Footer from "./footer";
import { Box } from "@mui/material";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        padding: 0,
        margin: 0,
        border: "solid black 2px",
      }}
    >
      <Header />
      <Box sx={{ flex: 1, marginTop: 12, paddingX: 8 }}>{children}</Box>
      <Footer />
    </Box>
  );
};

export default Layout;
