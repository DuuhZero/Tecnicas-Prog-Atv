import Processo from "../abstracoes/processo";
import MenuTipoDocumento from "../menus/menuTipoDocumento";
import Cliente from "../modelos/cliente";
import CadastroCPF from "./cadastroCPF";
import CadastroPassaporte from "./cadastroPassaporte";
import CadastroRg from "./cadastroRg";
import CadastroTelefone from "./cadastroTelefone";

export default class CadastrarTelefoneCliente extends Processo {
    private cliente: Cliente
    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
        this.execucao = true
    }

    processar(): void {
        console.log('Inciando o cadastro de telefone...')
        while (this.execucao) {
            this.menu.mostrar()
            this.processo = new CadastroTelefone(this.cliente)
            this.processo.processar()
            break
            }
        }
    }