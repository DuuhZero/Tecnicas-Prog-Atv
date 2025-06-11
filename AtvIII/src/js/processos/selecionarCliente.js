"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const processo_1 = __importDefault(require("../abstracoes/processo"));
const armazem_1 = __importDefault(require("../dominio/armazem"));
class SelecionarCliente extends processo_1.default {
    constructor() {
        super();
        this.clientes = armazem_1.default.InstanciaUnica.Clientes;
    }
    processar() {
        console.log('Listando clientes...');
        this.clientes.forEach((cliente, index) => {
            console.log(`${index + 1} - ${cliente.Nome}`);
        });
        let numero = this.entrada.receberNumero('Digite o número do cliente desejado:');
        let clienteSelecionado = this.clientes[numero - 1];
        if (!clienteSelecionado) {
            console.log('Cliente não encontrado!');
            return undefined;
        }
        return clienteSelecionado;
    }
}
exports.default = SelecionarCliente;
