import type { Cliente } from './cliente';
   import type { Acomodacao } from './acomodacao';
   import type { Dependente } from './dependente';

   export interface Hospedagem {
     id?: string;
     cliente: string | Cliente;
     acomodacao: string | Acomodacao;
     dependentes: Array<string | Dependente>;
     dataCheckIn: Date;
     dataCheckOut?: Date | null;
     valorTotal: number;
   }