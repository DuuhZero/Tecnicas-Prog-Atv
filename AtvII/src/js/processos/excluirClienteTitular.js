"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const processo_1 = __importDefault(require("../abstracoes/processo"));
const armazem_1 = __importDefault(require("../dominio/armazem"));
class ExcluirClienteTitular extends processo_1.default {
    constructor() {
        super();
        this.senhaConfirmacao = "apagar";
        this.clientes = armazem_1.default.InstanciaUnica.Clientes;
    }
    processar() {
        console.log("Iniciando a exclusão de cliente titular...");
        this.listarClientes();
        let nomeCliente = this.entrada.receberTexto("Digite o nome do cliente titular a ser excluído: ");
        let cliente = this.clientes.find(cliente => cliente.Nome === nomeCliente);
        if (!cliente) {
            console.log("Cliente titular não encontrado.");
            return;
        }
        let senha = this.entrada.receberTexto("Digite a senha de confirmação: ");
        if (senha !== this.senhaConfirmacao) {
            console.log("Senha incorreta. Exclusão cancelada.");
            return;
        }
        armazem_1.default.InstanciaUnica.removerCliente(cliente);
        console.log("Cliente titular excluído com sucesso.");
    }
    listarClientes() {
        console.log("Lista de clientes titulares:");
        this.clientes.forEach(cliente => {
            if (!cliente.Titular) {
                console.log(`- ${cliente.Nome}`);
            }
        });
    }
}
exports.default = ExcluirClienteTitular;
