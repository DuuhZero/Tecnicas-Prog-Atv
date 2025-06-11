import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ClientesPage from "./pages/ClientesPage";
import AcomodacoesPage from "./pages/AcomodacoesPage";
import HospedagensPage from "./pages/HospedagensPage";
import CheckInPage from "./pages/CheckInPage";
import DependentesPage from "./pages/DependentesPage";
import EditarClientePage from "./pages/EditarClientePage";
import EditarDependentePage from "./pages/EditarDependentePage";
import EditarAcomodacaoPage from "./pages/EditarAcomodacaoPage";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 bg-gray-50 overflow-y-auto">
            <Routes>
              <Route path="/" element={<ClientesPage />} />
              <Route path="/clientes" element={<ClientesPage />} />
              <Route path="/clientes/editar/:id" element={<EditarClientePage />} />
              <Route path="/clientes/:id/dependentes" element={<DependentesPage />} />
              <Route path="/dependentes/editar/:id" element={<EditarDependentePage />} />
              <Route path="/acomodacoes" element={<AcomodacoesPage />} />
              <Route path="/hospedagens" element={<HospedagensPage />} />
              <Route path="/checkin" element={<CheckInPage />} />
              <Route path="/acomodacoes/editar/:id" element={<EditarAcomodacaoPage />} />
            </Routes>
          </main>
        </div>
        <p className="text-white text-center">Copyright: <a href="https://github.com/DuuhZero">@DuuhZero</a></p> {/*Marca pra pegar ladrão de codigo*/}
      </div>
    </Router>
  );
}

export default App;