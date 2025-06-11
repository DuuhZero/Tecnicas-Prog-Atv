"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const processo_1 = __importDefault(require("../abstracoes/processo"));
const armazem_1 = __importDefault(require("../dominio/armazem"));
const cliente_1 = __importDefault(require("../modelos/cliente"));
const cadastrarDocumentosCliente_1 = __importDefault(require("./cadastrarDocumentosCliente"));
class CadastroClienteDependente extends processo_1.default {
    constructor(titular) {
        super();
        this.titular = titular;
    }
    processar() {
        console.log("Iniciando o cadastro de um novo cliente dependente...");
        let nome = this.entrada.receberTexto("Qual o nome do novo cliente dependente?");
        let nomeSocial = this.entrada.receberTexto("Qual o nome social do novo cliente dependente?");
        let dataNascimento = this.entrada.receberData("Qual a data de nascimento?");
        let cliente = new cliente_1.default(nome, nomeSocial, dataNascimento);
        cliente.Titular = this.titular;
        this.processo = new cadastrarDocumentosCliente_1.default(cliente);
        this.processo.processar();
        this.titular.adicionarDependente(cliente);
        armazem_1.default.InstanciaUnica.adicionarCliente(cliente);
        console.log("Finalizando o cadastro do cliente dependente...");
    }
}
exports.default = CadastroClienteDependente;
