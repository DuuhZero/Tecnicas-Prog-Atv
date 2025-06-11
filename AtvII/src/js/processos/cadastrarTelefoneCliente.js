"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const processo_1 = __importDefault(require("../abstracoes/processo"));
const cadastroTelefone_1 = __importDefault(require("./cadastroTelefone"));
class CadastrarTelefoneCliente extends processo_1.default {
    constructor(cliente) {
        super();
        this.cliente = cliente;
        this.execucao = true;
    }
    processar() {
        console.log('Inciando o cadastro de telefone...');
        while (this.execucao) {
            this.menu.mostrar();
            this.processo = new cadastroTelefone_1.default(this.cliente);
            this.processo.processar();
            break;
        }
    }
}
exports.default = CadastrarTelefoneCliente;
