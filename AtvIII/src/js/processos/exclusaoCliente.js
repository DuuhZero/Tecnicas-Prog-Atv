"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const processo_1 = __importDefault(require("../abstracoes/processo"));
const armazem_1 = __importDefault(require("../dominio/armazem"));
class ExclusaoCliente extends processo_1.default {
    constructor() {
        super();
        this.clientes = armazem_1.default.InstanciaUnica.Clientes;
    }
    processar() {
        console.log('Iniciando exclusão de cliente...');
        let nome = this.entrada.receberTexto('Qual o nome do cliente a ser excluído?');
        const clienteIndex = this.clientes.findIndex(c => c.Nome.toLowerCase() === nome.toLowerCase());
        if (clienteIndex === -1) {
            console.log('Cliente não encontrado!');
            return;
        }
        const confirmacao = this.entrada.receberTexto(`Tem certeza que deseja excluir ${this.clientes[clienteIndex].Nome}? (s/n)`);
        if (confirmacao.toLowerCase() === 's') {
            this.clientes.splice(clienteIndex, 1);
            console.log('Cliente excluído com sucesso!');
        }
        else {
            console.log('Operação cancelada.');
        }
    }
}
exports.default = ExclusaoCliente;
