"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Return = void 0;
const Instruccion_1 = require("./Instruccion");
class Return extends Instruccion_1.Instruccion {
    constructor(expresion, line, column) {
        super(line, column);
        this.expresion = expresion;
    }
    interpretar(environment) {
        const result = this.expresion.interpretar(environment);
        return result;
    }
}
exports.Return = Return;
