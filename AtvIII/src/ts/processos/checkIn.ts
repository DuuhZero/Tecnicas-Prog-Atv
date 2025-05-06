import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import ImpressorAcomodacao from "../impressores/impressorAcomodacao";
import Cliente from "../modelos/cliente";
import Hospedagem from "../modelos/hospedagem";
import ListagemAcomodacoes from "./listagemAcomodacoes";
import SelecionarCliente from "./selecionarCliente";

export default class CheckIn extends Processo {
    processar(): void {
        console.log('Iniciando check-in...')
        
        const cliente = new SelecionarCliente().processar()
        if (!cliente) return
        
        new ListagemAcomodacoes().processar()
        const acomodacoes = Armazem.InstanciaUnica.Acomodacoes
        if (acomodacoes.length === 0) {
            console.log('Nenhuma acomodação cadastrada!')
            return
        }

        acomodacoes.forEach((acomodacao, index) => {
            console.log(`\nOpção ${index + 1}:`)
            const impressor = new ImpressorAcomodacao(acomodacao)
            console.log(impressor.imprimir())
            console.log('--------------------------------------')
        })
        const numeroAcomodacao = this.entrada.receberNumero('Digite o número da acomodação desejada:')
        const acomodacao = acomodacoes[numeroAcomodacao - 1]
        
        if (!acomodacao) {
            console.log('Acomodação não encontrada!')
            return
        }
        
        const hospedagensAtivas = Armazem.InstanciaUnica.HospedagensAtivas
        const acomodacaoEmUso = hospedagensAtivas.some(
            h => h.Acomodacao === acomodacao
        )

        if (acomodacaoEmUso) {
            console.log('Esta acomodação já está ocupada! Por favor, escolha outra.')
            return
        }

        const dataCheckIn = new Date()
        const hospedagem = new Hospedagem(cliente, acomodacao, dataCheckIn)
        Armazem.InstanciaUnica.adicionarHospedagem(hospedagem)
        
        console.log(`Check-in realizado com sucesso para ${cliente.Nome} na acomodação ${acomodacao.NomeAcomadacao}!`)
    }
}