"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MenuTipoListagemClientes {
    mostrar() {
        console.clear();
        console.log(`****************************`);
        console.log(`| Qual o tipo de listagem desejada? `);
        console.log(`----------------------`);
        console.log(`| 1 - Todos os titulares`);
        console.log(`| 2 - Todos os dependentes de um titular`);
        console.log(`| 3 - Editar dependente`);
        console.log(`| 4 - Excluir dependente`);
        console.log(`----------------------`);
        console.log(`| 0 - Voltar`);
        console.log(`----------------------`);
    }
}
exports.default = MenuTipoListagemClientes;
