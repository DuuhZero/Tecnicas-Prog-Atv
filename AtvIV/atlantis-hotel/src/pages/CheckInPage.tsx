import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getClientes } from "../api/clientes";
import { getAcomodacoes, setAcomodacaoIndisponivel } from "../api/acomodacao";
import { addHospedagem } from "../api/hospedagens";
import type { Cliente } from "../types/cliente";
import type { Acomodacao } from "../types/acomodacao";

export default function CheckInPage() {
    const navigate = useNavigate();
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [acomodacoes, setAcomodacoes] = useState<Acomodacao[]>([]);
    const [selectedCliente, setSelectedCliente] = useState<string>("");
    const [selectedAcomodacao, setSelectedAcomodacao] = useState<string>("");
    const [dependentesSelecionados, setDependentesSelecionados] = useState<string[]>([]);
    const [valorDiaria, setValorDiaria] = useState<number>(0);
    const [diasHospedagem, setDiasHospedagem] = useState<number>(1);

    useEffect(() => {
        const fetchData = async () => {
            const clientesData = await getClientes();
            setClientes(clientesData);

            const acomodacoesData = await getAcomodacoes();
            setAcomodacoes(acomodacoesData.filter(a => a.disponivel));
        };
        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedCliente || !selectedAcomodacao) {
            alert("Selecione um cliente e uma acomodação");
            return;
        }

        const cliente = clientes.find(c => c.id === selectedCliente);
        const acomodacao = acomodacoes.find(a => a.id === selectedAcomodacao);

        if (!cliente || !acomodacao) return;

        const hospedagem = {
            cliente,
            acomodacao,
            dependentes: dependentesSelecionados,
            dataCheckIn: new Date(),
            valorTotal: valorDiaria * diasHospedagem
        };

        await addHospedagem(hospedagem);
        await setAcomodacaoIndisponivel(acomodacao.id);

        setAcomodacoes(prev => prev.filter(a => a.id !== acomodacao.id));
        navigate("/hospedagens");
    };

    const clienteSelecionado = clientes.find(c => c.id === selectedCliente);

    return (
        <div className="w-[83vw] p-6 text-black">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Realizar Check-in</h1>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6">
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cliente*</label>
                    <select
                        value={selectedCliente}
                        onChange={(e) => setSelectedCliente(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                    >
                        <option value="">Selecione um cliente</option>
                        {clientes.map(cliente => (
                            <option key={cliente.id} value={cliente.id}>
                                {cliente.nome} - {cliente.documentos[0]?.numero || 'Sem documento'}
                            </option>
                        ))}
                    </select>
                </div>

                {clienteSelecionado && (clienteSelecionado.dependentes?.length ?? 0) > 0 && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Dependentes (opcional)</label>
                        <div className="mt-2 space-y-2"> {(clienteSelecionado.dependentes || []).map(dependente => (<div key={dependente.id} className="flex items-center">
                            <input type="checkbox" id={`dependente-${dependente.id}`} checked={dependentesSelecionados.includes(dependente.id)} onChange={(e) => { if (e.target.checked) { setDependentesSelecionados([...dependentesSelecionados, dependente.id]); } else { setDependentesSelecionados(dependentesSelecionados.filter(id => id !== dependente.id)); } }}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                            <label htmlFor={`dependente-${dependente.id}`} className="ml-2 block text-sm text-gray-900"> {dependente.nome} - {dependente.documentos[0]?.numero || 'Sem documento'}
                            </label>
                        </div>))}
                        </div>
                    </div>)}

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Acomodação*</label>
                    <select
                        value={selectedAcomodacao}
                        onChange={(e) => {
                            setSelectedAcomodacao(e.target.value);
                            const acomodacao = acomodacoes.find(a => a.id === e.target.value);
                            if (acomodacao) {
                                let valor = 200;
                                if (acomodacao.nome.includes('casal')) valor = 300;
                                if (acomodacao.nome.includes('família')) valor = 400;
                                if (acomodacao.nome.includes('familias')) valor = 600;
                                setValorDiaria(valor);
                            }
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                    >
                        <option value="">Selecione uma acomodação</option>
                        {acomodacoes.map(acomodacao => (
                            <option key={acomodacao.id} value={acomodacao.id}>
                                {acomodacao.nome} - {acomodacao.camaCasal} cama(s) casal, {acomodacao.camaSolteiro} cama(s) solteiro, {acomodacao.suite} suite(s), {acomodacao.garagem} garagem(s)
                            </option>
                        ))}
                    </select>
                </div>

                {selectedAcomodacao && (
                    <>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Valor da Diária*</label>
                            <input
                                type="number"
                                value={valorDiaria}
                                onChange={(e) => setValorDiaria(Number(e.target.value))}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                required
                                min="1"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Dias de Hospedagem*</label>
                            <input
                                type="number"
                                value={diasHospedagem}
                                onChange={(e) => setDiasHospedagem(Number(e.target.value))}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                required
                                min="1"
                            />
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg mb-6">
                            <h3 className="font-medium text-blue-800 mb-2">Resumo</h3>
                            <p className="text-blue-700 font-medium">Valor total: R$ {(valorDiaria * diasHospedagem).toFixed(2)}</p>
                        </div>
                    </>
                )}

                <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={() => navigate("/hospedagens")}
                        className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 border border-transparent rounded-lg shadow-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition"
                    >
                        Confirmar Check-in
                    </button>
                </div>
            </form>
        </div>
    );
}