import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";

export default class SelecionarCliente extends Processo {
    private clientes: Cliente[]
    
    constructor() {
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes
    }

    processar(): Cliente | undefined {
        console.log('Listando clientes...')
        this.clientes.forEach((cliente, index) => {
            console.log(`${index + 1} - ${cliente.Nome}`)
        })

        let numero = this.entrada.receberNumero('Digite o número do cliente desejado:')
        let clienteSelecionado = this.clientes[numero - 1]

        if (!clienteSelecionado) {
            console.log('Cliente não encontrado!')
            return undefined
        }

        return clienteSelecionado
    }
}