import  type { Cliente } from "../types/cliente";
import  type { Dependente } from "../types/dependente";


const CLIENTES_KEY = 'atlantis-clientes';
const DEPENDENTES_KEY = 'atlantis-dependentes';

const loadFromStorage = <T,>(key: string): T[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};


const saveToStorage = <T,>(key: string, data: T[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};

let clientes: Cliente[] = loadFromStorage<Cliente>(CLIENTES_KEY);
let dependentes: Dependente[] = loadFromStorage<Dependente>(DEPENDENTES_KEY);

export const getClientes = async (): Promise<Cliente[]> => {
  return [...clientes];
};

export const getClienteById = async (id: string): Promise<Cliente | undefined> => {
  return clientes.find(c => c.id === id);
};

export const addCliente = async (cliente: Omit<Cliente, 'id'>): Promise<Cliente> => {
  const newCliente = { ...cliente, id: Date.now().toString() };
  clientes.push(newCliente);
  saveToStorage(CLIENTES_KEY, clientes);
  return newCliente;
};

export const updateCliente = async (id: string, updates: Partial<Cliente>): Promise<Cliente | undefined> => {
  const index = clientes.findIndex(c => c.id === id);
  if (index === -1) return undefined;
  
  clientes[index] = { 
    ...clientes[index], 
    ...updates,       
    id: clientes[index].id, 
    endereco: {
      ...clientes[index].endereco, 
      ...updates.endereco 
    }
  };
  saveToStorage(CLIENTES_KEY, clientes);
  return clientes[index];
};

export const deleteCliente = async (id: string): Promise<boolean> => {
  const lengthBefore = clientes.length;
  clientes = clientes.filter(c => c.id !== id);
  saveToStorage(CLIENTES_KEY, clientes);
  return clientes.length < lengthBefore;
};

export const getDependentesByTitular = async (titularId: string): Promise<Dependente[]> => {
  return dependentes.filter(d => d.titularId === titularId);
};
export const getDependenteById = async (id: string): Promise<Dependente | undefined> => {
    return dependentes.find(d => d.id === id);
  };
export const addDependente = async (dependente: Omit<Dependente, 'id'>): Promise<Dependente> => {
  const newDependente = { ...dependente, id: Date.now().toString() };
  dependentes.push(newDependente);
  saveToStorage(DEPENDENTES_KEY, dependentes);
  return newDependente;
};

export const updateDependente = async (id: string, updates: Partial<Dependente>): Promise<Dependente | undefined> => {
    const index = dependentes.findIndex(d => d.id === id);
    if (index === -1) return undefined;
    
   
    dependentes[index] = { 
      ...dependentes[index], 
      ...updates,          
      id: dependentes[index].id,
      titularId: dependentes[index].titularId
    };
    saveToStorage(DEPENDENTES_KEY, dependentes);
    return dependentes[index];
  };

export const deleteDependente = async (id: string): Promise<boolean> => {
  const lengthBefore = dependentes.length;
  dependentes = dependentes.filter(d => d.id !== id);
  saveToStorage(DEPENDENTES_KEY, dependentes);
  return dependentes.length < lengthBefore;
};