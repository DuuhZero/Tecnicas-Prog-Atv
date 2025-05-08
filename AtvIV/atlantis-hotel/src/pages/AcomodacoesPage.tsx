import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAcomodacoes, deleteAcomodacao } from "../api/acomodacao";
import type { Acomodacao } from "../types/acomodacao";
import AcomodacaoCard from "../components/AcomodacaoCard";
import AcomodacaoForm from "../components/AcomodacaoForm";

export default function AcomodacoesPage() {
    const [acomodacoes, setAcomodacoes] = useState<Acomodacao[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingAcomodacao, setEditingAcomodacao] = useState<string | null>(null);

    useEffect(() => {
        const fetchAcomodacoes = async () => {
            const acomodacoesData = await getAcomodacoes();
            setAcomodacoes(acomodacoesData);
        };
        fetchAcomodacoes();
    }, []);

    const handleDelete = async (id: string) => {
        if (window.confirm("Tem certeza que deseja excluir esta acomodação?")) {
            await deleteAcomodacao(id);
            setAcomodacoes(acomodacoes.filter(a => a.id !== id));
        }
    };

    const handleSuccess = () => {
        setShowForm(false);
        setEditingAcomodacao(null);
        const fetchAcomodacoes = async () => {
            const acomodacoesData = await getAcomodacoes();
            setAcomodacoes(acomodacoesData);
        };
        fetchAcomodacoes();
    };

    return (
        <div className="w-full p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Acomodações</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Nova Acomodação
                </button>
            </div>

            {showForm && (
                <div className="mb-8">
                    <AcomodacaoForm 
                        onSuccess={handleSuccess} 
                        onCancel={() => setShowForm(false)}
                    />
                </div>
            )}

            {editingAcomodacao && (
                <div className="mb-8">
                    <AcomodacaoForm 
                        acomodacaoId={editingAcomodacao} 
                        onSuccess={handleSuccess} 
                        onCancel={() => setEditingAcomodacao(null)}
                    />
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {acomodacoes.map(acomodacao => (
                    <AcomodacaoCard 
                        key={acomodacao.id} 
                        acomodacao={acomodacao} 
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
}