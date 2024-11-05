import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Drawer,
  Paper,
  Container,
  Divider,
} from "@mui/material";

const ThemeDemo = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <Container sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Themed Bookstore Elements
      </Typography>

      <Typography variant="body1">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus dicta
        iusto aspernatur architecto odio doloremque quod vel, dolor, provident
        aliquam blanditiis asperiores quos, quia exercitationem ad nihil?
        Aliquam, veritatis blanditiis?
      </Typography>

      <Divider sx={{ marginY: 2 }} />

      {/* Primary Button */}
      <Box display="flex" justifyContent="center" marginBottom={2}>
        <Button
          sx={{
            color: "primary.contrastText",
          }}

        >
          Primary Button
        </Button>
      </Box>

      {/* Secondary Button */}
      <Box display="flex" justifyContent="center" marginBottom={2}>
        <Button variant="contained" color="secondary">
          Secondary Button
        </Button>
      </Box>

      {/* Drawer Toggle Button */}
      <Box display="flex" justifyContent="center" marginBottom={2}>
        <Button variant="contained" onClick={toggleDrawer(true)}>
          Open Themed Drawer
        </Button>
      </Box>

      {/* Themed Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            padding: 2,
          }}
        >
          <Typography variant="h4" color="primary" gutterBottom>
            Filter Options
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Customize your book search with the options below.
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <Button variant="contained" color="primary" fullWidth>
            Apply Filters
          </Button>
        </Box>
      </Drawer>

      {/* Example Card or Paper */}
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          backgroundColor: "background.paper",
          marginTop: 2,
        }}
      >
        <Typography variant="h6" color="primary" gutterBottom>
          Themed Card
        </Typography>
        <Typography variant="body1" color="text.secondary">
          This is an example of a card or Paper component styled according to
          the theme. It has a white background and uses custom typography and
          text colors.
        </Typography>
      </Paper>
    </Container>
  );
};

export default ThemeDemo;
