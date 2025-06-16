import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getClienteById, getDependentesByTitular, deleteDependente } from "../database";
import type { Cliente } from "../../../backend/types/cliente";
import type { Dependente } from "../../../backend/types/dependente";
import DependenteCard from "../components/DependenteCard";
import DependenteForm from "../components/DependenteForm";

export default function DependentesPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [titular, setTitular] = useState<Cliente | null>(null);
  const [dependentes, setDependentes] = useState<Dependente[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingDependente, setEditingDependente] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const clienteData = await getClienteById(id);
        if (clienteData) {
          setTitular(clienteData);
          const dependentesData = await getDependentesByTitular(id);
          setDependentes(dependentesData);
        } else {
          navigate('/clientes');
        }
      }
    };
    fetchData();
  }, [id, navigate]);

  const handleDelete = async (dependenteId: string) => {
    if (window.confirm("Tem certeza que deseja excluir este dependente?")) {
      await deleteDependente(dependenteId);
      setDependentes(dependentes.filter(d => d.id !== dependenteId));
    }
  };

  const handleSuccess = () => {
    setShowForm(false);
    setEditingDependente(null);
    const fetchDependentes = async () => {
      if (id) {
        const dependentesData = await getDependentesByTitular(id);
        setDependentes(dependentesData);
      }
    };
    fetchDependentes();
  };

  if (!titular) return <div className="w-full p-6 flex justify-center items-center">Carregando...</div>;

  return (
    <div className="w-[83vw] p-6">
      <div className="mb-6">
        <Link to="/clientes" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Voltar para Clientes
        </Link>
        <h1 className="text-2xl font-bold text-gray-800 mt-2">Dependentes de {titular.nome}</h1>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Lista de Dependentes</h2>
        {!showForm && !editingDependente && (
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Novo Dependente
          </button>
        )}
      </div>

      {showForm && titular.id && (
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Cadastrar Novo Dependente</h2>
            <DependenteForm titularId={titular.id!} onSuccess={handleSuccess} />
            <div className="mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {editingDependente && (
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Editar Dependente</h2>
            <DependenteForm 
              titularId={titular.id!} 
              dependenteId={editingDependente} 
              onSuccess={handleSuccess} 
            />
            <div className="mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={() => setEditingDependente(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {dependentes.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-500">Nenhum dependente cadastrado para este cliente.</p>
          </div>
        ) : (
          dependentes.map(dependente => (
            <DependenteCard 
              key={dependente.id} 
              dependente={dependente} 
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}