"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MenuPrincipal {
    mostrar() {
        console.log(`****************************`);
        console.log(`| Por favor, selecione uma opção...`);
        console.log(`----------------------`);
        console.log(`| Opções para cliente:`);
        console.log(`----------------------`);
        console.log(`| 1 - Cadastrar cliente`);
        console.log(`| 2 - Editar cliente`);
        console.log(`| 3 - Gerenciar Clientes/Dependentes`);
        console.log(`| 4 - Excluir cliente`);
        console.log(`----------------------`);
        console.log(`| Opções para acomodações:`);
        console.log(`----------------------`);
        console.log(`| 5 - Listar acomodações`);
        console.log(`----------------------`);
        console.log(`| Opções para hospedagem:`);
        console.log(`----------------------`);
        console.log(`| 6 - Gerenciar hospedagem`);
        console.log(`----------------------`);
        console.log(`****************************`);
        console.log(`| 0 - Sair`);
        console.log(`----------------------`);
    }
}
exports.default = MenuPrincipal;
