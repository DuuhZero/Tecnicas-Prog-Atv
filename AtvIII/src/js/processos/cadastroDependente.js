"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const processo_1 = __importDefault(require("../abstracoes/processo"));
const cliente_1 = __importDefault(require("../modelos/cliente"));
const cadastroEnderecoTitular_1 = __importDefault(require("./cadastroEnderecoTitular"));
const cadastroDocumentosCliente_1 = __importDefault(require("./cadastroDocumentosCliente"));
class CadastroDependente extends processo_1.default {
    constructor(titular) {
        super();
        this.titular = titular;
        this.dependentes = titular.Dependentes;
    }
    processar() {
        console.log('Iniciando o cadastro de um novo dependente...');
        let nome = this.entrada.receberTexto('Qual o nome do novo dependente?');
        let nomeSocial = this.entrada.receberTexto('Qual o nome social do novo dependente?');
        let dataNascimento = this.entrada.receberData('Qual a data de nascimento?');
        let dependente = new cliente_1.default(nome, nomeSocial, dataNascimento);
        dependente.Titular = this.titular;
        this.processo = new cadastroEnderecoTitular_1.default(dependente);
        this.processo.processar();
        this.processo = new cadastroDocumentosCliente_1.default(dependente);
        this.processo.processar();
        this.dependentes.push(dependente);
        console.log('Finalizando o cadastro do dependente...');
    }
}
exports.default = CadastroDependente;
