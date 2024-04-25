"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AST = void 0;
const Environment_1 = require("./Symbol/Environment");
const varDecla_1 = require("./instruccion/varDecla");
const Function_1 = require("./instruccion/Function");
const execute_1 = require("./instruccion/execute");
const tConsole_1 = require("./instruccion/tConsole");
class AST {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
        this.consola = [];
        this.global = new Environment_1.Environment(null);
    }
    ejecutar() {
        tConsole_1.tConsole.length = 0;
        this.instrucciones.forEach(instruccion => {
            if (instruccion instanceof varDecla_1.VarDecla || instruccion instanceof Function_1.Function) {
                instruccion.interpretar(this.global, this.consola);
            }
        });
        for (let instruccion of this.instrucciones) {
            if (instruccion instanceof execute_1.execute) {
                instruccion.interpretar(this.global, this.consola);
                break;
            }
        }
        console.log(tConsole_1.tConsole[0]);
        console.log(tConsole_1.tConsole.length);
        this.consola = tConsole_1.tConsole;
    }
    getConsola() {
        let exit = "";
        for (let i = 0; i < this.consola.length; i++) {
            exit += this.consola[i].toString();
        }
        return exit;
    }
    generateGraphvizDOT() {
        let dot = `digraph AST {\n`;
        // Add nodes for each instruction
        this.instrucciones.forEach((instruccion, index) => {
            dot += `  node${index} [label="${instruccion.constructor.name}"];\n`;
        });
        // Add edges between instructions
        for (let i = 0; i < this.instrucciones.length - 1; i++) {
            dot += `  node${i} -> node${i + 1};\n`;
        }
        dot += `}`;
        return dot;
    }
}
exports.AST = AST;
