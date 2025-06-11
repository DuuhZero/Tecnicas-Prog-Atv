"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const processo_1 = __importDefault(require("../abstracoes/processo"));
const cadastrarDocumentosCliente_1 = __importDefault(require("./cadastrarDocumentosCliente"));
class EditarClienteDependente extends processo_1.default {
    constructor(dependente) {
        super();
        this.dependente = dependente;
    }
    processar() {
        let execucao = true;
        while (execucao) {
            console.log("Qual informação deseja editar?");
            console.log("1 - Nome");
            console.log("2 - Nome Social");
            console.log("3 - Data de Nascimento");
            console.log("4 - Documentos");
            console.log("0 - Finalizar edição");
            this.opcao = this.entrada.receberNumero("Opção: ");
            switch (this.opcao) {
                case 1:
                    this.dependente.Nome = this.entrada.receberTexto("Novo nome: ");
                    break;
                case 2:
                    this.dependente.NomeSocial = this.entrada.receberTexto("Novo nome social: ");
                    break;
                case 3:
                    this.dependente.DataNascimento = this.entrada.receberData("Nova data de nascimento: ");
                    break;
                case 4:
                    this.processo = new cadastrarDocumentosCliente_1.default(this.dependente);
                    this.processo.processar();
                    break;
                case 0:
                    execucao = false;
                    break;
                default:
                    console.log("Opção inválida.");
            }
        }
        console.log("Edição do cliente dependente finalizada.");
    }
}
exports.default = EditarClienteDependente;
