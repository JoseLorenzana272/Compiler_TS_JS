"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_CASE = void 0;
const Instruccion_1 = require("../Instruccion");
const Resultado_1 = require("../../Expresion/Resultado");
class FN_CASE extends Instruccion_1.Instruccion {
    constructor(condicion, instrucciones, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }
    interpretar(environment_name, consola) {
        for (let i = 0; i < this.instrucciones.length; i++) {
            const instruccion = this.instrucciones[i];
            const result = instruccion.interpretar(environment_name, consola);
            if (result != null)
                return result;
        }
    }
    getCondicion(environment_name) {
        if (this.condicion == null)
            return { valor: null, tipo: Resultado_1.TipoDato.NULO };
        return this.condicion.interpretar(environment_name);
    }
}
exports.FN_CASE = FN_CASE;
