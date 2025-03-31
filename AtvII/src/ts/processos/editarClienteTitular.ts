import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";
import CadastrarDocumentosCliente from "./cadastrarDocumentosCliente";
import CadastroTelefone from "./cadastroTelefone";
import CadastroEnderecoTitular from "./cadastroEnderecoTitular";

export default class EditarClienteTitular extends Processo {
    private cliente: Cliente | undefined; // Permite undefined

    constructor() {
        super();
        this.cliente = this.buscarCliente();
    }

    processar(): void {
        if (!this.cliente) {
            console.log("Cliente não encontrado.");
            return;
        }

        let execucao = true;
        while (execucao) {
            console.log("Qual informação deseja editar?");
            console.log("1 - Nome");
            console.log("2 - Nome Social");
            console.log("3 - Data de Nascimento");
            console.log("4 - Documentos");
            console.log("5 - Telefones");
            console.log("6 - Endereço");
            console.log("0 - Finalizar edição");

            this.opcao = this.entrada.receberNumero("Opção: ");
            switch (this.opcao) {
                case 1:
                    this.cliente.Nome = this.entrada.receberTexto("Novo nome: ");
                    break;
                case 2:
                    this.cliente.NomeSocial = this.entrada.receberTexto("Novo nome social: ");
                    break;
                case 3:
                    this.cliente.DataNascimento = this.entrada.receberData("Nova data de nascimento: ");
                    break;
                case 4:
                    this.processo = new CadastrarDocumentosCliente(this.cliente);
                    this.processo.processar();
                    break;
                case 5:
                    this.processo = new CadastroTelefone(this.cliente);
                    this.processo.processar();
                    break;
                case 6:
                    this.processo = new CadastroEnderecoTitular(this.cliente);
                    this.processo.processar();
                    break;
                case 0:
                    execucao = false;
                    break;
                default:
                    console.log("Opção inválida.");
            }
        }
        console.log("Edição do cliente titular finalizada.");
    }

    private buscarCliente(): Cliente | undefined {
        let nomeCliente = this.entrada.receberTexto("Digite o nome do cliente titular a ser editado: ");
        return Armazem.InstanciaUnica.Clientes.find(cliente => cliente.Nome === nomeCliente && !cliente.Titular);
    }
}