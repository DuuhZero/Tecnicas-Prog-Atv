"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ImpressorEndereco {
    constructor(endereco) {
        this.endereco = endereco;
    }
    imprimir() {
        if (!this.endereco) {
            return "| Endereco: Endereco não definido\n";
        }
        let impressao = `| Endereco:\n`
            + `| Rua: ${this.endereco.Rua}\n`
            + `| Bairro: ${this.endereco.Bairro}\n`
            + `| Cidade: ${this.endereco.Cidade}\n`
            + `| Estado: ${this.endereco.Estado}\n`
            + `| País: ${this.endereco.Pais}\n`
            + `| Código Postal: ${this.endereco.CodigoPostal}`;
        return impressao;
    }
}
exports.default = ImpressorEndereco;
