import type { Acomodacao } from "../../../backend/types/acomodacao";
import { Link } from "react-router-dom";


interface AcomodacaoCardProps {
    acomodacao: Acomodacao;
    onDelete: (id: string) => void;
}

export default function AcomodacaoCard({ acomodacao, onDelete }: AcomodacaoCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
            <div className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">{acomodacao.nome}</h3>
                        <p className="text-gray-500 mt-1">
                            <span className="font-medium">Status:</span> 
                            <span className={`ml-2 px-2 py-1 rounded-full text-xs ${acomodacao.disponivel ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {acomodacao.disponivel ? 'Disponível' : 'Indisponível'}
                            </span>
                        </p>
                    </div>

                    <div className="flex space-x-3">
                        <Link
                            to={`/acomodacoes/editar/${acomodacao.id}`}
                            className="text-blue-600 hover:text-blue-800 font-medium flex items-center text-sm"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                            Editar
                        </Link>

                        <button
                            onClick={() => acomodacao.id && onDelete(acomodacao.id)}
                            className="text-rose-600 hover:text-rose-800 bg-gray-100 font-medium flex items-center text-sm"
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
                            <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Detalhes
                    </h4>
                    <ul className="text-gray-600 ml-7 space-y-2">
                        <li className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
                            <span>Camas de casal: {acomodacao.camaCasal}</span>
                        </li>
                        <li className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-2"></span>
                            <span>Camas de solteiro: {acomodacao.camaSolteiro}</span>
                        </li>
                        <li className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mt-2 mr-2"></span>
                            <span>Vagas na garagem: {acomodacao.garagem}</span>
                        </li>
                        <li className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-pink-500 rounded-full mt-2 mr-2"></span>
                            <span>Suítes: {acomodacao.suite}</span>
                        </li>
                        <li className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-teal-500 rounded-full mt-2 mr-2"></span>
                            <span>Climatização: {acomodacao.climatizacao ? 'Sim' : 'Não'}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}