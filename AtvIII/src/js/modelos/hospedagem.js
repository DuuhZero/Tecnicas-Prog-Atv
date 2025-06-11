"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Hospedagem {
    constructor(cliente, acomodacao, dataCheckIn) {
        this.cliente = cliente;
        this.acomodacao = acomodacao;
        this.dataCheckIn = dataCheckIn;
        this.dataCheckOut = null;
    }
    get Cliente() { return this.cliente; }
    get Acomodacao() { return this.acomodacao; }
    get DataCheckIn() { return this.dataCheckIn; }
    get DataCheckOut() { return this.dataCheckOut; }
    realizarCheckOut(dataCheckOut) {
        this.dataCheckOut = dataCheckOut;
    }
    get EstaAtiva() {
        return this.dataCheckOut === null;
    }
}
exports.default = Hospedagem;
