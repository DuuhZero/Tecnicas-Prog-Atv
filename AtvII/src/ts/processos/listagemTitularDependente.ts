import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import ImpressaorCliente from "../impressores/impressorCliente";
import Impressor from "../interfaces/impressor";
import Cliente from "../modelos/cliente";

export default class ListagemTitularDependente extends Processo {
    private clientes: Cliente[];
    private impressor!: Impressor;
    constructor() {
        super();
        this.clientes = Armazem.InstanciaUnica.Clientes;
    }
    processar(): void {
        console.clear();
        console.log('Iniciando a listagem dos dados do titular de um dependente específico...');
        let nomeDependente = this.entrada.receberTexto('Digite o nome do dependente: ');
        let dependente = this.clientes.flatMap(cliente => cliente.Dependentes).find(dependente => dependente.Nome === nomeDependente);

        if (dependente && dependente.Titular) {
            this.impressor = new ImpressaorCliente(dependente.Titular);
            console.log(this.impressor.imprimir());
        } else {
            console.log('Dependente não encontrado ou titular não definido.');
        }
    }
}
