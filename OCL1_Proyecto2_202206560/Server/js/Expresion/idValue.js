"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idValue = void 0;
const Expresion_1 = require("./Expresion");
class idValue extends Expresion_1.Expresion {
    constructor(id, line, column) {
        super(line, column);
        this.id = id;
    }
    interpretar(entorno) {
        const value = entorno.getVar(this.id);
        if (value != null) {
            return { valor: value.value, tipo: value.type };
        }
        else {
            throw { error: "Semantico", mensaje: `Variable ${this.id} no encontrada`, linea: this.line, columna: this.column };
        }
    }
}
exports.idValue = idValue;
