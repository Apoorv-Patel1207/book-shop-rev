import { Box, Link, Typography, Stack } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#1F2937",
        color: "white",
        paddingY: 3,
        marginTop: 4,
        paddingX: { xs: 1, sm: 4, md: 8, lg: 10, xl: 12 },
      }}
      component="footer"
    >
      <Stack direction="column" alignItems="center" spacing={1}>
        <Typography variant="body2" align="center">
          &copy; 2024 Online Bookstore. All rights reserved.
        </Typography>

        <Typography variant="body2" align="center" sx={{ color: "grey.400" }}>
          <Link
            href="/learning"
            sx={{
              color: "white",
              textDecoration: "none",
              "&:hover": { color: "grey.400" },
            }}
          >
            Explore Apoorv&apos;s journey and challenges in building this
            bookstore
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
};

export default Footer;
