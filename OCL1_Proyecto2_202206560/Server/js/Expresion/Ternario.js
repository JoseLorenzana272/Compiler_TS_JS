"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ternario = void 0;
const Expresion_1 = require("./Expresion");
const Resultado_1 = require("./Resultado");
class Ternario extends Expresion_1.Expresion {
    constructor(condicion, e1, e2, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.exp1 = e1;
        this.exp2 = e2;
    }
    interpretar(environment_name) {
        const resultadoCondicion = this.condicion.interpretar(environment_name);
        if (resultadoCondicion.tipo != Resultado_1.TipoDato.BOOLEANO) {
            console.log(resultadoCondicion, this.condicion);
            throw new Error(`Error: No se puede evaluar una condición de tipo ${Resultado_1.TipoDato[resultadoCondicion.tipo]}`);
        }
        if (resultadoCondicion.valor) {
            return this.exp1.interpretar(environment_name);
        }
        else {
            return this.exp2.interpretar(environment_name);
        }
    }
}
exports.Ternario = Ternario;
