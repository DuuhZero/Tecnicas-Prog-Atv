import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";
import SelecionarCliente from "./selecionarCliente";

export default class SelecionarDependente extends Processo {
    processar(): [Cliente, Cliente] | undefined {
        console.log('\nSelecionando dependente...')
        

        const titular = new SelecionarCliente().processar()
        if (!titular) return undefined

        if (titular.Dependentes.length === 0) {
            console.log('Este titular não possui dependentes cadastrados!')
            return undefined
        }

        console.log(`\nDependentes de ${titular.Nome}:`)
        titular.Dependentes.forEach((dependente, index) => {
            console.log(`${index + 1} - ${dependente.Nome}`)
        })

        const numero = this.entrada.receberNumero('\nDigite o número do dependente:')
        const dependente = titular.Dependentes[numero - 1]

        if (!dependente) {
            console.log('Dependente não encontrado!')
            return undefined
        }

        return [titular, dependente]
    }
}