import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/login";
import Home from "../pages/home";
import Pedido from "../pages/pedido";
import Admin from "../pages/admin";
import CriarConta from "../pages/CriarConta";
import EsqueciSenha from "../pages/EsqueciSenha";
import NovaSenha from "../pages/NovaSenha";
import Perfil from "../pages/perfil";


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/criar-conta" element={<CriarConta />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />
        <Route path="/nova-senha" element={<NovaSenha />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pedido" element={<Pedido />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;