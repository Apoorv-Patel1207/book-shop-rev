import React from "react";
import Header from "./header";
import Footer from "./footer";
import { Box, Stack } from "@mui/material";

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
      }}
    >
      <Header />
      <Box sx={{ margin: 0, marginTop: 12, paddingX: 8 }}>{children}</Box>

      <Footer />
    </Box>
  );
};

export default Layout;
