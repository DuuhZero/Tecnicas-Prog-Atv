import Processo from "../abstracoes/processo";
import Cliente from "../modelos/cliente";
import CadastrarDocumentosCliente from "./cadastrarDocumentosCliente";

export default class EditarClienteDependente extends Processo {
    private dependente: Cliente;

    constructor(dependente: Cliente) {
        super();
        this.dependente = dependente;
    }

    processar(): void {
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
                    this.processo = new CadastrarDocumentosCliente(this.dependente);
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
