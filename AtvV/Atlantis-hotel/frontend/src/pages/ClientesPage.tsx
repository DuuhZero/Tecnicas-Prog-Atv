import { useState, useEffect } from "react";
import { getClientes, deleteCliente } from "../database";
import type { Cliente } from "../../../backend/types/cliente";
import ClienteCard from "../components/ClienteCard";
import ClienteForm from "../components/ClienteForm";

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCliente, setEditingCliente] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientes = async () => {
      const clientesData = await getClientes();
      setClientes(clientesData);
    };
    fetchClientes();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
      await deleteCliente(id);
      setClientes(clientes.filter(c => c.id !== id));
    }
  };

  const handleSuccess = () => {
    setShowForm(false);
    setEditingCliente(null);
    const fetchClientes = async () => {
      const clientesData = await getClientes();
      setClientes(clientesData);
    };
    fetchClientes();
  };

  return (
    <div className="w-[83vw] p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Clientes</h1>
        {!showForm && !editingCliente && (
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Novo Cliente
          </button>
        )}
      </div>

      {showForm && (
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Cadastrar Novo Cliente</h2>
            <ClienteForm onSuccess={handleSuccess} />
            <div className="mt-6 pt-4 border-t border-gray-200">
            </div>
          </div>
        </div>
      )}

      {editingCliente && (
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Editar Cliente</h2>
            <ClienteForm clienteId={editingCliente} onSuccess={handleSuccess} />
            <div className="mt-6 pt-4 border-t  border-gray-200">
            <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-gray-300 !bg-white rounded-lg font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {clientes.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-500">Nenhum cliente cadastrado.</p>
          </div>
        ) : (
          clientes.map(cliente => (
            <ClienteCard 
              key={cliente.id} 
              cliente={cliente} 
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}