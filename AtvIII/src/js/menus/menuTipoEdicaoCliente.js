"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MenuTipoEdicaoCliente {
    mostrar() {
        console.clear();
        console.log(`****************************`);
        console.log(`| Qual informação deseja editar? `);
        console.log(`----------------------`);
        console.log(`| 1 - Nome`);
        console.log(`| 2 - Nome Social`);
        console.log(`| 3 - Data de Nascimento`);
        console.log(`| 4 - Endereço`);
        console.log(`| 5 - Documentos`);
        console.log(`| 6 - Telefones`);
        console.log(`----------------------`);
        console.log(`| 0 - Voltar`);
        console.log(`----------------------`);
    }
}
exports.default = MenuTipoEdicaoCliente;
