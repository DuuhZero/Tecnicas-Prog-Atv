import type { Cliente } from "./cliente";
import type { Acomodacao } from "./acomodacao";

export interface Hospedagem {
  id: string;
  cliente: Cliente;
  dependentes: string[]; 
  acomodacao: Acomodacao;
  dataCheckIn: Date;
  dataCheckOut?: Date;
  valorTotal: number;
}