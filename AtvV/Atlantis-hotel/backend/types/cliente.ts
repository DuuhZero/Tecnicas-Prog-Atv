import type { Dependente } from "./dependente";

export interface Endereco {
  rua: string;
  bairro: string;
  cidade: string;
  estado: string;
  pais: string;
  codigoPostal: string;
}

export interface Documento {
  id?: string;
  tipo: 'CPF' | 'RG' | 'Passaporte';
  numero: string;
  dataExpedicao: Date;
}

export interface Telefone {
  id?: string;
  ddd: string;
  numero: string;
}

export interface Cliente {
  id?: string;
  nome: string;
  nomeSocial?: string;
  dataNascimento: Date;
  endereco: Endereco;
  documentos: Documento[];
  telefones: Telefone[];
  dependentes?: Array<Dependente>;
}