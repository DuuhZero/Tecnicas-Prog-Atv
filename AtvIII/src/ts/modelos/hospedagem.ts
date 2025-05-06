import Cliente from "./cliente";
import Acomodacao from "./acomodacao";

export default class Hospedagem {
    private cliente: Cliente
    private acomodacao: Acomodacao
    private dataCheckIn: Date
    private dataCheckOut?: Date | null

    constructor(cliente: Cliente, acomodacao: Acomodacao, dataCheckIn: Date) {
        this.cliente = cliente
        this.acomodacao = acomodacao
        this.dataCheckIn = dataCheckIn
        this.dataCheckOut = null
    }

    public get Cliente() { return this.cliente }
    public get Acomodacao() { return this.acomodacao }
    public get DataCheckIn() { return this.dataCheckIn }
    public get DataCheckOut() { return this.dataCheckOut }

    public realizarCheckOut(dataCheckOut: Date) {
        this.dataCheckOut = dataCheckOut
    }
    public get EstaAtiva(): boolean {
        return this.dataCheckOut === null
    }
}