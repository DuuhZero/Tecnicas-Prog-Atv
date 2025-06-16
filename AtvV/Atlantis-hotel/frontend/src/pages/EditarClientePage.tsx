import { useParams } from "react-router-dom";
import ClienteForm from "../components/ClienteForm";

export default function EditarClientePage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="w-[83vw] p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Editar Cliente</h1>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <ClienteForm clienteId={id} onSuccess={() => window.location.href = '/clientes'} />
            
      </div>
    </div>
  );
}