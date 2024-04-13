"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToLower = void 0;
const Expresion_1 = require("./Expresion");
const Resultado_1 = require("./Resultado");
class ToLower extends Expresion_1.Expresion {
    constructor(expresion, linea, columna) {
        super(linea, columna);
        this.expresion = expresion;
    }
    interpretar(environment_name) {
        const resultado = this.expresion.interpretar(environment_name);
        if (resultado.tipo != Resultado_1.TipoDato.STRING) {
            throw { error: "Semantico", mensaje: "ToLower solo acepta cadenas", linea: this.line, columna: this.column };
        }
        return { valor: resultado.valor.toLowerCase(), tipo: Resultado_1.TipoDato.STRING };
    }
}
exports.ToLower = ToLower;
