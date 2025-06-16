import { useState, useEffect } from "react";
import type { Acomodacao } from "../../../backend/types/acomodacao";
import { NomeAcomodacao } from "../../../backend/types/acomodacao";
import { addAcomodacao, updateAcomodacao, getAcomodacaoById } from "../database";

interface AcomodacaoFormProps {
    acomodacaoId?: string;
    onSuccess: () => void;
    onCancel?: () => void;
}

export default function AcomodacaoForm({ acomodacaoId, onSuccess, onCancel }: AcomodacaoFormProps) {
    const [acomodacao, setAcomodacao] = useState<Omit<Acomodacao, 'id'>>({
        nome: NomeAcomodacao.SolteiroSimples,
        camaCasal: 0,
        camaSolteiro: 1,
        climatizacao: true,
        garagem: 0,
        suite: 1,
        disponivel: true
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (acomodacaoId) {
            const fetchAcomodacao = async () => {
                try {
                    const acomodacaoData = await getAcomodacaoById(acomodacaoId);
                    if (acomodacaoData) {
                        setAcomodacao({
                            nome: acomodacaoData.nome,
                            camaCasal: acomodacaoData.camaCasal,
                            camaSolteiro: acomodacaoData.camaSolteiro,
                            climatizacao: acomodacaoData.climatizacao,
                            garagem: acomodacaoData.garagem,
                            suite: acomodacaoData.suite,
                            disponivel: acomodacaoData.disponivel
                        });
                    }
                } catch (err) {
                    setError("Erro ao carregar acomodação.");
                }
            };
            fetchAcomodacao();
        }
    }, [acomodacaoId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setAcomodacao(prev => ({ ...prev, [name]: checked }));
        } else if (type === 'number') {
            setAcomodacao(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
        } else {
            setAcomodacao(prev => ({ ...prev, [name]: value as NomeAcomodacao }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setError(null);
            if (acomodacaoId) {
                await updateAcomodacao(acomodacaoId, acomodacao);
            } else {
                await addAcomodacao(acomodacao);
            }
            onSuccess();
        } catch (error) {
            setError("Erro ao salvar acomodação. Tente novamente.");
            console.error("Erro ao salvar acomodação:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white text-black rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {acomodacaoId ? 'Editar Acomodação' : 'Cadastrar Nova Acomodação'}
            </h2>

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Acomodação*</label>
                    <select
                        name="nome"
                        value={acomodacao.nome}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                    >
                        {Object.values(NomeAcomodacao).map((nome) => (
                            <option key={nome} value={nome}>
                                {nome}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Camas de Casal*</label>
                    <input
                        type="number"
                        name="camaCasal"
                        min="0"
                        value={acomodacao.camaCasal}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Camas de Solteiro*</label>
                    <input
                        type="number"
                        name="camaSolteiro"
                        min="0"
                        value={acomodacao.camaSolteiro}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vagas na Garagem*</label>
                    <input
                        type="number"
                        name="garagem"
                        min="0"
                        value={acomodacao.garagem}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Suítes*</label>
                    <input
                        type="number"
                        name="suite"
                        min="0"
                        value={acomodacao.suite}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                    />
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="climatizacao"
                        id="climatizacao"
                        checked={acomodacao.climatizacao}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="climatizacao" className="ml-2 block text-sm text-gray-700">
                        Possui climatização
                    </label>
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="disponivel"
                        id="disponivel"
                        checked={acomodacao.disponivel}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="disponivel" className="ml-2 block text-sm text-gray-700">
                        Disponível para reserva
                    </label>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-4">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 border border-gray-300 bg-white rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Cancelar
                    </button>
                )}
                <button
                    type="submit"
                    className="px-6 py-2 border border-transparent rounded-lg shadow-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition"
                >
                    {acomodacaoId ? 'Atualizar Acomodação' : 'Cadastrar Acomodação'}
                </button>
            </div>
        </form>
    );
}