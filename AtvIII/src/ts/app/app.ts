import Processo from "../abstracoes/processo";
import DiretorCasalSimples from "../diretores/diretorCasalSimples";
import DiretorFamiliaMais from "../diretores/diretorFamiliaMais";
import DiretorFamiliaSimples from "../diretores/diretorFamiliaSimples";
import DiretorFamiliaSuper from "../diretores/diretorFamiliaSuper";
import DiretorSolteiroMais from "../diretores/diretorSolteiroMais";
import DiretorSolteiroSimples from "../diretores/diretorSolteiroSimples";
import Armazem from "../dominio/armazem";
import CadastroAcomodacoes from "../processos/cadastroAcomodacoes";
import Principal from "../processos/principal";

console.clear()
console.log(`Bem-vindo(a) ao melhor sistema de gestão de clubes, hotéis e resorts do mundo, o Atlantis :)`);

const armazem = Armazem.InstanciaUnica
const diretores = [
    new DiretorSolteiroSimples(),
    new DiretorSolteiroMais(),
    new DiretorCasalSimples(),
    new DiretorFamiliaSimples(),
    new DiretorFamiliaMais(),
    new DiretorFamiliaSuper()
]

diretores.forEach(diretor => {
    armazem.Acomodacoes.push(diretor.construir())
})

let processo: Processo
let execucao: Boolean = true

while (execucao) {
    processo = new Principal()
    processo.processar()
    execucao = processo.Execucao
}