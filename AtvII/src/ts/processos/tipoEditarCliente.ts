import Processo from "../abstracoes/processo";
import MenuTipoEditarCliente from "../menus/menuTipoEditarCliente";
import EditarClienteTitular from "./editarClienteTitular";
import EditarClienteDependente from "./editarClienteDependente";
import Armazem from "../dominio/armazem";

export default class TipoEditarCliente extends Processo {
    constructor() {
        super();
        this.menu = new MenuTipoEditarCliente();
    }

    processar(): void {
        this.menu.mostrar();
        this.opcao = this.entrada.receberNumero('Qual opção desejada?');

        switch (this.opcao) {
            case 1:
                this.processo = new EditarClienteTitular();
                this.processo.processar();
                break;
            case 2:
                let nomeDependente = this.entrada.receberTexto("Digite o nome do dependente a ser editado: ");
                let dependente = Armazem.InstanciaUnica.Clientes.flatMap(cliente => cliente.Dependentes).find(dependente => dependente.Nome === nomeDependente);

                if (dependente) {
                    this.processo = new EditarClienteDependente(dependente);
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