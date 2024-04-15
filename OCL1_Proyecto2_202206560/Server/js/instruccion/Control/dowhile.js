"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_DO_WHILE = void 0;
const Resultado_1 = require("../../Expresion/Resultado");
const Instruccion_1 = require("../Instruccion");
class FN_DO_WHILE extends Instruccion_1.Instruccion {
    constructor(condicion, bloque, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.bloque = bloque;
    }
    interpretar(entorno, consola) {
        let condicion = this.condicion.interpretar(entorno);
        if (condicion.tipo != Resultado_1.TipoDato.BOOLEANO) {
            throw new Error("EL CICLO NO VA A FUNCIONAR CONDICION ERRONEA");
        }
        do {
            const bloque = this.bloque.interpretar(entorno, consola);
            if (bloque != null) {
                if (bloque == "continue") {
                    continue;
                }
                else if (bloque == "break") {
                    break;
                }
                else {
                    throw new Error("Instruccion no valida");
                }
            }
            condicion = this.condicion.interpretar(entorno);
            if (condicion.tipo != Resultado_1.TipoDato.BOOLEANO) {
                throw new Error('Error en la condicion del do while');
            }
        } while (condicion.valor);
    }
}
exports.FN_DO_WHILE = FN_DO_WHILE;
