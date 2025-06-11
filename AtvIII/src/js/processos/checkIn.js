"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const processo_1 = __importDefault(require("../abstracoes/processo"));
const armazem_1 = __importDefault(require("../dominio/armazem"));
const impressorAcomodacao_1 = __importDefault(require("../impressores/impressorAcomodacao"));
const hospedagem_1 = __importDefault(require("../modelos/hospedagem"));
const listagemAcomodacoes_1 = __importDefault(require("./listagemAcomodacoes"));
const selecionarCliente_1 = __importDefault(require("./selecionarCliente"));
class CheckIn extends processo_1.default {
    processar() {
        console.log('Iniciando check-in...');
        const cliente = new selecionarCliente_1.default().processar();
        if (!cliente)
            return;
        new listagemAcomodacoes_1.default().processar();
        const acomodacoes = armazem_1.default.InstanciaUnica.Acomodacoes;
        if (acomodacoes.length === 0) {
            console.log('Nenhuma acomodação cadastrada!');
            return;
        }
        acomodacoes.forEach((acomodacao, index) => {
            console.log(`\nOpção ${index + 1}:`);
            const impressor = new impressorAcomodacao_1.default(acomodacao);
            console.log(impressor.imprimir());
            console.log('--------------------------------------');
        });
        const numeroAcomodacao = this.entrada.receberNumero('Digite o número da acomodação desejada:');
        const acomodacao = acomodacoes[numeroAcomodacao - 1];
        if (!acomodacao) {
            console.log('Acomodação não encontrada!');
            return;
        }
        const hospedagensAtivas = armazem_1.default.InstanciaUnica.HospedagensAtivas;
        const acomodacaoEmUso = hospedagensAtivas.some(h => h.Acomodacao === acomodacao);
        if (acomodacaoEmUso) {
            console.log('Esta acomodação já está ocupada! Por favor, escolha outra.');
            return;
        }
        const dataCheckIn = new Date();
        const hospedagem = new hospedagem_1.default(cliente, acomodacao, dataCheckIn);
        armazem_1.default.InstanciaUnica.adicionarHospedagem(hospedagem);
        console.log(`Check-in realizado com sucesso para ${cliente.Nome} na acomodação ${acomodacao.NomeAcomadacao}!`);
    }
}
exports.default = CheckIn;
