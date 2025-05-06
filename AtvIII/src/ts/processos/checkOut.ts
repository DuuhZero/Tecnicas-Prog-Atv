import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Hospedagem from "../modelos/hospedagem";

export default class CheckOut extends Processo {
    processar(): void {
        console.log('Iniciando check-out...')
        
        const hospedagensAtivas = Armazem.InstanciaUnica.HospedagensAtivas
        if (hospedagensAtivas.length === 0) {
            console.log('Não há hóspedes ativos para check-out!')
            return
        }
        
        console.log('Hóspedes ativos:')
        hospedagensAtivas.forEach((hospedagem, index) => {
            console.log(`${index + 1} - ${hospedagem.Cliente.Nome} (${hospedagem.Acomodacao.NomeAcomadacao})`)
        })
        
        const numero = this.entrada.receberNumero('Digite o número do hóspede para check-out:')
        const hospedagem = hospedagensAtivas[numero - 1]
        
        if (!hospedagem) {
            console.log('Hóspede não encontrado!')
            return
        }
        
        const dataCheckOut = new Date()
        Armazem.InstanciaUnica.finalizarHospedagem(hospedagem, dataCheckOut)
        
        console.log(`Check-out realizado com sucesso para ${hospedagem.Cliente.Nome}!`)
    }
}