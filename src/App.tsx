import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Cart from "./pages/cart";
import Catalog from "./pages/catalog";
import BookDetails from "./pages/book-details";
import OrderHistoryPage from "./pages/order-history";
import AdminPanel from "./pages/add-book";
import Learning from "./pages/learning";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/order-history" element={<OrderHistoryPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/book-details/:id" element={<BookDetails />} />
        <Route path="/add-book" element={<AdminPanel />} />
        <Route path="/learning" element={<Learning />} />
      </Routes>
    </Router>
  );
};

export default App;
