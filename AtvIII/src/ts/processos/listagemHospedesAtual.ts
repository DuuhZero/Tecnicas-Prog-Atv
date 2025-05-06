import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import ImpressaorCliente from "../impressores/impressorCliente";
import Impressor from "../interfaces/impressor";
import Hospedagem from "../modelos/hospedagem";

export default class ListagemHospedesAtuais extends Processo {
    private impressor!: Impressor
    
    processar(): void {
        console.log('Listando hóspedes atuais...')
        const hospedagens = Armazem.InstanciaUnica.HospedagensAtivas
        
        if (hospedagens.length === 0) {
            console.log('Não há hóspedes ativos no momento!')
            return
        }
        
        hospedagens.forEach(hospedagem => {
            this.impressor = new ImpressaorCliente(hospedagem.Cliente)
            console.log(this.impressor.imprimir())
            console.log(`Acomodação: ${hospedagem.Acomodacao.NomeAcomadacao}`)
            console.log(`Data Check-in: ${hospedagem.DataCheckIn.toLocaleDateString()}`)
            console.log('--------------------------------------')
        })
    }
}