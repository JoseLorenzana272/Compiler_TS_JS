"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Round = void 0;
const Expresion_1 = require("./Expresion");
const Resultado_1 = require("./Resultado");
class Round extends Expresion_1.Expresion {
    constructor(expresion, linea, columna) {
        super(linea, columna);
        this.expresion = expresion;
    }
    interpretar(environment_name) {
        const resultado = this.expresion.interpretar(environment_name);
        if (resultado.tipo == Resultado_1.TipoDato.DOUBLE || resultado.tipo == Resultado_1.TipoDato.NUMBER) {
            return { valor: Math.round(resultado.valor), tipo: Resultado_1.TipoDato.NUMBER };
        }
        else {
            throw { error: "Semantico", mensaje: "Round solo acepta numeros", linea: this.line, columna: this.column };
        }
    }
}
exports.Round = Round;
