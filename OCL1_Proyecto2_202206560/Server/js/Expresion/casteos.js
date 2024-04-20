"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Casteo = void 0;
const Expresion_1 = require("./Expresion");
const Resultado_1 = require("./Resultado");
class Casteo extends Expresion_1.Expresion {
    constructor(expresion, tipo, linea, columna) {
        super(linea, columna);
        this.expresion = expresion;
        this.tipo = tipo;
    }
    interpretar(environment_name) {
        const resultado = this.expresion.interpretar(environment_name);
        if (resultado.tipo != Resultado_1.TipoDato.NUMBER && resultado.tipo != Resultado_1.TipoDato.DOUBLE && resultado.tipo != Resultado_1.TipoDato.BOOLEANO) {
            throw { error: "Semantico", mensaje: "Casteo solo acepta numeros, decimales y booleanos", linea: this.line, columna: this.column };
        }
        // Cast de int a double
        if (this.tipo == Resultado_1.TipoDato.DOUBLE && resultado.tipo == Resultado_1.TipoDato.NUMBER) {
            return { valor: parseFloat(resultado.valor), tipo: Resultado_1.TipoDato.DOUBLE };
        }
        // Cast de double a int
        if (this.tipo == Resultado_1.TipoDato.NUMBER && resultado.tipo == Resultado_1.TipoDato.DOUBLE) {
            return { valor: parseInt(resultado.valor), tipo: Resultado_1.TipoDato.NUMBER };
        }
        // Cast de int a string
        if (this.tipo == Resultado_1.TipoDato.STRING && resultado.tipo == Resultado_1.TipoDato.NUMBER) {
            return { valor: resultado.valor.toString(), tipo: Resultado_1.TipoDato.STRING };
        }
        // Cast de int a char
        if (this.tipo == Resultado_1.TipoDato.CHAR && resultado.tipo == Resultado_1.TipoDato.NUMBER) {
            return { valor: String.fromCharCode(resultado.valor), tipo: Resultado_1.TipoDato.CHAR };
        }
        // Cast de double a string
        if (this.tipo == Resultado_1.TipoDato.STRING && resultado.tipo == Resultado_1.TipoDato.DOUBLE) {
            return { valor: resultado.valor.toString(), tipo: Resultado_1.TipoDato.STRING };
        }
        return { valor: resultado.valor, tipo: resultado.tipo };
    }
}
exports.Casteo = Casteo;
