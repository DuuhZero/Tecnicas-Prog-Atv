import type { Acomodacao } from "../types/acomodacao";
import { NomeAcomodacao } from "../types/acomodacao";

const ACOMODACOES_KEY = 'atlantis-acomodacoes';

const loadAcomodacoes = (): Acomodacao[] => {
    const data = localStorage.getItem(ACOMODACOES_KEY);
    if (data) {
        return JSON.parse(data);
    }
    return [
        {
            id: '1',
            nome: NomeAcomodacao.SolteiroSimples,
            camaCasal: 0,
            camaSolteiro: 1,
            climatizacao: true,
            garagem: 0,
            suite: 1,
            disponivel: true
        },
        {
            id: '2',
            nome: NomeAcomodacao.CasalSimples,
            camaCasal: 1,
            camaSolteiro: 0,
            climatizacao: true,
            garagem: 1,
            suite: 1,
            disponivel: true
        },
        {
            id: '3',
            nome: NomeAcomodacao.FamilaSimples,
            camaCasal: 1,
            camaSolteiro: 2,
            climatizacao: true,
            garagem: 1,
            suite: 1,
            disponivel: true
        },
        {
            id: '4',
            nome: NomeAcomodacao.FamiliaMais,
            camaCasal: 1,
            camaSolteiro: 5,
            climatizacao: true,
            garagem: 2,
            suite: 2,
            disponivel: true
        },
        {
            id: '5',
            nome: NomeAcomodacao.SolteiroMais,
            camaCasal: 1,
            camaSolteiro: 0,
            climatizacao: true,
            garagem: 1,
            suite: 1,
            disponivel: true
        },
        {
            id: '6',
            nome: NomeAcomodacao.FamiliaSuper,
            camaCasal: 2,
            camaSolteiro: 6,
            climatizacao: true,
            garagem: 2,
            suite: 3,
            disponivel: true
        }
    ];
}

const saveAcomodacoes = (acomodacoes: Acomodacao[]) => {
    localStorage.setItem(ACOMODACOES_KEY, JSON.stringify(acomodacoes));
};

let acomodacoes: Acomodacao[] = loadAcomodacoes();

export const getAcomodacoes = async (): Promise<Acomodacao[]> => {
    return [...acomodacoes];
};

export const setAcomodacaoIndisponivel = async (id: string): Promise<void> => {
    const index = acomodacoes.findIndex(a => a.id === id);
    if (index !== -1) {
        acomodacoes[index].disponivel = false;
        saveAcomodacoes(acomodacoes);
    }
};

export const addAcomodacao = async (acomodacao: Omit<Acomodacao, 'id'>): Promise<Acomodacao> => {
    const newAcomodacao = {
      ...acomodacao,
      id: Date.now().toString()
    };
    acomodacoes.push(newAcomodacao);
    saveAcomodacoes(acomodacoes);
    return newAcomodacao;
  };
  
 
  export const updateAcomodacao = async (id: string, updates: Partial<Acomodacao>): Promise<Acomodacao | undefined> => {
    const index = acomodacoes.findIndex(a => a.id === id);
    if (index === -1) return undefined;
    
    acomodacoes[index] = {
      ...acomodacoes[index],
      ...updates
    };
    saveAcomodacoes(acomodacoes);
    return acomodacoes[index];
  };
  
  export const deleteAcomodacao = async (id: string): Promise<boolean> => {
    const lengthBefore = acomodacoes.length;
    acomodacoes = acomodacoes.filter(a => a.id !== id);
    saveAcomodacoes(acomodacoes);
    return acomodacoes.length < lengthBefore;
  };
export const getAcomodacaoById = async (id: string): Promise<Acomodacao | undefined> => {
    return acomodacoes.find(a => a.id === id);
};