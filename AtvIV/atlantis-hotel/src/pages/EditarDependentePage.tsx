import { useParams } from "react-router-dom";
import DependenteForm from "../components/DependenteForm";

export default function EditarDependentePage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="w-[83vw] p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Editar Dependente</h1>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <DependenteForm 
          titularId="" 
          dependenteId={id} 
          onSuccess={() => window.history.back()} 
        />
      </div>
    </div>
  );
}