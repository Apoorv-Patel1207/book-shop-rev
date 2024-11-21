// import { useAuth0 } from "@auth0/auth0-react"
// import { Navigate } from "react-router-dom"

// interface ProtectedRouteProps {
//   children: JSX.Element
//   redirectTo?: string
// }

// const ProtectedRoute = ({
//   children,
//   redirectTo = "/not-logged-in",
// }: ProtectedRouteProps) => {
//   const { isAuthenticated, isLoading } = useAuth0()

//   if (isLoading) {
//     return <p>Loading...</p>
//   }

//   if (!isAuthenticated) {
//     return <Navigate to={redirectTo} />
//   }

//   return children
// }

// export default ProtectedRoute

import { useAuth0 } from "@auth0/auth0-react"
import { Outlet, Navigate } from "react-router-dom"

const ProtectedRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return <p>Loading...</p>
  }

  return isAuthenticated ? <Outlet /> : <Navigate to='/not-logged-in' />
}

export default ProtectedRoutes
