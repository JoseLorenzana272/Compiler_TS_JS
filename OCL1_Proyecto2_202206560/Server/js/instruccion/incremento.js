"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Incremento = void 0;
const Resultado_1 = require("../Expresion/Resultado");
const Instruccion_1 = require("./Instruccion");
class Incremento extends Instruccion_1.Instruccion {
    constructor(id, tipo, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.tipo = tipo;
    }
    interpretar(entorno, consola) {
        const value = entorno.getVar(this.id);
        if (value == null) {
            throw new Error(`Variable ${this.id} no encontrada`);
        }
        if (value.type == Resultado_1.TipoDato.NUMBER || value.type == Resultado_1.TipoDato.DOUBLE) {
            if (this.tipo) {
                entorno.editVar(this.id, value.value + 1, value.type, this.line, this.column);
            }
            else {
                entorno.editVar(this.id, value.value - 1, value.type, this.line, this.column);
            }
        }
        else {
            throw new Error(`Variable ${this.id} no es de tipo numerico`);
        }
        return null;
    }
}
exports.Incremento = Incremento;
