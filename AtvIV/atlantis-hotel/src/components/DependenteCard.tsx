import type { Dependente } from "../types/dependente";
import { Link } from "react-router-dom";

interface DependenteCardProps {
    dependente: Dependente;
    onDelete: (id: string) => void;
}

export default function DependenteCard({ dependente, onDelete }: DependenteCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
            <div className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">{dependente.nome}</h3>
                        {dependente.nomeSocial && (
                            <p className="text-gray-500 mt-1">
                                <span className="font-medium">Nome Social:</span> {dependente.nomeSocial}
                            </p>
                        )}
                        <p className="text-gray-500 mt-1">
                            <span className="font-medium">Data de Nascimento:</span> {
                                new Intl.DateTimeFormat('pt-BR', {
                                    timeZone: 'UTC'
                                }).format(new Date(dependente.dataNascimento))
                            }
                        </p>
                    </div>

                    <div className="flex space-x-3">
                        <Link
                            to={`/dependentes/editar/${dependente.id}`}
                            className="text-blue-600 hover:text-blue-800 font-medium flex items-center text-sm"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                            Editar
                        </Link>

                        <button
                            onClick={() => onDelete(dependente.id)}
                            className="text-rose-600 hover:text-rose-800 bg-red-100 font-medium flex items-center text-sm"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            Excluir
                        </button>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                    <h4 className="text-lg font-semibold text-gray-700 flex items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                            <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                        </svg>
                        Documentos
                    </h4>
                    <ul className="text-gray-600 ml-7 space-y-1">
                        {dependente.documentos.map((doc, index) => (
                            <li key={index} className="flex items-start">
                                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
                                <span>
                                    {doc.tipo}: {doc.numero} (Expedição: {new Date(doc.dataExpedicao).toLocaleDateString()})
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}