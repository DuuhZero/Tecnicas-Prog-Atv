"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const processo_1 = __importDefault(require("../abstracoes/processo"));
const impressorCliente_1 = __importDefault(require("../impressores/impressorCliente"));
class ListagemDependentes extends processo_1.default {
    constructor(cliente) {
        super();
        this.cliente = cliente;
    }
    processar() {
        console.clear();
        console.log(`Listando dependentes de ${this.cliente.Nome}...`);
        this.cliente.Dependentes.forEach(dependente => {
            this.impressor = new impressorCliente_1.default(dependente);
            console.log(this.impressor.imprimir());
            console.log('--------------------------------------');
        });
    }
}
exports.default = ListagemDependentes;
