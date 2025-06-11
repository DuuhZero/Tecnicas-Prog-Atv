"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Armazem {
    constructor() {
        this.clientes = [];
        this.acomodacoes = [];
        this.hospedagensAtivas = [];
        this.hospedagensHistorico = [];
    }
    static get InstanciaUnica() {
        return this.instanciaUnica;
    }
    get Clientes() {
        return this.clientes;
    }
    get Acomodacoes() {
        return this.acomodacoes;
    }
    get HospedagensAtivas() {
        return this.hospedagensAtivas.filter(h => h.EstaAtiva);
    }
    get HospedagensHistorico() {
        return this.hospedagensHistorico.filter(h => !h.EstaAtiva);
    }
    adicionarHospedagem(hospedagem) {
        this.hospedagensAtivas.push(hospedagem);
    }
    finalizarHospedagem(hospedagem, dataCheckOut) {
        hospedagem.realizarCheckOut(dataCheckOut);
        const index = this.hospedagensAtivas.indexOf(hospedagem);
        if (index > -1) {
            this.hospedagensAtivas.splice(index, 1);
            this.hospedagensHistorico.push(hospedagem);
        }
    }
}
exports.default = Armazem;
Armazem.instanciaUnica = new Armazem();
