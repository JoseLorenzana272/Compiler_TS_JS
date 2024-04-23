"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lenght = void 0;
const Expresion_1 = require("./Expresion");
const Resultado_1 = require("./Resultado");
class lenght extends Expresion_1.Expresion {
    constructor(value, line, column) {
        super(line, column);
        this.value = value;
    }
    interpretar(environment_name) {
        const value = this.value.interpretar(environment_name);
        if (value.tipo != Resultado_1.TipoDato.STRING) {
            throw { error: "Semantico", mensaje: "Lenght solo acepta strings", linea: this.line, columna: this.column };
        }
        return { valor: value.valor.length, tipo: Resultado_1.TipoDato.NUMBER };
    }
}
exports.lenght = lenght;
