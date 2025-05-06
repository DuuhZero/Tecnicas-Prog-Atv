import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import ImpressaorCliente from "../impressores/impressorCliente";
import Impressor from "../interfaces/impressor";
import Hospedagem from "../modelos/hospedagem";

export default class ListagemHospedesHistorico extends Processo {
    private impressor!: Impressor
    
    processar(): void {
        console.log('\nListando histórico completo de hóspedes...')
        const hospedagens = Armazem.InstanciaUnica.HospedagensHistorico
        
        if (hospedagens.length === 0) {
            console.log('Não há registros no histórico de hospedagens!')
            return
        }
        
        console.log(`Total de registros históricos: ${hospedagens.length}\n`)
        
        hospedagens.forEach((hospedagem, index) => {
            console.log(`Registro ${index + 1}:`)
            this.impressor = new ImpressaorCliente(hospedagem.Cliente)
            console.log(this.impressor.imprimir())
            console.log(`Acomodação: ${hospedagem.Acomodacao.NomeAcomadacao}`)
            console.log(`Data Check-in: ${hospedagem.DataCheckIn.toLocaleDateString()}`)
            
            if (hospedagem.DataCheckOut) {
                console.log(`Data Check-out: ${hospedagem.DataCheckOut.toLocaleDateString()}`)
                
                const diffTime = Math.abs(hospedagem.DataCheckOut.getTime() - hospedagem.DataCheckIn.getTime())
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
                console.log(`Duração da estadia: ${diffDays} dia(s)`)
            }
            
            console.log('--------------------------------------')
        })
    }
}