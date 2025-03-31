import Impressor from "../interfaces/impressor";
import Cliente from "../modelos/cliente";
import ImpressorDocumentos from "./impressorDocumentos";
import ImpressorEndereco from "./impressorEndereco";

export default class ImpressaorCliente implements Impressor {
    private cliente: Cliente;
    private impressor!: Impressor;

    constructor(cliente: Cliente) {
        this.cliente = cliente;
    }

    imprimir(): string {
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
            (clienteParaImpressao.Endereco ? new ImpressorEndereco(clienteParaImpressao.Endereco).imprimir() : '') +
            `\n****************************\n` +
            `| Telefones: ${telefonesParaImpressao ? telefonesParaImpressao.map(telefone => `${telefone.Ddd} ${telefone.Numero}\n`).join('') : ''}`;


        if (clienteParaImpressao.Dependentes && clienteParaImpressao.Dependentes.length > 0 && !clienteParaImpressao.Titular) {
            impressao += `\n****************************\n` +
                `| Dependentes: ${clienteParaImpressao.Dependentes.map(dependente => `${dependente.Nome}\n`).join('')}`;
        }

        impressao += `\n****************************\n`;

        this.impressor = new ImpressorDocumentos(clienteParaImpressao.Documentos);
        impressao += `${this.impressor.imprimir()}`;

        impressao += `\n****************************`;
        return impressao;
    }
}
