import { useState, useEffect } from "react";
import { getHospedagens, getHospedagensAtivas, checkOut } from "../database";
import type { Hospedagem } from "../../../backend/types/hospedagem";
import { Link } from "react-router-dom";

export default function HospedagensPage() {
    const [hospedagensAtivas, setHospedagensAtivas] = useState<Hospedagem[]>([]);
    const [hospedagensHistorico, setHospedagensHistorico] = useState<Hospedagem[]>([]);
    const [showAtivas, setShowAtivas] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHospedagens = async () => {
            try {
                const ativas = await getHospedagensAtivas();
                console.log('Hospedagens Ativas:', ativas); 
                setHospedagensAtivas(ativas);

                const todas = await getHospedagens();
                console.log('Todas Hospedagens:', todas); 
                const historico = todas.filter(h => h.dataCheckOut);
                setHospedagensHistorico(historico);
            } catch (err) {
                setError("Erro ao carregar hospedagens.");
                console.error('Fetch error:', err);
            }
        };
        fetchHospedagens();
    }, []);

    const handleCheckOut = async (id: string) => {
        try {
            await checkOut(id);
            const ativas = await getHospedagensAtivas();
            console.log('Hospedagens Ativas após checkout:', ativas);
            const todas = await getHospedagens();
            console.log('Todas Hospedagens após checkout:', todas);
            const historico = todas.filter(h => h.dataCheckOut);
            setHospedagensAtivas(ativas);
            setHospedagensHistorico(historico);
        } catch (err) {
            setError("Erro ao realizar check-out.");
            console.error("Erro ao realizar check-out:", err);
        }
    };

    return (
        <div className="w-[83vw] p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Hospedagens</h1>
                <Link
                    to="/checkin"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 hover:text-white transition flex items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    Realizar Check-in
                </Link>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            <div className="flex space-x-4 mb-6">
                <button
                    onClick={() => setShowAtivas(true)}
                    className={`px-4 py-2 rounded-lg ${showAtivas ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} transition`}
                >
                    Hospedagens Ativas
                </button>
                <button
                    onClick={() => setShowAtivas(false)}
                    className={`px-4 py-2 rounded-lg ${!showAtivas ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} transition`}
                >
                    Histórico
                </button>
            </div>

            {showAtivas ? (
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Hospedagens Ativas</h2>
                    {hospedagensAtivas.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                            <p className="text-gray-500">Nenhuma hospedagem ativa no momento.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {hospedagensAtivas.map(hospedagem => (
                                <div key={hospedagem.id} className="bg-white rounded-xl shadow-lg p-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                {hospedagem.cliente && typeof hospedagem.cliente !== "string" ? hospedagem.cliente.nome : "Cliente não encontrado"}
                                            </h3>
                                            <p className="text-gray-600 mt-1">
                                                <span className="font-medium">Acomodação:</span> {hospedagem.acomodacao && typeof hospedagem.acomodacao !== "string" ? hospedagem.acomodacao.nome : "Acomodação não encontrada"}
                                            </p>
                                            <p className="text-gray-600 mt-1">
                                                <span className="font-medium">Check-in:</span> {new Date(hospedagem.dataCheckIn).toLocaleString()}
                                            </p>
                                            <p className="text-gray-600 mt-1">
                                                <span className="font-medium">Valor de Estadia: R$</span>{hospedagem.valorTotal.toFixed(2)}
                                            </p>
                                            {hospedagem.dependentes.length > 0 && (
                                                <p className="text-gray-600 mt-1">
                                                    <span className="font-medium">Dependentes:</span> {hospedagem.dependentes.length}
                                                </p>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => hospedagem.id && handleCheckOut(hospedagem.id)}
                                            disabled={!hospedagem.id}
                                            className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition flex items-center"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2 2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                            </svg>
                                            Check-out
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Histórico de Hospedagens</h2>
                    {hospedagensHistorico.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                            <p className="text-gray-500">Nenhuma hospedagem no histórico.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {hospedagensHistorico.map(hospedagem => (
                                <div key={hospedagem.id} className="bg-white rounded-xl shadow-lg p-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {hospedagem.cliente && typeof hospedagem.cliente !== "string" ? hospedagem.cliente.nome : "Cliente não encontrado"}
                                        </h3>
                                        <p className="text-gray-600 mt-1">
                                            <span className="font-medium">Acomodação:</span> {hospedagem.acomodacao && typeof hospedagem.acomodacao !== "string" ? hospedagem.acomodacao.nome : "Acomodação não encontrada"}
                                        </p>
                                        <p className="text-gray-600 mt-1">
                                            <span className="font-medium">Check-in:</span> {new Date(hospedagem.dataCheckIn).toLocaleString()}
                                        </p>
                                        <p className="text-gray-600 mt-1">
                                            <span className="font-medium">Check-out:</span> {hospedagem.dataCheckOut ? new Date(hospedagem.dataCheckOut).toLocaleString() : 'Pendente'}
                                        </p>
                                        <p className="text-gray-600 mt-1">
                                            <span className="font-medium">Valor de Estadia: R$</span>{hospedagem.valorTotal.toFixed(2)}
                                        </p>
                                        {hospedagem.dependentes.length > 0 && (
                                            <p className="text-gray-600 mt-1">
                                                <span className="font-medium">Dependentes:</span> {hospedagem.dependentes.length}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}