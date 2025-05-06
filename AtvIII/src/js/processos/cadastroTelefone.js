"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const processo_1 = __importDefault(require("../abstracoes/processo"));
const telefone_1 = __importDefault(require("../modelos/telefone"));
class CadastroTelefone extends processo_1.default {
    constructor(cliente) {
        super();
        this.cliente = cliente;
    }
    processar() {
        console.log('Iniciando cadastro de telefone...');
        let ddd = this.entrada.receberTexto('Qual o DDD?');
        let numero = this.entrada.receberTexto('Qual o número?');
        let telefone = new telefone_1.default(ddd, numero);
        this.cliente.Telefones.push(telefone);
        console.log('Telefone cadastrado com sucesso!');
    }
}
exports.default = CadastroTelefone;
