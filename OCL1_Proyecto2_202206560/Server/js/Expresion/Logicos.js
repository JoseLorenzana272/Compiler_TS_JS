"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logico = void 0;
const Expresion_1 = require("./Expresion");
const Resultado_1 = require("./Resultado");
class Logico extends Expresion_1.Expresion {
    // En jison deben agregar las 2 expresiones, el tipo de expresión
    // Ustedes saben eso a través de su gramática
    constructor(e1, e2, op, linea, columna) {
        super(linea, columna);
        this.Operacion = op;
        this.exp1 = e1;
        this.exp2 = e2;
    }
    interpretar(environment_name) {
        // LO MIO
        const resultado1 = this.exp1.interpretar(environment_name);
        const resultado2 = this.exp2.interpretar(environment_name);
        switch (this.Operacion) {
            case Resultado_1.OpLogico.AND:
                if (resultado1.tipo == Resultado_1.TipoDato.BOOLEANO && resultado2.tipo == Resultado_1.TipoDato.BOOLEANO) {
                    return { valor: resultado1.valor && resultado2.valor, tipo: Resultado_1.TipoDato.BOOLEANO };
                }
                break;
            case Resultado_1.OpLogico.OR:
                if (resultado1.tipo == Resultado_1.TipoDato.BOOLEANO && resultado2.tipo == Resultado_1.TipoDato.BOOLEANO) {
                    return { valor: resultado1.valor || resultado2.valor, tipo: Resultado_1.TipoDato.BOOLEANO };
                }
                break;
            case Resultado_1.OpLogico.NOT:
                if (resultado1.tipo == Resultado_1.TipoDato.BOOLEANO) {
                    return { valor: !resultado1.valor, tipo: Resultado_1.TipoDato.BOOLEANO };
                }
                break;
            default:
                throw new Error("Error en la operación lógica");
        }
        return { valor: null, tipo: Resultado_1.TipoDato.NULO };
    }
}
exports.Logico = Logico;
