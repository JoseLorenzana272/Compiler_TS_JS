"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primitivo = void 0;
const Expresion_1 = require("./Expresion");
const Resultado_1 = require("./Resultado");
class Primitivo extends Expresion_1.Expresion {
    constructor(e1, tipo, linea, columna) {
        super(linea, columna);
        this.exp1 = e1;
        this.tipo = tipo;
    }
    interpretar() {
        switch (this.tipo) {
            case Resultado_1.TipoDato.NUMBER:
                return { valor: parseInt(this.exp1), tipo: Resultado_1.TipoDato.NUMBER };
            case Resultado_1.TipoDato.DOUBLE:
                return { valor: parseFloat(this.exp1), tipo: Resultado_1.TipoDato.DOUBLE };
            case Resultado_1.TipoDato.BOOLEANO:
                return { valor: this.exp1 == "true", tipo: Resultado_1.TipoDato.BOOLEANO };
            case Resultado_1.TipoDato.CHAR:
                return { valor: this.exp1, tipo: Resultado_1.TipoDato.CHAR };
            case Resultado_1.TipoDato.STRING:
                return { valor: this.exp1.toString(), tipo: Resultado_1.TipoDato.STRING };
            default:
                return { valor: null, tipo: Resultado_1.TipoDato.NULO };
        }
        // en caso que no sea ninguno
        return { valor: null, tipo: Resultado_1.TipoDato.NULO };
    }
}
exports.Primitivo = Primitivo;
