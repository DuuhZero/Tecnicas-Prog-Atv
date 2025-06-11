"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const processo_1 = __importDefault(require("../abstracoes/processo"));
const armazem_1 = __importDefault(require("../dominio/armazem"));
const impressorCliente_1 = __importDefault(require("../impressores/impressorCliente"));
class ListagemHospedesHistorico extends processo_1.default {
    processar() {
        console.log('\nListando histórico completo de hóspedes...');
        const hospedagens = armazem_1.default.InstanciaUnica.HospedagensHistorico;
        if (hospedagens.length === 0) {
            console.log('Não há registros no histórico de hospedagens!');
            return;
        }
        console.log(`Total de registros históricos: ${hospedagens.length}\n`);
        hospedagens.forEach((hospedagem, index) => {
            console.log(`Registro ${index + 1}:`);
            this.impressor = new impressorCliente_1.default(hospedagem.Cliente);
            console.log(this.impressor.imprimir());
            console.log(`Acomodação: ${hospedagem.Acomodacao.NomeAcomadacao}`);
            console.log(`Data Check-in: ${hospedagem.DataCheckIn.toLocaleDateString()}`);
            if (hospedagem.DataCheckOut) {
                console.log(`Data Check-out: ${hospedagem.DataCheckOut.toLocaleDateString()}`);
                const diffTime = Math.abs(hospedagem.DataCheckOut.getTime() - hospedagem.DataCheckIn.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                console.log(`Duração da estadia: ${diffDays} dia(s)`);
            }
            console.log('--------------------------------------');
        });
    }
}
exports.default = ListagemHospedesHistorico;
