import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";
import CadastroEnderecoTitular from "./cadastroEnderecoTitular";
import CadastrarDocumentosCliente from "./cadastroDocumentosCliente";

export default class CadastroDependente extends Processo {
    private titular: Cliente
    private dependentes: Cliente[]

    constructor(titular: Cliente) {
        super()
        this.titular = titular
        this.dependentes = titular.Dependentes
    }

    processar(): void {
        console.log('Iniciando o cadastro de um novo dependente...')
        let nome = this.entrada.receberTexto('Qual o nome do novo dependente?')
        let nomeSocial = this.entrada.receberTexto('Qual o nome social do novo dependente?')
        let dataNascimento = this.entrada.receberData('Qual a data de nascimento?')
        let dependente = new Cliente(nome, nomeSocial, dataNascimento)
        dependente.Titular = this.titular

        this.processo = new CadastroEnderecoTitular(dependente)
        this.processo.processar()

        this.processo = new CadastrarDocumentosCliente(dependente)
        this.processo.processar()

        this.dependentes.push(dependente)
        console.log('Finalizando o cadastro do dependente...')
    }
}