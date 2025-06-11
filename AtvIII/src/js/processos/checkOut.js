"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const processo_1 = __importDefault(require("../abstracoes/processo"));
const armazem_1 = __importDefault(require("../dominio/armazem"));
class CheckOut extends processo_1.default {
    processar() {
        console.log('Iniciando check-out...');
        const hospedagensAtivas = armazem_1.default.InstanciaUnica.HospedagensAtivas;
        if (hospedagensAtivas.length === 0) {
            console.log('Não há hóspedes ativos para check-out!');
            return;
        }
        console.log('Hóspedes ativos:');
        hospedagensAtivas.forEach((hospedagem, index) => {
            console.log(`${index + 1} - ${hospedagem.Cliente.Nome} (${hospedagem.Acomodacao.NomeAcomadacao})`);
        });
        const numero = this.entrada.receberNumero('Digite o número do hóspede para check-out:');
        const hospedagem = hospedagensAtivas[numero - 1];
        if (!hospedagem) {
            console.log('Hóspede não encontrado!');
            return;
        }
        const dataCheckOut = new Date();
        armazem_1.default.InstanciaUnica.finalizarHospedagem(hospedagem, dataCheckOut);
        console.log(`Check-out realizado com sucesso para ${hospedagem.Cliente.Nome}!`);
    }
}
exports.default = CheckOut;
