"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cliente {
    constructor(nome, nomeSocial, dataNascimento) {
        this.telefones = [];
        this.documentos = [];
        this.dependentes = [];
        this.nome = nome;
        this.nomeSocial = nomeSocial;
        this.dataNascimento = dataNascimento;
        this.dataCadastro = new Date();
    }
    get Nome() { return this.nome; }
    set Nome(nome) { this.nome = nome; }
    get NomeSocial() { return this.nomeSocial; }
    set NomeSocial(nomeSocial) { this.nomeSocial = nomeSocial; }
    set DataNascimento(dataNascimento) { this.dataNascimento = dataNascimento; }
    get DataCadastro() { return this.dataCadastro; }
    get Telefones() { return this.telefones; }
    get Endereco() { return this.endereco; }
    get Documentos() { return this.documentos; }
    get Dependentes() { return this.dependentes; }
    get Titular() { return this.titular; }
    set Titular(titular) { this.titular = titular; }
    set Endereco(endereco) { this.endereco = endereco; }
    adicionarDependente(dependente) {
        this.dependentes.push(dependente);
    }
    removerDependente(dependente) {
        this.dependentes = this.dependentes.filter(d => d !== dependente);
    }
}
exports.default = Cliente;
