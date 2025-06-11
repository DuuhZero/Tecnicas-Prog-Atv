"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const processo_1 = __importDefault(require("../abstracoes/processo"));
const armazem_1 = __importDefault(require("../dominio/armazem"));
const impressorCliente_1 = __importDefault(require("../impressores/impressorCliente"));
class ListagemTitularDependente extends processo_1.default {
    constructor() {
        super();
        this.clientes = armazem_1.default.InstanciaUnica.Clientes;
    }
    processar() {
        console.clear();
        console.log('Iniciando a listagem dos dados do titular de um dependente específico...');
        let nomeDependente = this.entrada.receberTexto('Digite o nome do dependente: ');
        let dependente = this.clientes.flatMap(cliente => cliente.Dependentes).find(dependente => dependente.Nome === nomeDependente);
        if (dependente && dependente.Titular) {
            this.impressor = new impressorCliente_1.default(dependente.Titular);
            console.log(this.impressor.imprimir());
        }
        else {
            console.log('Dependente não encontrado ou titular não definido.');
        }
    }
}
exports.default = ListagemTitularDependente;
