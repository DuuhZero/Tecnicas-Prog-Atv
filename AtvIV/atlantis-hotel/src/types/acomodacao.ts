export enum NomeAcomodacao {
    SolteiroSimples = 'Acomodação simples para solteiro(a)',
    CasalSimples = 'Acomodação simples para casal',
    FamilaSimples = 'Acomodação para família com até duas crianças',
    FamiliaMais = 'Acomodação para família com até cinco crianças',
    SolteiroMais = 'Acomodação com garagem para solteiro(a)',
    FamiliaSuper = 'Acomodação para até duas familias, casal e três crianças cada'
  }
  
  export interface Acomodacao {
    id: string;
    nome: NomeAcomodacao;
    camaCasal: number;
    camaSolteiro: number;
    climatizacao: boolean;
    garagem: number;
    suite: number;
    disponivel: boolean;
  }