"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MenuHospedagem {
    mostrar() {
        console.clear();
        console.log(`****************************`);
        console.log(`| Opções de Hospedagem:`);
        console.log(`----------------------`);
        console.log(`| 1 - Realizar check-in`);
        console.log(`| 2 - Realizar check-out`);
        console.log(`| 3 - Listar hóspedes atuais`);
        console.log(`| 4 - Listar histórico de hóspedes`);
        console.log(`----------------------`);
        console.log(`| 0 - Voltar`);
        console.log(`----------------------`);
    }
}
exports.default = MenuHospedagem;
