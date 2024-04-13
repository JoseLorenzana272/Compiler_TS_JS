"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Function = void 0;
const Instruccion_1 = require("./Instruccion");
class Function extends Instruccion_1.Instruccion {
    constructor(id, statements, parameters, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.statements = statements;
        this.parameters = parameters;
    }
    interpretar(environment_name, consola) {
        //environment_name.guardarFuncion(this.id, this)
        return null;
    }
}
exports.Function = Function;
