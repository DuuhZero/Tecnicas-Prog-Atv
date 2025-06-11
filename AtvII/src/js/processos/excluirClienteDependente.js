"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const processo_1 = __importDefault(require("../abstracoes/processo"));
class ExcluirClienteDependente extends processo_1.default {
    constructor(dependente) {
        super();
        this.senhaConfirmacao = "apagar";
        this.dependente = dependente;
    }
    processar() {
        console.log("Iniciando a exclusão de cliente dependente...");
        let senha = this.entrada.receberTexto("Digite a senha de confirmação: ");
        if (senha !== this.senhaConfirmacao) {
            console.log("Senha incorreta. Exclusão cancelada.");
            return;
        }
        this.dependente.Titular.removerDependente(this.dependente);
        console.log("Cliente dependente excluído com sucesso.");
    }
}
exports.default = ExcluirClienteDependente;
