"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetVar = void 0;
const Resultado_1 = require("../Expresion/Resultado");
const Instruccion_1 = require("./Instruccion");
class SetVar extends Instruccion_1.Instruccion {
    constructor(id, value, line, column) {
        super(line, column);
        this.id = id;
        this.exp = value;
    }
    interpretar(environment_name, consola) {
        const resultado = this.exp.interpretar(environment_name);
        if (resultado.tipo == Resultado_1.TipoDato.BOOLEANO) {
            resultado.valor = resultado.valor ? "true" : "false";
        }
        let simbolo = environment_name.getVar(this.id);
        if (simbolo != null) {
            if (simbolo.type == resultado.tipo) {
                environment_name.saveVar(this.id, resultado.valor, resultado.tipo, this.line, this.column);
            }
            else {
                throw new Error("El tipo de dato no coincide con el valor asignado");
            }
        }
        else {
            throw new Error("Variable no encontrada");
        }
        return null;
    }
}
exports.SetVar = SetVar;
