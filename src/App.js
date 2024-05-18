import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./screens/Home";
import MyOrder from "./screens/MyOrder";
import Signup from "./screens/Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import Cart from "./screens/Cart";
import { CartProvider } from "./components/ContextReducer";
import Login from "./screens/Login";
import Admin from "./Admin/Admin";
import Adminorders from "./Admin/Adminorders";
import Privateroutes from "./Privateroutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/myorder" element={<MyOrder />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            
            <Route element={<Privateroutes />}>
              <Route path="/admin/user" element={<Admin />} />
              <Route path="/order" element={<Adminorders />} />
            </Route>
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </>
  );
}

export default App;