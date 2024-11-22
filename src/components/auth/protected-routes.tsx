import { useAuth0 } from "@auth0/auth0-react"
import { Outlet, Navigate } from "react-router-dom"
import { Box } from "@mui/material"
import Loading from "../utility-components/loading"

const ProtectedRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return (
      <Box
        width='100vw'
        height='100vh'
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <Loading />
      </Box>
    )
  }

  return isAuthenticated ? <Outlet /> : <Navigate to='/not-logged-in' />
}

export default ProtectedRoutes
