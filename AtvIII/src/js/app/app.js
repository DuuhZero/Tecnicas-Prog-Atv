"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diretorCasalSimples_1 = __importDefault(require("../diretores/diretorCasalSimples"));
const diretorFamiliaMais_1 = __importDefault(require("../diretores/diretorFamiliaMais"));
const diretorFamiliaSimples_1 = __importDefault(require("../diretores/diretorFamiliaSimples"));
const diretorFamiliaSuper_1 = __importDefault(require("../diretores/diretorFamiliaSuper"));
const diretorSolteiroMais_1 = __importDefault(require("../diretores/diretorSolteiroMais"));
const diretorSolteiroSimples_1 = __importDefault(require("../diretores/diretorSolteiroSimples"));
const armazem_1 = __importDefault(require("../dominio/armazem"));
const principal_1 = __importDefault(require("../processos/principal"));
console.clear();
console.log(`Bem-vindo(a) ao melhor sistema de gestão de clubes, hotéis e resorts do mundo, o Atlantis :)`);
const armazem = armazem_1.default.InstanciaUnica;
const diretores = [
    new diretorSolteiroSimples_1.default(),
    new diretorSolteiroMais_1.default(),
    new diretorCasalSimples_1.default(),
    new diretorFamiliaSimples_1.default(),
    new diretorFamiliaMais_1.default(),
    new diretorFamiliaSuper_1.default()
];
diretores.forEach(diretor => {
    armazem.Acomodacoes.push(diretor.construir());
});
let processo;
let execucao = true;
while (execucao) {
    processo = new principal_1.default();
    processo.processar();
    execucao = processo.Execucao;
}
