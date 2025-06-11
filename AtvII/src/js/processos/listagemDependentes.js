"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const processo_1 = __importDefault(require("../abstracoes/processo"));
const armazem_1 = __importDefault(require("../dominio/armazem"));
const impressorCliente_1 = __importDefault(require("../impressores/impressorCliente"));
class ListagemDependentes extends processo_1.default {
    constructor() {
        super();
        this.clientes = armazem_1.default.InstanciaUnica.Clientes;
    }
    processar() {
        console.clear();
        console.log('Iniciando a listagem dos clientes dependentes de um titular específico...');
        let nomeTitular = this.entrada.receberTexto('Digite o nome do titular: ');
        let titular = this.clientes.find(cliente => cliente.Nome === nomeTitular && cliente.Titular == undefined);
        if (titular) {
            titular.Dependentes.forEach(dependente => {
                this.impressor = new impressorCliente_1.default(dependente);
                console.log(this.impressor.imprimir());
            });
        }
        else {
            console.log('Titular não encontrado.');
        }
    }
}
exports.default = ListagemDependentes;
