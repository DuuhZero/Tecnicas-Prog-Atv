import Processo from "../abstracoes/processo"
import MenuPrincipal from "../menus/menuPricipal"
import CadastroAcomodacoes from "./cadastroAcomodacoes"
import ListagemAcomodacoes from "./listagemAcomodacoes"
import TipoCadastroCliente from "./tipoCadastroCliente"
import TipoListagemClientes from "./tipoListagemClientes"
import ExclusaoCliente from "./exclusaoCliente"
import EdicaoCliente from "./edicaoCliente"
import SelecionarCliente from "./selecionarCliente"
import MenuHospedagem from "../menus/menuHospedagem"
import CheckIn from "./checkIn"
import CheckOut from "./checkOut"
import ListagemHospedesAtuais from "./listagemHospedesAtual"
import ListagemHospedesHistorico from "./listagemHospedesHistórico"

export default class Principal extends Processo {
    constructor() {
        super()
        this.execucao = true
        this.menu = new MenuPrincipal()
    }
    
    processar(): void {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Qual opção desejada?')
        
        switch (this.opcao) {
            case 1:
                this.processo = new TipoCadastroCliente()
                this.processo.processar()
                break
            case 2:
                const clienteEdicao = new SelecionarCliente().processar()
                if (clienteEdicao) {
                    this.processo = new EdicaoCliente(clienteEdicao)
                    this.processo.processar()
                }
                break
            case 3:
                this.processo = new TipoListagemClientes()
                this.processo.processar()
                break
            case 4:
                this.processo = new ExclusaoCliente()
                this.processo.processar()
                break
            case 5:
                this.processo = new ListagemAcomodacoes()
                this.processo.processar()
                break
            case 6:
                this.processo = new MenuHospedagemProcesso()
                this.processo.processar()
                break
            case 0:
                this.execucao = false
                console.log('Até logo!')
                console.clear()
                break
            default:
                console.log('Opção não entendida :(')
        }
    }
}

class MenuHospedagemProcesso extends Processo {
    constructor() {
        super()
        this.menu = new MenuHospedagem()
        this.execucao = true
    }
    
    processar(): void {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Qual opção desejada?')
        
        switch (this.opcao) {
            case 1:
                this.processo = new CheckIn()
                this.processo.processar()
                break
            case 2:
                this.processo = new CheckOut()
                this.processo.processar()
                break
            case 3:
                this.processo = new ListagemHospedesAtuais()
                this.processo.processar()
                break
            case 4:
                this.processo = new ListagemHospedesHistorico()
                this.processo.processar()
                break
            case 0:
                this.execucao = false
                break
            default:
                console.log('Opção não entendida :(')
        }
    }
}