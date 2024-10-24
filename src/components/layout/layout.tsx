import React from "react";
import Header from "./header";
import Footer from "./footer";
import { Box } from "@mui/material";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Box sx={{ flexGrow: 1, padding: 4, marginTop: 8 }}>{children}</Box>
      <Footer />
    </Box>
  );
};

export default Layout;
