import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";

export default class ExcluirClienteTitular extends Processo {
    private clientes: Cliente[];
    private senhaConfirmacao = "apagar";

    constructor() {
        super();
        this.clientes = Armazem.InstanciaUnica.Clientes;
    }

    processar(): void {
        console.log("Iniciando a exclusão de cliente titular...");
        this.listarClientes();
        let nomeCliente = this.entrada.receberTexto("Digite o nome do cliente titular a ser excluído: ");
        let cliente = this.clientes.find(cliente => cliente.Nome === nomeCliente);

        if (!cliente) {
            console.log("Cliente titular não encontrado.");
            return;
        }

        let senha = this.entrada.receberTexto("Digite a senha de confirmação: ");
        if (senha !== this.senhaConfirmacao) {
            console.log("Senha incorreta. Exclusão cancelada.");
            return;
        }

        Armazem.InstanciaUnica.removerCliente(cliente);

        console.log("Cliente titular excluído com sucesso.");
    }

    private listarClientes(): void {
        console.log("Lista de clientes titulares:");
        this.clientes.forEach(cliente => {
            if (!cliente.Titular) { 
                console.log(`- ${cliente.Nome}`);
            }
        });
    }
}