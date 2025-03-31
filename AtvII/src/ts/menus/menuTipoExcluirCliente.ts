    import Menu from "../interfaces/menu";

    export default class MenuTipoExcluirCliente implements Menu {
        mostrar(): void {
            console.clear()
            console.log(`****************************`)
            console.log(`| Qual o tipo do cliente para excluir? `)
            console.log(`----------------------`)
            console.log(`| 1 - Titular`)
            console.log(`| 2 - Dependente`)
            console.log(`----------------------`)
            console.log(`****************************`)
            console.log(`Senha de confirmação para excluir um Cliente: "apagar"`)
        }
    }