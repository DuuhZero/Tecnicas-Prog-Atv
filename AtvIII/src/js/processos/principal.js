"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const processo_1 = __importDefault(require("../abstracoes/processo"));
const menuPricipal_1 = __importDefault(require("../menus/menuPricipal"));
const listagemAcomodacoes_1 = __importDefault(require("./listagemAcomodacoes"));
const tipoCadastroCliente_1 = __importDefault(require("./tipoCadastroCliente"));
const tipoListagemClientes_1 = __importDefault(require("./tipoListagemClientes"));
const exclusaoCliente_1 = __importDefault(require("./exclusaoCliente"));
const edicaoCliente_1 = __importDefault(require("./edicaoCliente"));
const selecionarCliente_1 = __importDefault(require("./selecionarCliente"));
const menuHospedagem_1 = __importDefault(require("../menus/menuHospedagem"));
const checkIn_1 = __importDefault(require("./checkIn"));
const checkOut_1 = __importDefault(require("./checkOut"));
const listagemHospedesAtual_1 = __importDefault(require("./listagemHospedesAtual"));
const listagemHospedesHist_rico_1 = __importDefault(require("./listagemHospedesHist\u00F3rico"));
class Principal extends processo_1.default {
    constructor() {
        super();
        this.execucao = true;
        this.menu = new menuPricipal_1.default();
    }
    processar() {
        this.menu.mostrar();
        this.opcao = this.entrada.receberNumero('Qual opção desejada?');
        switch (this.opcao) {
            case 1:
                this.processo = new tipoCadastroCliente_1.default();
                this.processo.processar();
                break;
            case 2:
                const clienteEdicao = new selecionarCliente_1.default().processar();
                if (clienteEdicao) {
                    this.processo = new edicaoCliente_1.default(clienteEdicao);
                    this.processo.processar();
                }
                break;
            case 3:
                this.processo = new tipoListagemClientes_1.default();
                this.processo.processar();
                break;
            case 4:
                this.processo = new exclusaoCliente_1.default();
                this.processo.processar();
                break;
            case 5:
                this.processo = new listagemAcomodacoes_1.default();
                this.processo.processar();
                break;
            case 6:
                this.processo = new MenuHospedagemProcesso();
                this.processo.processar();
                break;
            case 0:
                this.execucao = false;
                console.log('Até logo!');
                console.clear();
                break;
            default:
                console.log('Opção não entendida :(');
        }
    }
}
exports.default = Principal;
class MenuHospedagemProcesso extends processo_1.default {
    constructor() {
        super();
        this.menu = new menuHospedagem_1.default();
        this.execucao = true;
    }
    processar() {
        this.menu.mostrar();
        this.opcao = this.entrada.receberNumero('Qual opção desejada?');
        switch (this.opcao) {
            case 1:
                this.processo = new checkIn_1.default();
                this.processo.processar();
                break;
            case 2:
                this.processo = new checkOut_1.default();
                this.processo.processar();
                break;
            case 3:
                this.processo = new listagemHospedesAtual_1.default();
                this.processo.processar();
                break;
            case 4:
                this.processo = new listagemHospedesHist_rico_1.default();
                this.processo.processar();
                break;
            case 0:
                this.execucao = false;
                break;
            default:
                console.log('Opção não entendida :(');
        }
    }
}
