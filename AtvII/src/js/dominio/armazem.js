"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Armazem {
    constructor() {
        this.clientes = [];
    }
    static get InstanciaUnica() {
        return this.instanciaUnica;
    }
    get Clientes() {
        return this.clientes;
    }
    adicionarCliente(cliente) {
        this.clientes.push(cliente);
    }
    removerCliente(cliente) {
        this.clientes = this.clientes.filter(c => c !== cliente);
    }
}
exports.default = Armazem;
Armazem.instanciaUnica = new Armazem();
