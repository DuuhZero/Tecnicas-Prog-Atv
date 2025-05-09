"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tipoDocumento_1 = require("../enumeracoes/tipoDocumento");
const cliente_1 = __importDefault(require("../modelos/cliente"));
const documento_1 = __importDefault(require("../modelos/documento"));
const endereco_1 = __importDefault(require("../modelos/endereco"));
const telefone_1 = __importDefault(require("../modelos/telefone"));
let cliente = new cliente_1.default();
cliente.nome = `Pedro de Alcântara João Carlos Leopoldo Salvador`;
cliente.nomeSocial = `Dom Pedro II`;
cliente.dataCadastro = new Date(1840, 6, 23);
cliente.dataNascimento = new Date(1825, 11, 2);
let documento = new documento_1.default();
documento.numero = `000.000.000-00`;
documento.tipo = tipoDocumento_1.TipoDocumento.CPF;
documento.dataExpedicao = new Date(1825, 11, 2);
cliente.documentos = [documento];
let endereco = new endereco_1.default();
endereco.rua = `R. do Catete`;
endereco.bairro = `Copacabana`;
endereco.cidade = `Rio de Janeiro`;
endereco.estado = `Rio de Janeiro`;
endereco.pais = `Brasil`;
endereco.codigoPostal = `22220-000`;
cliente.endereco = endereco;
let telefone = new telefone_1.default();
telefone.ddd = `21`;
telefone.numero = `2222-2222`;
cliente.telefones = [telefone];
let dependente = new cliente_1.default();
dependente.nome = `Isabel Cristina Leopoldina Augusta Micaela`;
dependente.nomeSocial = `Princesa Isabel`;
dependente.dataCadastro = new Date(1921, 10, 14);
dependente.dataNascimento = new Date(1846, 6, 29);
dependente.endereco = cliente.endereco.clonar();
dependente.telefones = cliente.telefones.map(tel => tel.clonar());
dependente.titular = cliente;
cliente.dependentes.push(dependente);
console.log(cliente);
console.log(dependente);
