// import { Box, Typography, Button } from "@mui/material"
// import { useNavigate } from "react-router-dom"

// const NotLoggedIn = () => {
//   const navigate = useNavigate()

//   return (
//     <Box textAlign='center' mt={4}>
//       <Typography variant='h4' gutterBottom>
//         Access Denied
//       </Typography>
//       <Typography variant='body1' gutterBottom>
//         You need to be logged in to view this page.
//       </Typography>
//       <Button variant='contained' color='primary' onClick={() => navigate("/")}>
//         GO BACK TO BROWSE BOOKS
//       </Button>
//     </Box>
//   )
// }

// export default NotLoggedIn

import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { Box, Typography, Button, Container, Stack } from "@mui/material"
import { useNavigate } from "react-router-dom"

import Layout from "src/components/layout/layout"

const NotLoggedIn = () => {
  const navigate = useNavigate()

  return (
    <Layout>
      <Container
        maxWidth='sm'
        sx={{
          textAlign: "center",
          py: 6,
          backgroundColor: "#F9FAFB",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Stack direction='column' alignItems='center' spacing={3}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: "#FFEDED",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LockOutlinedIcon sx={{ fontSize: 40, color: "#F44336" }} />
          </Box>
          <Typography variant='h4' fontWeight='bold' color='text.primary'>
            Access Denied
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            You need to log in to access this page. Please log in or return to
            the catalog.
          </Typography>
          <Button
            variant='contained'
            size='large'
            color='primary'
            onClick={() => navigate("/catalog")}
            sx={{
              backgroundColor: "#1F2937",
              "&:hover": {
                backgroundColor: "#374151",
              },
            }}
          >
            Go Back to Browse Books
          </Button>
        </Stack>
      </Container>
    </Layout>
  )
}

export default NotLoggedIn