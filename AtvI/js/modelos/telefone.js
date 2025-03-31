"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Telefone {
    clonar() {
        let telefone = new Telefone();
        telefone.ddd = this.ddd;
        telefone.numero = this.numero;
        return telefone;
    }
}
exports.default = Telefone;
