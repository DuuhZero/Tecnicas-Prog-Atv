"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const impressorDocumentos_1 = __importDefault(require("./impressorDocumentos"));
const impressorEndereco_1 = __importDefault(require("./impressorEndereco"));
class ImpressaorCliente {
    constructor(cliente) {
        this.cliente = cliente;
    }
    imprimir() {
        let clienteParaImpressao = this.cliente;
        let telefonesParaImpressao = this.cliente.Telefones;
        if (this.cliente.Titular) {
            telefonesParaImpressao = this.cliente.Titular.Telefones;
        }
        let impressao = `****************************\n` +
            `| Nome: ${clienteParaImpressao.Nome}\n` +
            `| Nome social: ${clienteParaImpressao.NomeSocial}\n` +
            (clienteParaImpressao.DataNascimento ? `| Data de nascimento: ${clienteParaImpressao.DataNascimento.toLocaleDateString()}\n` : '') +
            `****************************\n` +
            `| Data de cadastro: ${clienteParaImpressao.DataCadastro.toLocaleDateString()}\n` +
            (clienteParaImpressao.Endereco ? new impressorEndereco_1.default(clienteParaImpressao.Endereco).imprimir() : '') +
            `\n****************************\n` +
            `| Telefones: ${telefonesParaImpressao ? telefonesParaImpressao.map(telefone => `${telefone.Ddd} ${telefone.Numero}\n`).join('') : ''}`;
        if (clienteParaImpressao.Dependentes && clienteParaImpressao.Dependentes.length > 0 && !clienteParaImpressao.Titular) {
            impressao += `\n****************************\n` +
                `| Dependentes: ${clienteParaImpressao.Dependentes.map(dependente => `${dependente.Nome}\n`).join('')}`;
        }
        impressao += `\n****************************\n`;
        this.impressor = new impressorDocumentos_1.default(clienteParaImpressao.Documentos);
        impressao += `${this.impressor.imprimir()}`;
        impressao += `\n****************************`;
        return impressao;
    }
}
exports.default = ImpressaorCliente;
