"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const processo_1 = __importDefault(require("../abstracoes/processo"));
const selecionarCliente_1 = __importDefault(require("./selecionarCliente"));
class SelecionarDependente extends processo_1.default {
    processar() {
        console.log('\nSelecionando dependente...');
        const titular = new selecionarCliente_1.default().processar();
        if (!titular)
            return undefined;
        if (titular.Dependentes.length === 0) {
            console.log('Este titular não possui dependentes cadastrados!');
            return undefined;
        }
        console.log(`\nDependentes de ${titular.Nome}:`);
        titular.Dependentes.forEach((dependente, index) => {
            console.log(`${index + 1} - ${dependente.Nome}`);
        });
        const numero = this.entrada.receberNumero('\nDigite o número do dependente:');
        const dependente = titular.Dependentes[numero - 1];
        if (!dependente) {
            console.log('Dependente não encontrado!');
            return undefined;
        }
        return [titular, dependente];
    }
}
exports.default = SelecionarDependente;
