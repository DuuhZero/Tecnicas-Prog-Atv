"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const processo_1 = __importDefault(require("../abstracoes/processo"));
class ExclusaoDependente extends processo_1.default {
    constructor(titular, dependente) {
        super();
        this.titular = titular;
        this.dependente = dependente;
    }
    processar() {
        console.log(`\nIniciando exclusão do dependente ${this.dependente.Nome}...`);
        const confirmacao = this.entrada.receberTexto(`Tem certeza que deseja excluir ${this.dependente.Nome}? (s/n)`);
        if (confirmacao.toLowerCase() === 's') {
            const index = this.titular.Dependentes.indexOf(this.dependente);
            if (index > -1) {
                this.titular.Dependentes.splice(index, 1);
                console.log('Dependente excluído com sucesso!');
            }
        }
        else {
            console.log('Operação cancelada.');
        }
    }
}
exports.default = ExclusaoDependente;
