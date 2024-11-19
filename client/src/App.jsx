import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from './pages/shop.jsx';
import Home from './pages/home.jsx';
import ProductPage from './pages/productpage.jsx';
import Cart from "./pages/CartPage.jsx";
import Admin from "./pages/admin.jsx";
import  Buttongroup  from "../comp/button.jsx";

const App = () => {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/product" element={<ProductPage />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/button" element={<Buttongroup/>}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
