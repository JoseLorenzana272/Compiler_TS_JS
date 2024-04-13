"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_IF = void 0;
const Resultado_1 = require("../../Expresion/Resultado");
const Instruccion_1 = require("../Instruccion");
class FN_IF extends Instruccion_1.Instruccion {
    constructor(condicion, bloqueIf, bloqueElse, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.bloqueIf = bloqueIf;
        this.bloqueElse = bloqueElse;
    }
    interpretar(environment_name, consola) {
        const condicion = this.condicion.interpretar(environment_name);
        if (condicion.tipo != Resultado_1.TipoDato.BOOLEANO)
            throw Error("La condición no es booleana");
        if (condicion.valor) {
            this.bloqueIf.interpretar(environment_name, consola);
        }
        else {
            console.log("else");
            console.log({ else: this.bloqueElse });
            this.bloqueElse.interpretar(environment_name, consola);
        }
        return null;
    }
}
exports.FN_IF = FN_IF;
