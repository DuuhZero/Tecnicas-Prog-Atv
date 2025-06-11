"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MenuTipoExcluirCliente {
    mostrar() {
        console.clear();
        console.log(`****************************`);
        console.log(`| Qual o tipo do cliente para excluir? `);
        console.log(`----------------------`);
        console.log(`| 1 - Titular`);
        console.log(`| 2 - Dependente`);
        console.log(`----------------------`);
        console.log(`****************************`);
        console.log(`Senha de confirmação para excluir um Cliente: "apagar"`);
    }
}
exports.default = MenuTipoExcluirCliente;
