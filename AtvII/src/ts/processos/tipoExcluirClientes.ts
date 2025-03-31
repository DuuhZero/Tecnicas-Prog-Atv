import Processo from "../abstracoes/processo";
import MenuTipoExcluirCliente from "../menus/menuTipoExcluirCliente";
import ExcluirClienteTitular from "./excluirClienteTitular";
import ExcluirClienteDependente from "./excluirClienteDependente";
import Armazem from "../dominio/armazem";

export default class TipoExcluirCliente extends Processo {
    constructor() {
        super();
        this.menu = new MenuTipoExcluirCliente();
    }

    processar(): void {
        this.menu.mostrar();
        this.opcao = this.entrada.receberNumero('Qual opção desejada?');

        switch (this.opcao) {
            case 1:
                this.processo = new ExcluirClienteTitular();
                this.processo.processar();
                break;
            case 2:
                let nomeDependente = this.entrada.receberTexto("Digite o nome do dependente a ser excluído: ");
                let dependente = Armazem.InstanciaUnica.Clientes.flatMap(cliente => cliente.Dependentes).find(dependente => dependente.Nome === nomeDependente);

                if (dependente) {
                    this.processo = new ExcluirClienteDependente(dependente);
                    this.processo.processar();
                } else {
                    console.log("Dependente não encontrado.");
                }
                break;
            default:
                console.log('Opção não entendida :(');
        }
    }
}