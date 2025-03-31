import Processo from "../abstracoes/processo";
import Cliente from "../modelos/cliente";

export default class ExcluirClienteDependente extends Processo {
    private dependente: Cliente;
    private senhaConfirmacao = "apagar";

    constructor(dependente: Cliente) {
        super();
        this.dependente = dependente;
    }

    processar(): void {
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