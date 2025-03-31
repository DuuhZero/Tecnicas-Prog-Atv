import Processo from "../abstracoes/processo";
import Cliente from "../modelos/cliente";
import Endereco from "../modelos/endereco";

export default class CadastroEnderecoDependente extends Processo {
    private cliente: Cliente;
    private enderecoTitular: Endereco;

    constructor(cliente: Cliente, enderecoTitular: Endereco) {
        super();
        this.cliente = cliente;
        this.enderecoTitular = enderecoTitular;
    }

    processar(): void {
        this.cliente.Endereco = this.enderecoTitular.clonar() as Endereco;
        console.log("Endereço do dependente cadastrado com sucesso.");
    }
}