import React from "react";

import { Box } from "@mui/material";

import Footer from "./footer";
import Header from "./header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Box
        sx={{
          flex: 1,
          marginTop: 12,
          paddingX: { xs: 1, sm: 4, md: 8, lg: 10, xl: 12 },
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );

export default Layout;
