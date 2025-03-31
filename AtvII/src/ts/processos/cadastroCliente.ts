import Processo from "../abstracoes/processo";
import MenuTipoCadastroCliente from "../menus/menuTipoCadastroCliente";
import CadastroClienteTitular from "./cadastroClienteTitular";
import CadastroClienteDependente from "./cadastroClienteDependente";
import Armazem from "../dominio/armazem";

export default class CadastroCliente extends Processo {
    constructor() {
        super();
        this.menu = new MenuTipoCadastroCliente();
    }

    processar(): void {
        this.menu.mostrar();
        this.opcao = this.entrada.receberNumero("Qual o tipo do cliente para cadastro?");
        switch (this.opcao) {
            case 1:
                this.processo = new CadastroClienteTitular();
                this.processo.processar();
                break;
                case 2:
                    let nomeTitular = this.entrada.receberTexto("Digite o nome do titular do dependente: ");
                    let titular = Armazem.InstanciaUnica.Clientes.find(cliente => cliente.Nome === nomeTitular);
    
                    if (titular) {
                        this.processo = new CadastroClienteDependente(titular); 
                        this.processo.processar();
                    } else {
                        console.log("Titular não encontrado.");
                    }
                    break;
                default:
                    console.log("Opção inválida.");
            }
        }
    }
    