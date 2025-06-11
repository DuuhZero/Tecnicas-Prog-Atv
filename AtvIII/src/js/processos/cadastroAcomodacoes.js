"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const processo_1 = __importDefault(require("../abstracoes/processo"));
const diretorSolteiroSimples_1 = __importDefault(require("../diretores/diretorSolteiroSimples"));
const armazem_1 = __importDefault(require("../dominio/armazem"));
class CadastroAcomodacoes extends processo_1.default {
    constructor() {
        super();
        this.acomodacoes = armazem_1.default.InstanciaUnica.Acomodacoes;
    }
    processar() {
        let diretor = new diretorSolteiroSimples_1.default();
        this.acomodacoes.push(diretor.construir());
    }
}
exports.default = CadastroAcomodacoes;
