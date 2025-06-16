import { useState, useEffect } from "react";
import type { Cliente, Documento, Telefone } from "../../../backend/types/cliente";
import { addCliente, updateCliente, getClienteById } from "../database";

interface ClienteFormProps {
    clienteId?: string;
    onSuccess: () => void;
    onCancel?: () => void;
}

export default function ClienteForm({ clienteId, onSuccess, onCancel }: ClienteFormProps) {
    const [cliente, setCliente] = useState<Omit<Cliente, 'id'>>({
        nome: '',
        nomeSocial: '',
        dataNascimento: new Date(),
        endereco: {
            rua: '',
            bairro: '',
            cidade: '',
            estado: '',
            pais: '',
            codigoPostal: ''
        },
        documentos: [],
        telefones: []
    });
    const [novoDocumento, setNovoDocumento] = useState<Omit<Documento, 'id'>>({
        tipo: 'CPF',
        numero: '',
        dataExpedicao: new Date()
    });
    const [novoTelefone, setNovoTelefone] = useState<Omit<Telefone, 'id'>>({
        ddd: '',
        numero: ''
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (clienteId) {
            const fetchCliente = async () => {
                try {
                    const clienteData = await getClienteById(clienteId);
                    if (clienteData) {
                        setCliente({
                            ...clienteData,
                            dataNascimento: new Date(clienteData.dataNascimento),
                            nomeSocial: clienteData.nomeSocial || ''
                        });
                    }
                } catch (err) {
                    setError("Erro ao carregar cliente.");
                }
            };
            fetchCliente();
        }
    }, [clienteId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCliente(prev => ({ ...prev, [name]: value }));
    };

    const handleEnderecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCliente(prev => ({
            ...prev,
            endereco: {
                ...prev.endereco,
                [name]: value
            }
        }));
    };

    const handleDataNascimentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const date = new Date(e.target.value);
        if (!isNaN(date.getTime())) {
            setCliente(prev => ({
                ...prev,
                dataNascimento: date
            }));
        }
    };

    const handleAddDocumento = () => {
        if (novoDocumento.numero && novoDocumento.dataExpedicao) {
            setCliente(prev => ({
                ...prev,
                documentos: [...prev.documentos, { ...novoDocumento }]
            }));
            setNovoDocumento({
                tipo: 'CPF',
                numero: '',
                dataExpedicao: new Date()
            });
        } else {
            setError("Preencha todos os campos do documento.");
        }
    };

    const handleRemoveDocumento = (index: number) => {
        setCliente(prev => ({
            ...prev,
            documentos: prev.documentos.filter((_, i) => i !== index)
        }));
    };

    const handleAddTelefone = () => {
        if (novoTelefone.ddd && novoTelefone.numero) {
            setCliente(prev => ({
                ...prev,
                telefones: [...prev.telefones, { ...novoTelefone }]
            }));
            setNovoTelefone({
                ddd: '',
                numero: ''
            });
        } else {
            setError("Preencha todos os campos do telefone.");
        }
    };

    const handleRemoveTelefone = (index: number) => {
        setCliente(prev => ({
            ...prev,
            telefones: prev.telefones.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!cliente.nome || !cliente.endereco.rua || !cliente.endereco.bairro || !cliente.endereco.cidade || 
            !cliente.endereco.estado || !cliente.endereco.pais || !cliente.endereco.codigoPostal) {
            setError("Preencha todos os campos obrigatórios.");
            return;
        }
        try {
            setError(null);
            if (clienteId) {
                await updateCliente(clienteId, {
                    nome: cliente.nome,
                    nomeSocial: cliente.nomeSocial,
                    dataNascimento: cliente.dataNascimento,
                    endereco: cliente.endereco,
                    documentos: cliente.documentos,
                    telefones: cliente.telefones
                });
            } else {
                await addCliente(cliente);
            }
            onSuccess();
        } catch (error) {
            setError("Erro ao salvar cliente. Tente novamente.");
            console.error("Erro ao salvar cliente:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white text-black rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {clienteId ? 'Editar Cliente' : 'Cadastrar Novo Cliente'}
            </h2>

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome*</label>
                    <input
                        type="text"
                        name="nome"
                        value={cliente.nome}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome Social (opcional)</label>
                    <input
                        type="text"
                        name="nomeSocial"
                        value={cliente.nomeSocial || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                </div>
            </div>

            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento*</label>
                <input
                    type="date"
                    value={cliente.dataNascimento.toISOString().split('T')[0]}
                    onChange={handleDataNascimentoChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                />
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Endereço
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rua*</label>
                        <input
                            type="text"
                            name="rua"
                            value={cliente.endereco.rua}
                            onChange={handleEnderecoChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bairro*</label>
                        <input
                            type="text"
                            name="bairro"
                            value={cliente.endereco.bairro}
                            onChange={handleEnderecoChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cidade*</label>
                        <input
                            type="text"
                            name="cidade"
                            value={cliente.endereco.cidade}
                            onChange={handleEnderecoChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Estado*</label>
                        <input
                            type="text"
                            name="estado"
                            value={cliente.endereco.estado}
                            onChange={handleEnderecoChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">País*</label>
                        <input
                            type="text"
                            name="pais"
                            value={cliente.endereco.pais}
                            onChange={handleEnderecoChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Código Postal*</label>
                        <input
                            type="text"
                            name="codigoPostal"
                            value={cliente.endereco.codigoPostal}
                            onChange={handleEnderecoChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                    </svg>
                    Documentos
                </h3>

                <div className="space-y-3 mb-4">
                    {cliente.documentos.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                            <div>
                                <span className="font-medium text-gray-700">{doc.tipo}:</span> {doc.numero}
                                <span className="text-gray-500 ml-2">(Expedição: {new Date(doc.dataExpedicao).toLocaleDateString()})</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleRemoveDocumento(index)}
                                className="text-rose-500 hover:text-rose-700 p-1 rounded-full hover:bg-rose-50"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <select
                            value={novoDocumento.tipo}
                            onChange={(e) => setNovoDocumento({ ...novoDocumento, tipo: e.target.value as 'CPF' | 'RG' | 'Passaporte' })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        >
                            <option value="CPF">CPF</option>
                            <option value="RG">RG</option>
                            <option value="Passaporte">Passaporte</option>
                        </select>
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Número"
                            value={novoDocumento.numero}
                            onChange={(e) => setNovoDocumento({ ...novoDocumento, numero: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>
                    <div>
                        <input
                            type="date"
                            value={new Date(novoDocumento.dataExpedicao).toISOString().split('T')[0]}
                            onChange={(e) => setNovoDocumento({ ...novoDocumento, dataExpedicao: new Date(e.target.value) })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={handleAddDocumento}
                            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Adicionar
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Telefones
                </h3>

                <div className="space-y-3 mb-4">
                    {cliente.telefones.map((tel, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                            <div className="font-medium text-gray-700">({tel.ddd}) {tel.numero}</div>
                            <button
                                type="button"
                                onClick={() => handleRemoveTelefone(index)}
                                className="text-rose-500 hover:text-rose-700 p-1 rounded-full hover:bg-rose-50"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <input
                            type="text"
                            placeholder="DDD"
                            value={novoTelefone.ddd}
                            onChange={(e) => setNovoTelefone({ ...novoTelefone, ddd: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Número"
                            value={novoTelefone.numero}
                            onChange={(e) => setNovoTelefone({ ...novoTelefone, numero: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={handleAddTelefone}
                            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Adicionar
                        </button>
                    </div>
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
                    {clienteId ? 'Atualizar Cliente' : 'Cadastrar Cliente'}
                </button>
            </div>
        </form>
    );
}