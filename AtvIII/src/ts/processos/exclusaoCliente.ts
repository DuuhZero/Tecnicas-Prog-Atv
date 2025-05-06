import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";

export default class ExclusaoCliente extends Processo {
    private clientes: Cliente[]

    constructor() {
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes
    }

    processar(): void {
        console.log('Iniciando exclusão de cliente...')
        let nome = this.entrada.receberTexto('Qual o nome do cliente a ser excluído?')
        
        const clienteIndex = this.clientes.findIndex(c => 
            c.Nome.toLowerCase() === nome.toLowerCase()
        )

        if (clienteIndex === -1) {
            console.log('Cliente não encontrado!')
            return
        }

        const confirmacao = this.entrada.receberTexto(`Tem certeza que deseja excluir ${this.clientes[clienteIndex].Nome}? (s/n)`)
        
        if (confirmacao.toLowerCase() === 's') {
            this.clientes.splice(clienteIndex, 1)
            console.log('Cliente excluído com sucesso!')
        } else {
            console.log('Operação cancelada.')
        }
    }
}