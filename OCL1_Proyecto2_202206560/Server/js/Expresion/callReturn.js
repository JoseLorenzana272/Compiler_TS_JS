"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallReturn = void 0;
const Environment_1 = require("../Symbol/Environment");
const Expresion_1 = require("./Expresion");
const Resultado_1 = require("./Resultado");
class CallReturn extends Expresion_1.Expresion {
    constructor(id, expresion, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.expresion = expresion;
        this.consola = [];
    }
    interpretar(environment_name) {
        const funcion = environment_name.getFunction(this.id);
        if (funcion == null || funcion == undefined) {
            throw { error: "Semantico", mensaje: `La funcion ${this.id} no existe`, linea: this.line, columna: this.column };
        }
        const newEnv = new Environment_1.Environment(environment_name.getGlobal());
        if (this.expresion != null) {
            for (let i = 0; i < this.expresion.length; i++) {
                const value = this.expresion[i].interpretar(environment_name);
                newEnv.saveVar(funcion.parameters[i], value.valor, value.tipo, this.line, this.column);
            }
        }
        let result = funcion.statements.interpretar(newEnv, this.consola);
        if (result != null && result != undefined) {
            return result;
        }
        return { valor: null, tipo: Resultado_1.TipoDato.NULO };
    }
    setConsola(consola) {
        this.consola = consola;
    }
}
exports.CallReturn = CallReturn;
