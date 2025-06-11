"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const processo_1 = __importDefault(require("../abstracoes/processo"));
const armazem_1 = __importDefault(require("../dominio/armazem"));
const cadastrarDocumentosCliente_1 = __importDefault(require("./cadastrarDocumentosCliente"));
const cadastroTelefone_1 = __importDefault(require("./cadastroTelefone"));
const cadastroEnderecoTitular_1 = __importDefault(require("./cadastroEnderecoTitular"));
class EditarClienteTitular extends processo_1.default {
    constructor() {
        super();
        this.cliente = this.buscarCliente();
    }
    processar() {
        if (!this.cliente) {
            console.log("Cliente não encontrado.");
            return;
        }
        let execucao = true;
        while (execucao) {
            console.log("Qual informação deseja editar?");
            console.log("1 - Nome");
            console.log("2 - Nome Social");
            console.log("3 - Data de Nascimento");
            console.log("4 - Documentos");
            console.log("5 - Telefones");
            console.log("6 - Endereço");
            console.log("0 - Finalizar edição");
            this.opcao = this.entrada.receberNumero("Opção: ");
            switch (this.opcao) {
                case 1:
                    this.cliente.Nome = this.entrada.receberTexto("Novo nome: ");
                    break;
                case 2:
                    this.cliente.NomeSocial = this.entrada.receberTexto("Novo nome social: ");
                    break;
                case 3:
                    this.cliente.DataNascimento = this.entrada.receberData("Nova data de nascimento: ");
                    break;
                case 4:
                    this.processo = new cadastrarDocumentosCliente_1.default(this.cliente);
                    this.processo.processar();
                    break;
                case 5:
                    this.processo = new cadastroTelefone_1.default(this.cliente);
                    this.processo.processar();
                    break;
                case 6:
                    this.processo = new cadastroEnderecoTitular_1.default(this.cliente);
                    this.processo.processar();
                    break;
                case 0:
                    execucao = false;
                    break;
                default:
                    console.log("Opção inválida.");
            }
        }
        console.log("Edição do cliente titular finalizada.");
    }
    buscarCliente() {
        let nomeCliente = this.entrada.receberTexto("Digite o nome do cliente titular a ser editado: ");
        return armazem_1.default.InstanciaUnica.Clientes.find(cliente => cliente.Nome === nomeCliente && !cliente.Titular);
    }
}
exports.default = EditarClienteTitular;
