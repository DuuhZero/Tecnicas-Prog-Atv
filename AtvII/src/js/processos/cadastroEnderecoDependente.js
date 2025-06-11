"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const processo_1 = __importDefault(require("../abstracoes/processo"));
class CadastroEnderecoDependente extends processo_1.default {
    constructor(cliente, enderecoTitular) {
        super();
        this.cliente = cliente;
        this.enderecoTitular = enderecoTitular;
    }
    processar() {
        this.cliente.Endereco = this.enderecoTitular.clonar();
        console.log("Endereço do dependente cadastrado com sucesso.");
    }
}
exports.default = CadastroEnderecoDependente;
