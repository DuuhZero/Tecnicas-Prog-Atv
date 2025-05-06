import Processo from "../abstracoes/processo";
import MenuTipoEdicaoCliente from "../menus/menuTipoEdicaoCliente";
import Cliente from "../modelos/cliente";
import CadastroEnderecoTitular from "./cadastroEnderecoTitular";
import CadastroRg from "./cadastroRg";
import CadastroTelefone from "./cadastroTelefone";

export default class EdicaoDependente extends Processo {
    private titular: Cliente
    private dependente: Cliente

    constructor(titular: Cliente, dependente: Cliente) {
        super()
        this.titular = titular
        this.dependente = dependente
        this.menu = new MenuTipoEdicaoCliente()
        this.execucao = true
    }

    processar(): void {
        console.log(`\nIniciando edição do dependente ${this.dependente.Nome}...`)
        while (this.execucao) {
            this.menu.mostrar()
            this.opcao = this.entrada.receberNumero('Qual opção desejada?')
            switch (this.opcao) {
                case 1:
                    this.dependente.Nome = this.entrada.receberTexto('Qual o novo nome?')
                    break
                case 2:
                    this.dependente.NomeSocial = this.entrada.receberTexto('Qual o novo nome social?')
                    break
                case 3:
                    this.dependente.DataNascimento = this.entrada.receberData('Qual a nova data de nascimento?')
                    break
                case 4:
                    this.processo = new CadastroEnderecoTitular(this.dependente)
                    this.processo.processar()
                    break
                case 5:
                    this.processo = new CadastroRg(this.dependente)
                    this.processo.processar()
                    break
                case 6:
                    this.processo = new CadastroTelefone(this.dependente)
                    this.processo.processar()
                    break
                case 0:
                    this.execucao = false
                    break
                default:
                    console.log('Opção não entendida :(')
            }
        }
        console.log(`Edição do dependente ${this.dependente.Nome} concluída!`)
    }
}