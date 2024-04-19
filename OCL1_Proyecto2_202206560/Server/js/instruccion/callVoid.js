"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallVoid = void 0;
const Instruccion_1 = require("./Instruccion");
const Environment_1 = require("../Symbol/Environment");
class CallVoid extends Instruccion_1.Instruccion {
    constructor(id, expresiones, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.expresiones = expresiones;
    }
    interpretar(environment_name, consola) {
        console.log("CALL VOID");
        const funcion = environment_name.getFunction(this.id);
        if (funcion == null || funcion == undefined) {
            throw { error: "Semantico", mensaje: `La funcion ${this.id} no existe`, linea: this.line, columna: this.column };
        }
        const newEnv = new Environment_1.Environment(environment_name.getGlobal());
        if (this.expresiones != null) {
            for (let i = 0; i < this.expresiones.length; i++) {
                const value = this.expresiones[i].interpretar(environment_name);
                newEnv.saveVar(funcion.parameters[i], value.valor, value.tipo, this.line, this.column);
            }
        }
        funcion.statements.interpretar(newEnv, consola);
    }
}
exports.CallVoid = CallVoid;
