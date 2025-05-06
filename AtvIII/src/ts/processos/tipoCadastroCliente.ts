import Processo from "../abstracoes/processo";
import MenuTipoCadastroCliente from "../menus/menuTipoCadastroCliente";
import CadastroClienteTitular from "./cadastroClienteTitular";
import SelecionarCliente from "./selecionarCliente";
import CadastroDependente from "./cadastroDependente";

export default class TipoCadastroCliente extends Processo {
    constructor() {
        super()
        this.menu = new MenuTipoCadastroCliente()
    }
    
    processar(): void {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Qual opção desejada?')
        
        switch (this.opcao) {
            case 1:
                this.processo = new CadastroClienteTitular()
                this.processo.processar()
                break
            case 2:
                const titular = new SelecionarCliente().processar()
                if (titular) {
                    this.processo = new CadastroDependente(titular)
                    this.processo.processar()
                }
                break
            default:
                console.log('Opção não entendida :(')
        }
    }
}