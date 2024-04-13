"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AST = void 0;
const Environment_1 = require("./Symbol/Environment");
class AST {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
        this.consola = [];
        this.global = new Environment_1.Environment(null);
    }
    ejecutar() {
        this.instrucciones.forEach(instruccion => {
            instruccion.interpretar(this.global, this.consola);
        });
    }
    getConsola() {
        let exit = "";
        for (let i = 0; i < this.consola.length; i++) {
            exit += this.consola[i].toString();
        }
        return exit;
    }
}
exports.AST = AST;
