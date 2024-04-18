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
        var inst;
        for (let instruccion of this.instrucciones) {
            inst = instruccion.interpretar(environment_name, consola);
            if (inst == "break" || inst == "continue" || inst == "return") {
                break;
            }
        }
        if (inst != null)
            return inst;
        else {
            return null;
        }
    }
}
exports.Bloque = Bloque;
