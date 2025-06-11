"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const processo_1 = __importDefault(require("../abstracoes/processo"));
const menuTipoListagemClientes_1 = __importDefault(require("../menus/menuTipoListagemClientes"));
const listagemTitulares_1 = __importDefault(require("./listagemTitulares"));
const selecionarCliente_1 = __importDefault(require("./selecionarCliente"));
const listagemDependente_1 = __importDefault(require("./listagemDependente"));
const selecionarDependente_1 = __importDefault(require("./selecionarDependente"));
const edicaoDependente_1 = __importDefault(require("./edicaoDependente"));
const exclusaoDependente_1 = __importDefault(require("./exclusaoDependente"));
class TipoListagemClientes extends processo_1.default {
    constructor() {
        super();
        this.menu = new menuTipoListagemClientes_1.default();
    }
    processar() {
        this.menu.mostrar();
        this.opcao = this.entrada.receberNumero('Qual a opção desejada?');
        switch (this.opcao) {
            case 1:
                this.processo = new listagemTitulares_1.default();
                this.processo.processar();
                break;
            case 2:
                const titular = new selecionarCliente_1.default().processar();
                if (titular) {
                    this.processo = new listagemDependente_1.default(titular);
                    this.processo.processar();
                }
                break;
            case 3:
                const resultadoEdicao = new selecionarDependente_1.default().processar();
                if (resultadoEdicao) {
                    const [titular, dependente] = resultadoEdicao;
                    this.processo = new edicaoDependente_1.default(titular, dependente);
                    this.processo.processar();
                }
                break;
            case 4:
                const resultadoExclusao = new selecionarDependente_1.default().processar();
                if (resultadoExclusao) {
                    const [titular, dependente] = resultadoExclusao;
                    this.processo = new exclusaoDependente_1.default(titular, dependente);
                    this.processo.processar();
                }
                break;
            case 0:
                break;
            default:
                console.log('Opção não entendida... :(');
        }
    }
}
exports.default = TipoListagemClientes;
