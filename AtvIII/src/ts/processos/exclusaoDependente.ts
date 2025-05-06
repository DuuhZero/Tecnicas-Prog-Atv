import Processo from "../abstracoes/processo";
import Cliente from "../modelos/cliente";

export default class ExclusaoDependente extends Processo {
    private titular: Cliente
    private dependente: Cliente

    constructor(titular: Cliente, dependente: Cliente) {
        super()
        this.titular = titular
        this.dependente = dependente
    }

    processar(): void {
        console.log(`\nIniciando exclusão do dependente ${this.dependente.Nome}...`)
        
        const confirmacao = this.entrada.receberTexto(`Tem certeza que deseja excluir ${this.dependente.Nome}? (s/n)`)
        
        if (confirmacao.toLowerCase() === 's') {
            const index = this.titular.Dependentes.indexOf(this.dependente)
            if (index > -1) {
                this.titular.Dependentes.splice(index, 1)
                console.log('Dependente excluído com sucesso!')
            }
        } else {
            console.log('Operação cancelada.')
        }
    }
}