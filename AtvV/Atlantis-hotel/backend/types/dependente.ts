import type { Documento } from './cliente';

export interface Dependente {
  id?: string;
  nome: string;
  nomeSocial?: string;
  dataNascimento: Date;
  documentos: Documento[];
  titularId: string;
}