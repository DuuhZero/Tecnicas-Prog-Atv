import Processo from "../abstracoes/processo";
import MenuTipoEdicaoCliente from "../menus/menuTipoEdicaoCliente";
import Cliente from "../modelos/cliente";
import CadastroEnderecoTitular from "./cadastroEnderecoTitular";
import CadastroRg from "./cadastroRg";
import CadastroTelefone from "./cadastroTelefone";

export default class EdicaoCliente extends Processo {
    private cliente: Cliente

    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
        this.menu = new MenuTipoEdicaoCliente()
        this.execucao = true
    }

    processar(): void {
        console.log('Iniciando edição do cliente...')
        while (this.execucao) {
            this.menu.mostrar()
            this.opcao = this.entrada.receberNumero('Qual opção desejada?')
            switch (this.opcao) {
                case 1:
                    this.cliente.Nome = this.entrada.receberTexto('Qual o novo nome?')
                    break
                case 2:
                    this.cliente.NomeSocial = this.entrada.receberTexto('Qual o novo nome social?')
                    break
                case 3:
                    this.cliente.DataNascimento = this.entrada.receberData('Qual a nova data de nascimento?')
                    break
                case 4:
                    this.processo = new CadastroEnderecoTitular(this.cliente)
                    this.processo.processar()
                    break
                case 5:
                    this.processo = new CadastroRg(this.cliente)
                    this.processo.processar()
                    break
                case 6:
                    this.processo = new CadastroTelefone(this.cliente)
                    this.processo.processar()
                    break
                case 0:
                    this.execucao = false
                    break
                default:
                    console.log('Opção não entendida :(')
            }
        }
        console.log('Finalizando edição do cliente...')
    }
}