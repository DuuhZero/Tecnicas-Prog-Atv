"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const processo_1 = __importDefault(require("../abstracoes/processo"));
const menuTipoCadastroCliente_1 = __importDefault(require("../menus/menuTipoCadastroCliente"));
const cadastroClienteDependente_1 = __importDefault(require("./cadastroClienteDependente"));
const cadastroClienteTitular_1 = __importDefault(require("./cadastroClienteTitular"));
const armazem_1 = __importDefault(require("../dominio/armazem"));
class TipoCadastroCliente extends processo_1.default {
    constructor() {
        super();
        this.menu = new menuTipoCadastroCliente_1.default();
    }
    processar() {
        this.menu.mostrar();
        this.opcao = this.entrada.receberNumero('Qual opção desejada?');
        switch (this.opcao) {
            case 1:
                this.processo = new cadastroClienteTitular_1.default();
                this.processo.processar();
                break;
            case 2:
                let nomeTitular = this.entrada.receberTexto("Digite o nome do titular do dependente: ");
                let titular = armazem_1.default.InstanciaUnica.Clientes.find(cliente => cliente.Nome === nomeTitular);
                if (titular) {
                    this.processo = new cadastroClienteDependente_1.default(titular);
                    this.processo.processar();
                }
                else {
                    console.log("Titular não encontrado.");
                }
                break;
            default:
                console.log('Opção não entendida :(');
        }
    }
}
exports.default = TipoCadastroCliente;
