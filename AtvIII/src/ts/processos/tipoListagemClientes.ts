import Processo from "../abstracoes/processo";
import MenuTipoListagemClientes from "../menus/menuTipoListagemClientes";
import ListagemTitulares from "./listagemTitulares";
import SelecionarCliente from "./selecionarCliente";
import ListagemDependentes from "./listagemDependente";
import SelecionarDependente from "./selecionarDependente";
import EdicaoDependente from "./edicaoDependente";
import ExclusaoDependente from "./exclusaoDependente";

export default class TipoListagemClientes extends Processo {
    constructor() {
        super()
        this.menu = new MenuTipoListagemClientes()
    }

    processar(): void {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Qual a opção desejada?')

        switch (this.opcao) {
            case 1:
                this.processo = new ListagemTitulares()
                this.processo.processar()
                break
            case 2:
                const titular = new SelecionarCliente().processar()
                if (titular) {
                    this.processo = new ListagemDependentes(titular)
                    this.processo.processar()
                }
                break
            case 3:
                const resultadoEdicao = new SelecionarDependente().processar()
                if (resultadoEdicao) {
                    const [titular, dependente] = resultadoEdicao
                    this.processo = new EdicaoDependente(titular, dependente)
                    this.processo.processar()
                }
                break
            case 4:
                const resultadoExclusao = new SelecionarDependente().processar()
                if (resultadoExclusao) {
                    const [titular, dependente] = resultadoExclusao
                    this.processo = new ExclusaoDependente(titular, dependente)
                    this.processo.processar()
                }
                break
            case 0:
                break
            default:
                console.log('Opção não entendida... :(')
        }
    }
}