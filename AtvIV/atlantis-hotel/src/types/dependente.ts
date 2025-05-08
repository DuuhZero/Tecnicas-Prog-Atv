import type { Documento } from "./cliente";

export interface Dependente {
  id: string;
  titularId: string;
  nome: string;
  nomeSocial?: string;
  dataNascimento: Date;
  documentos: Documento[];
}