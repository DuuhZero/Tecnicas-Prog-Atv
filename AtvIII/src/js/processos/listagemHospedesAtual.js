"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const processo_1 = __importDefault(require("../abstracoes/processo"));
const armazem_1 = __importDefault(require("../dominio/armazem"));
const impressorCliente_1 = __importDefault(require("../impressores/impressorCliente"));
class ListagemHospedesAtuais extends processo_1.default {
    processar() {
        console.log('Listando hóspedes atuais...');
        const hospedagens = armazem_1.default.InstanciaUnica.HospedagensAtivas;
        if (hospedagens.length === 0) {
            console.log('Não há hóspedes ativos no momento!');
            return;
        }
        hospedagens.forEach(hospedagem => {
            this.impressor = new impressorCliente_1.default(hospedagem.Cliente);
            console.log(this.impressor.imprimir());
            console.log(`Acomodação: ${hospedagem.Acomodacao.NomeAcomadacao}`);
            console.log(`Data Check-in: ${hospedagem.DataCheckIn.toLocaleDateString()}`);
            console.log('--------------------------------------');
        });
    }
}
exports.default = ListagemHospedesAtuais;
