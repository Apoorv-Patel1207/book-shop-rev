import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import ProtectedRoutes from "./components/auth/protected-routes"
import AdminPanel from "./pages/add-book"
import BookDetails from "./pages/book-details"
import Cart from "./pages/cart"
import Catalog from "./pages/catalog"
import Checkout from "./pages/checkout"
import Home from "./pages/home"
import Learning from "./pages/learning"
import NotLoggedIn from "./pages/not-logged-in"
import OrderHistoryPage from "./pages/order-history"
import Profile from "./pages/profile"
import SalesPanel from "./pages/sales-panel"

const App = () => (
  // <Router>
  //   <Routes>
  //     <Route path='/' element={<Home />} />
  //     <Route path='/catalog' element={<Catalog />} />
  //     <Route path='/not-logged-in' element={<NotLoggedIn />} />
  //     <Route path='/order-history' element={<OrderHistoryPage />} />
  //     <Route path='/cart' element={<Cart />} />
  //     <Route path='/add-book' element={<AdminPanel />} />
  //     <Route path='/sales-panel' element={<SalesPanel />} />
  //     <Route path='/profile' element={<Profile />} />

  //     <Route path='/book-details/:id' element={<BookDetails />} />
  //     <Route path='/learning' element={<Learning />} />
  //     <Route path='/checkout' element={<Checkout />} />
  //   </Routes>
  // </Router>

  <Router>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/catalog' element={<Catalog />} />
      <Route path='/not-logged-in' element={<NotLoggedIn />} />
      <Route path='/book-details/:id' element={<BookDetails />} />
      <Route path='/learning' element={<Learning />} />

      {/* Group Protected Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route path='/order-history' element={<OrderHistoryPage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/add-book' element={<AdminPanel />} />
        <Route path='/sales-panel' element={<SalesPanel />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/checkout/:id' element={<Checkout />} />
      </Route>
    </Routes>
  </Router>
)

export default App
