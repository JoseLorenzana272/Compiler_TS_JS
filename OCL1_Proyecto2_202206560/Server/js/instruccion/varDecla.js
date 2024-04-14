"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VarDecla = void 0;
const Resultado_1 = require("../Expresion/Resultado");
const Instruccion_1 = require("./Instruccion");
class VarDecla extends Instruccion_1.Instruccion {
    constructor(id, tipo, valor, line, column) {
        super(line, column);
        this.id = id;
        this.tipo = tipo;
        this.valor = valor;
    }
    interpretar(environment_name, consola) {
        let tipo;
        let preliminarValue;
        console.log(this.tipo.toString());
        switch (this.tipo) {
            case 0:
                tipo = Resultado_1.TipoDato.NUMBER;
                preliminarValue = 0;
                break;
            case 1:
                tipo = Resultado_1.TipoDato.DOUBLE;
                preliminarValue = 0.0;
                break;
            case 2:
                tipo = Resultado_1.TipoDato.BOOLEANO;
                preliminarValue = true;
                break;
            case 3:
                tipo = Resultado_1.TipoDato.CHAR;
                preliminarValue = '0';
                break;
            case 4:
                tipo = Resultado_1.TipoDato.STRING;
                preliminarValue = "";
                break;
            default:
                throw new Error("Tipo de dato no válido");
        }
        if (this.valor != null) {
            const result = this.valor.interpretar(environment_name);
            if (result.tipo != tipo) {
                throw new Error("El tipo de dato no coincide con el valor asignado");
            }
            this.id.forEach(id => {
                environment_name.saveVar(id, result.valor, result.tipo, this.line, this.column);
            });
        }
        else {
            this.id.forEach(id => {
                environment_name.saveVar(id, preliminarValue, tipo, this.line, this.column);
            });
        }
        return null;
    }
}
exports.VarDecla = VarDecla;
