import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import ImpressaorCliente from "../impressores/impressorCliente";
import Impressor from "../interfaces/impressor";
import Cliente from "../modelos/cliente";

export default class ListagemDependentes extends Processo {
    private cliente: Cliente
    private impressor!: Impressor

    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
    }

    processar(): void {
        console.clear()
        console.log(`Listando dependentes de ${this.cliente.Nome}...`)
        this.cliente.Dependentes.forEach(dependente => {
            this.impressor = new ImpressaorCliente(dependente)
            console.log(this.impressor.imprimir())
            console.log('--------------------------------------')
        })
    }
}