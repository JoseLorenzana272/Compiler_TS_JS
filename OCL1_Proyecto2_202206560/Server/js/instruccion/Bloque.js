"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bloque = void 0;
const Instruccion_1 = require("./Instruccion");
class Bloque extends Instruccion_1.Instruccion {
    constructor(instrucciones) {
        super(0, 0);
        this.instrucciones = instrucciones;
    }
    interpretar(environment_name, consola) {
        this.instrucciones.forEach(instruccion => {
            instruccion.interpretar(environment_name, consola);
        });
        return null;
    }
}
exports.Bloque = Bloque;
