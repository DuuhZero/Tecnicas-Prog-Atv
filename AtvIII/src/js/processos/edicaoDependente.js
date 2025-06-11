"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const processo_1 = __importDefault(require("../abstracoes/processo"));
const menuTipoEdicaoCliente_1 = __importDefault(require("../menus/menuTipoEdicaoCliente"));
const cadastroEnderecoTitular_1 = __importDefault(require("./cadastroEnderecoTitular"));
const cadastroRg_1 = __importDefault(require("./cadastroRg"));
const cadastroTelefone_1 = __importDefault(require("./cadastroTelefone"));
class EdicaoDependente extends processo_1.default {
    constructor(titular, dependente) {
        super();
        this.titular = titular;
        this.dependente = dependente;
        this.menu = new menuTipoEdicaoCliente_1.default();
        this.execucao = true;
    }
    processar() {
        console.log(`\nIniciando edição do dependente ${this.dependente.Nome}...`);
        while (this.execucao) {
            this.menu.mostrar();
            this.opcao = this.entrada.receberNumero('Qual opção desejada?');
            switch (this.opcao) {
                case 1:
                    this.dependente.Nome = this.entrada.receberTexto('Qual o novo nome?');
                    break;
                case 2:
                    this.dependente.NomeSocial = this.entrada.receberTexto('Qual o novo nome social?');
                    break;
                case 3:
                    this.dependente.DataNascimento = this.entrada.receberData('Qual a nova data de nascimento?');
                    break;
                case 4:
                    this.processo = new cadastroEnderecoTitular_1.default(this.dependente);
                    this.processo.processar();
                    break;
                case 5:
                    this.processo = new cadastroRg_1.default(this.dependente);
                    this.processo.processar();
                    break;
                case 6:
                    this.processo = new cadastroTelefone_1.default(this.dependente);
                    this.processo.processar();
                    break;
                case 0:
                    this.execucao = false;
                    break;
                default:
                    console.log('Opção não entendida :(');
            }
        }
        console.log(`Edição do dependente ${this.dependente.Nome} concluída!`);
    }
}
exports.default = EdicaoDependente;
