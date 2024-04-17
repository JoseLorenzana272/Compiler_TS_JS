"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Break = void 0;
const Instruccion_1 = require("./Instruccion");
class Break extends Instruccion_1.Instruccion {
    constructor(linea, columna) {
        super(linea, columna);
    }
    interpretar(entorno, consola) {
        return "break";
    }
}
exports.Break = Break;
