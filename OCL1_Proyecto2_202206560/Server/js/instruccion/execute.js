"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const Instruccion_1 = require("./Instruccion");
const callVoid_1 = require("./callVoid");
class execute extends Instruccion_1.Instruccion {
    constructor(Llamada, line, column) {
        super(line, column);
        this.Llamada = Llamada;
    }
    interpretar(environment_name, consola) {
        if (this.Llamada instanceof callVoid_1.CallVoid) {
            this.Llamada.interpretar(environment_name, consola);
        }
        else {
            let result = this.Llamada.interpretar(environment_name);
        }
    }
}
exports.execute = execute;
