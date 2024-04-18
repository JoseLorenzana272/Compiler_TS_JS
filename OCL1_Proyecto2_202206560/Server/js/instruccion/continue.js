"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Continue = void 0;
const Instruccion_1 = require("./Instruccion");
class Continue extends Instruccion_1.Instruccion {
    constructor(linea, columna) {
        super(linea, columna);
    }
    interpretar(entorno, consola) {
        return "continue";
    }
}
exports.Continue = Continue;
