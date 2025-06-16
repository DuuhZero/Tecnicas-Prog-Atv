import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DependenteForm from "../components/DependenteForm";
import { getDependenteById } from "../database";

export default function EditarDependentePage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [titularId, setTitularId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDependente = async () => {
            if (id) {
                try {
                    const dependente = await getDependenteById(id);
                    if (dependente) {
                        setTitularId(dependente.titularId);
                    } else {
                        setError("Dependente não encontrado.");
                        navigate("/clientes");
                    }
                } catch (err) {
                    setError("Erro ao carregar dependente.");
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchDependente();
    }, [id, navigate]);

    if (loading) return <div className="w-[83vw] p-6 text-center">Carregando...</div>;
    if (error) return <div className="w-[83vw] p-6 text-center text-red-600">{error}</div>;
    if (!titularId) return <div className="w-[83vw] p-6 text-center">Titular não encontrado.</div>;

    return (
        <div className="w-[83vw] p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Editar Dependente</h1>
            <div className="bg-white rounded-xl shadow-lg p-6">
                <DependenteForm 
                    titularId={titularId} 
                    dependenteId={id} 
                    onSuccess={() => navigate(`/clientes/${titularId}/dependentes`)} 
                />
            </div>
        </div>
    );
}