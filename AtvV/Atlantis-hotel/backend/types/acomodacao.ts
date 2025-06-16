export enum NomeAcomodacao {
  SolteiroSimples = 'Solteiro Simples',
  SolteiroMais = 'Solteiro Mais',
  CasalSimples = 'Casal Simples',
  FamiliaSimples = 'Família Simples',
  FamiliaMais = 'Família Mais',
  FamiliaSuper = 'Família Super'
}

export interface Acomodacao {
  id?: string;
  nome: NomeAcomodacao;
  camaCasal: number;
  camaSolteiro: number;
  climatizacao: boolean;
  garagem: number;
  suite: number;
  disponivel: boolean;
}