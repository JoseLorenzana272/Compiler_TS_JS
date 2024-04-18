"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Relacional = void 0;
const Expresion_1 = require("./Expresion");
const Resultado_1 = require("./Resultado");
class Relacional extends Expresion_1.Expresion {
    // En jison deben agregar las 2 expresiones, el tipo de expresión
    // Ustedes saben eso a través de su gramática
    constructor(e1, e2, op, linea, columna) {
        super(linea, columna);
        this.Operacion = op;
        this.exp1 = e1;
        this.exp2 = e2;
    }
    interpretar(environment_name) {
        const resultado1 = this.exp1.interpretar(environment_name);
        const resultado2 = this.exp2.interpretar(environment_name);
        console.log(resultado1, resultado2);
        if (resultado1.tipo == Resultado_1.TipoDato.NULO || resultado2.tipo == Resultado_1.TipoDato.NULO) {
            throw Error("Tipo de dato no se puede comparar");
        }
        if ((resultado1.tipo == Resultado_1.TipoDato.NUMBER || resultado1.tipo == Resultado_1.TipoDato.DOUBLE || resultado1.tipo == Resultado_1.TipoDato.CHAR || resultado1.tipo == Resultado_1.TipoDato.STRING
            &&
                resultado2.tipo == Resultado_1.TipoDato.NUMBER || resultado2.tipo == Resultado_1.TipoDato.DOUBLE || resultado2.tipo == Resultado_1.TipoDato.CHAR || resultado2.tipo == Resultado_1.TipoDato.STRING) || (resultado1.tipo == Resultado_1.TipoDato.BOOLEANO && resultado2.tipo == Resultado_1.TipoDato.BOOLEANO)) {
            switch (this.Operacion) {
                case Resultado_1.OpRelacional.IGUAL:
                    return { tipo: Resultado_1.TipoDato.BOOLEANO, valor: resultado1.valor == resultado2.valor };
                case Resultado_1.OpRelacional.DISTINTO:
                    return { tipo: Resultado_1.TipoDato.BOOLEANO, valor: resultado1.valor != resultado2.valor };
                case Resultado_1.OpRelacional.MENOR:
                    return { tipo: Resultado_1.TipoDato.BOOLEANO, valor: resultado1.valor < resultado2.valor };
                case Resultado_1.OpRelacional.MENORIGUAL:
                    return { tipo: Resultado_1.TipoDato.BOOLEANO, valor: resultado1.valor <= resultado2.valor };
                case Resultado_1.OpRelacional.MAYOR:
                    return { tipo: Resultado_1.TipoDato.BOOLEANO, valor: resultado1.valor > resultado2.valor };
                case Resultado_1.OpRelacional.MAYORIGUAL:
                    return { tipo: Resultado_1.TipoDato.BOOLEANO, valor: resultado1.valor >= resultado2.valor };
            }
        }
        return { tipo: Resultado_1.TipoDato.NULO, valor: null };
    }
}
exports.Relacional = Relacional;
