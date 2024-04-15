"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOf = void 0;
const Expresion_1 = require("./Expresion");
const Resultado_1 = require("./Resultado");
class TypeOf extends Expresion_1.Expresion {
    constructor(expresion, linea, columna) {
        super(linea, columna);
        this.expresion = expresion;
    }
    interpretar(environment_name) {
        const resultado = this.expresion.interpretar(environment_name);
        if (resultado.tipo == Resultado_1.TipoDato.NULO) {
            throw { error: "Semantico", mensaje: "TypeOf no acepta nulos", linea: this.line, columna: this.column };
        }
        switch (resultado.tipo) {
            case Resultado_1.TipoDato.NUMBER:
                return { valor: "int", tipo: Resultado_1.TipoDato.STRING };
            case Resultado_1.TipoDato.STRING:
                return { valor: "string", tipo: Resultado_1.TipoDato.STRING };
            case Resultado_1.TipoDato.BOOLEANO:
                return { valor: "boolean", tipo: Resultado_1.TipoDato.STRING };
            case Resultado_1.TipoDato.CHAR:
                return { valor: "char", tipo: Resultado_1.TipoDato.STRING };
            case Resultado_1.TipoDato.DOUBLE:
                return { valor: "double", tipo: Resultado_1.TipoDato.STRING };
            default:
                return { valor: "null", tipo: Resultado_1.TipoDato.NULO };
        }
    }
}
exports.TypeOf = TypeOf;
