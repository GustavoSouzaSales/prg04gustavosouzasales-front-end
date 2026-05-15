import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/login";
import Home from "../pages/home";
import Pedido from "../pages/pedido";
import Admin from "../pages/admin";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pedido" element={<Pedido />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;