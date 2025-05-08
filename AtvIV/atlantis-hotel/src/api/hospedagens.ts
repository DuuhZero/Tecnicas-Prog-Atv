import  type { Hospedagem } from "../types/hospedagem";
import { getClienteById } from "./clientes";
import { getAcomodacaoById } from "./acomodacao";

const HOSPEDAGENS_KEY = 'atlantis-hospedagens';
const loadFromStorage = <T,>(key: string): T[] => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  };
  
  
const saveToStorage = <T,>(key: string, data: T[]) => {
    localStorage.setItem(key, JSON.stringify(data));
  };
  
const parseHospedagem = (raw: any): Hospedagem => ({
    ...raw,
    dataCheckIn: new Date(raw.dataCheckIn),
    dataCheckOut: raw.dataCheckOut ? new Date(raw.dataCheckOut) : undefined
  });
let hospedagens: Hospedagem[] = loadFromStorage<Hospedagem>(HOSPEDAGENS_KEY).map(parseHospedagem);;

export const getHospedagens = async (): Promise<Hospedagem[]> => {
  return [...hospedagens];
};

export const getHospedagemById = async (id: string): Promise<Hospedagem | undefined> => {
    const hospedagem = hospedagens.find(h => h.id === id);
    console.log(hospedagem);
    if (!hospedagem) return undefined;
  
    const cliente = await getClienteById(hospedagem.cliente as unknown as string);
    const acomodacao = await getAcomodacaoById(hospedagem.acomodacao as unknown as string);
  
    if (!cliente || !acomodacao) return undefined;
  
    return {
      ...hospedagem,
      cliente,
      acomodacao
    };
  };

export const getHospedagensAtivas = async (): Promise<Hospedagem[]> => {
  return hospedagens.filter(h => !h.dataCheckOut);
};

export const addHospedagem = async (hospedagem: Omit<Hospedagem, 'id'>): Promise<Hospedagem> => {
  const newHospedagem = { ...hospedagem, id: Date.now().toString() };
  hospedagens.push(newHospedagem);
  saveToStorage(HOSPEDAGENS_KEY, hospedagens);
  return newHospedagem;
};

export const checkOut = async (id: string): Promise<Hospedagem | undefined> => {
  const hospedagem = hospedagens.find(h => h.id === id);
  if (!hospedagem) return undefined;
  
  hospedagem.dataCheckOut = new Date();
  saveToStorage(HOSPEDAGENS_KEY, hospedagens);
  return hospedagem;
};