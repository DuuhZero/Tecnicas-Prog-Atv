import Acomodacao from "../modelos/acomodacao";
import Cliente from "../modelos/cliente";
import Hospedagem from "../modelos/hospedagem";

export default class Armazem {
    private static instanciaUnica: Armazem = new Armazem()
    private clientes: Cliente[] = []
    private acomodacoes: Acomodacao[] = []
    private hospedagensAtivas: Hospedagem[] = []
    private hospedagensHistorico: Hospedagem[] = []
    private constructor() { }
    public static get InstanciaUnica() {
        return this.instanciaUnica
    }
    public get Clientes() {
        return this.clientes
    }
    public get Acomodacoes(){
        return this.acomodacoes
    }
    public get HospedagensAtivas(): Hospedagem[] {
        return this.hospedagensAtivas.filter(h => h.EstaAtiva)
    }

    public get HospedagensHistorico(): Hospedagem[] {
        return this.hospedagensHistorico.filter(h => !h.EstaAtiva)
    }
    public adicionarHospedagem(hospedagem: Hospedagem) {
        this.hospedagensAtivas.push(hospedagem)
    }

    public finalizarHospedagem(hospedagem: Hospedagem, dataCheckOut: Date) {
        hospedagem.realizarCheckOut(dataCheckOut)
        const index = this.hospedagensAtivas.indexOf(hospedagem)
        if (index > -1) {
            this.hospedagensAtivas.splice(index, 1)
            this.hospedagensHistorico.push(hospedagem)
        }
    }

    

}