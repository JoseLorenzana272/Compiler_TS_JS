"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToString = void 0;
const Expresion_1 = require("./Expresion");
const Resultado_1 = require("./Resultado");
class ToString extends Expresion_1.Expresion {
    constructor(expresion, linea, columna) {
        super(linea, columna);
        // expresion es lo que se va a convertir a string
        this.expresion = expresion;
    }
    interpretar(environment_name) {
        const resultado = this.expresion.interpretar(environment_name);
        // Si el tipo de dato es diferente a STRING, se convierte a string
        if (resultado.tipo != Resultado_1.TipoDato.NUMBER && resultado.tipo != Resultado_1.TipoDato.DOUBLE && resultado.tipo != Resultado_1.TipoDato.BOOLEANO) {
            throw { error: "Semantico", mensaje: "ToString solo acepta numeros, decimales y booleanos", linea: this.line, columna: this.column };
        }
        return { valor: resultado.valor.toString(), tipo: Resultado_1.TipoDato.STRING };
    }
}
exports.ToString = ToString;
