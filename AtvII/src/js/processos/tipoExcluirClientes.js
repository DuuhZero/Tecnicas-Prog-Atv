"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const processo_1 = __importDefault(require("../abstracoes/processo"));
const menuTipoExcluirCliente_1 = __importDefault(require("../menus/menuTipoExcluirCliente"));
const excluirClienteTitular_1 = __importDefault(require("./excluirClienteTitular"));
const excluirClienteDependente_1 = __importDefault(require("./excluirClienteDependente"));
const armazem_1 = __importDefault(require("../dominio/armazem"));
class TipoExcluirCliente extends processo_1.default {
    constructor() {
        super();
        this.menu = new menuTipoExcluirCliente_1.default();
    }
    processar() {
        this.menu.mostrar();
        this.opcao = this.entrada.receberNumero('Qual opção desejada?');
        switch (this.opcao) {
            case 1:
                this.processo = new excluirClienteTitular_1.default();
                this.processo.processar();
                break;
            case 2:
                let nomeDependente = this.entrada.receberTexto("Digite o nome do dependente a ser excluído: ");
                let dependente = armazem_1.default.InstanciaUnica.Clientes.flatMap(cliente => cliente.Dependentes).find(dependente => dependente.Nome === nomeDependente);
                if (dependente) {
                    this.processo = new excluirClienteDependente_1.default(dependente);
                    this.processo.processar();
                }
                else {
                    console.log("Dependente não encontrado.");
                }
                break;
            default:
                console.log('Opção não entendida :(');
        }
    }
}
exports.default = TipoExcluirCliente;
