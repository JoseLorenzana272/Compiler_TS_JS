"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Print = void 0;
const Resultado_1 = require("../Expresion/Resultado");
const Instruccion_1 = require("./Instruccion");
class Print extends Instruccion_1.Instruccion {
    constructor(expresion, salto, linea, columna) {
        super(linea, columna);
        this.expresion = expresion;
        this.salto = salto;
    }
    interpretar(environment_name, consola) {
        const res = this.expresion.interpretar(environment_name);
        if (res.tipo == Resultado_1.TipoDato.BOOLEANO) {
            res.valor == res.valor ? "true" : "false";
        }
        if (this.salto) {
            consola.push(res.valor + "\n");
        }
        else {
            consola.push(res.valor + "");
        }
        return null;
    }
}
exports.Print = Print;
