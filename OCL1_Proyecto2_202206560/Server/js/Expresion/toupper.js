"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToUpper = void 0;
const Expresion_1 = require("./Expresion");
const Resultado_1 = require("./Resultado");
class ToUpper extends Expresion_1.Expresion {
    constructor(expresion, linea, columna) {
        super(linea, columna);
        this.expresion = expresion;
    }
    interpretar(environment_name) {
        const resultado = this.expresion.interpretar(environment_name);
        if (resultado.tipo != Resultado_1.TipoDato.STRING) {
            throw { error: "Semantico", mensaje: "ToUpper solo acepta cadenas", linea: this.line, columna: this.column };
        }
        return { valor: resultado.valor.toUpperCase(), tipo: Resultado_1.TipoDato.STRING };
    }
}
exports.ToUpper = ToUpper;
