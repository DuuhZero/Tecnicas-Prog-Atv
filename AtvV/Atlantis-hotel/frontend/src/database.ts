import axios from 'axios';
import type { Acomodacao } from '../../backend/types/acomodacao';
import type { Cliente } from '../../backend/types/cliente';
import type { Dependente } from '../../backend/types/dependente';
import type { Hospedagem } from '../../backend/types/hospedagem';

const API_BASE_URL = '/api'; // Proxied to http://localhost:3001/api

export async function initializeDatabase(): Promise<void> {
  // No-op in frontend; handled by backend
}

export const getAcomodacoes = async (): Promise<Acomodacao[]> => {
  const response = await axios.get(`${API_BASE_URL}/acomodacoes`);
  return response.data;
};

export const getAcomodacaoById = async (id: string): Promise<Acomodacao | undefined> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/acomodacoes/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return undefined;
    }
    throw error;
  }
};

export const setAcomodacaoIndisponivel = async (id: string): Promise<void> => {
  await axios.patch(`${API_BASE_URL}/acomodacoes/${id}/indisponivel`);
};

export const addAcomodacao = async (acomodacao: Omit<Acomodacao, 'id'>): Promise<Acomodacao> => {
  const response = await axios.post(`${API_BASE_URL}/acomodacoes`, acomodacao);
  return response.data;
};

export const updateAcomodacao = async (id: string, updates: Partial<Acomodacao>): Promise<Acomodacao> => {
  const response = await axios.put(`${API_BASE_URL}/acomodacoes/${id}`, updates);
  return response.data;
};

export const deleteAcomodacao = async (id: string): Promise<boolean> => {
  await axios.delete(`${API_BASE_URL}/acomodacoes/${id}`);
  return true;
};

export const getClientes = async (): Promise<Cliente[]> => {
  const response = await axios.get(`${API_BASE_URL}/clientes`);
  return response.data;
};

export const addCliente = async (cliente: Omit<Cliente, 'id'>): Promise<Cliente> => {
  const response = await axios.post(`${API_BASE_URL}/clientes`, cliente);
  return response.data;
};

export const getClienteById = async (id: string): Promise<Cliente | undefined> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/clientes/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return undefined;
    }
    throw error;
  }
};

export const updateCliente = async (id: string, updates: Partial<Cliente>): Promise<Cliente> => {
  const response = await axios.put(`${API_BASE_URL}/clientes/${id}`, updates);
  return response.data;
};

export const deleteCliente = async (id: string): Promise<boolean> => {
  await axios.delete(`${API_BASE_URL}/clientes/${id}`);
  return true;
};

export const getDependentesByTitular = async (titularId: string): Promise<Dependente[]> => {
  const response = await axios.get(`${API_BASE_URL}/dependentes/titular/${titularId}`);
  return response.data;
};

export const getDependenteById = async (id: string): Promise<Dependente | undefined> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dependentes/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return undefined;
    }
    throw error;
  }
};

export const addDependente = async (dependente: Omit<Dependente, 'id'>): Promise<Dependente> => {
  const response = await axios.post(`${API_BASE_URL}/dependentes`, dependente);
  return response.data;
};

export const updateDependente = async (id: string, updates: Partial<Dependente>): Promise<Dependente> => {
  const response = await axios.put(`${API_BASE_URL}/dependentes/${id}`, updates);
  return response.data;
};

export const deleteDependente = async (id: string): Promise<boolean> => {
  await axios.delete(`${API_BASE_URL}/dependentes/${id}`);
  return true;
};

export const getHospedagens = async (): Promise<Hospedagem[]> => {
  const response = await axios.get(`${API_BASE_URL}/hospedagens`);
  return response.data;
};

export const getHospedagensAtivas = async (): Promise<Hospedagem[]> => {
  const response = await axios.get(`${API_BASE_URL}/hospedagens/ativas`);
  return response.data;
};

export const addHospedagem = async (hospedagem: Omit<Hospedagem, 'id'>): Promise<Hospedagem> => {
  const response = await axios.post(`${API_BASE_URL}/hospedagens`, hospedagem);
  return response.data;
};

export const checkOut = async (id: string): Promise<Hospedagem> => {
  const response = await axios.patch(`${API_BASE_URL}/hospedagens/${id}/checkout`);
  return response.data;
};