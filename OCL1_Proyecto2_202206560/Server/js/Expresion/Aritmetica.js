"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aritmetica = void 0;
const Expresion_1 = require("./Expresion");
const Resultado_1 = require("./Resultado");
class Aritmetica extends Expresion_1.Expresion {
    constructor(e1, e2, op, linea, columna) {
        super(linea, columna);
        this.Operacion = op;
        this.exp1 = e1;
        this.exp2 = e2;
    }
    interpretar(environment_name) {
        // Ejecutamos los noterminales
        const resultadoIzq = this.exp1.interpretar(environment_name);
        const resultadoDer = this.exp2.interpretar(environment_name);
        let dominantType;
        // Lógica del intérprete
        // Comparamos el tipo de operación
        switch (this.Operacion) {
            case Resultado_1.OpAritmetica.UMINUS:
                dominantType = UMINUS[resultadoIzq.tipo];
                switch (dominantType) {
                    case Resultado_1.TipoDato.NUMBER:
                        convertirTipo(resultadoIzq);
                        return { valor: -resultadoIzq.valor, tipo: dominantType };
                    case Resultado_1.TipoDato.DOUBLE:
                        convertirTipo(resultadoIzq);
                        return { valor: -resultadoIzq.valor, tipo: dominantType };
                    default:
                        throw Error(`Error: No se puede negar ${Resultado_1.TipoDato[resultadoIzq.tipo]}`);
                }
            case Resultado_1.OpAritmetica.SUMA:
                dominantType = SUMAS[resultadoIzq.tipo][resultadoDer.tipo];
                switch (dominantType) {
                    case Resultado_1.TipoDato.NUMBER:
                        convertirTipo(resultadoIzq);
                        convertirTipo(resultadoDer);
                        return { valor: resultadoIzq.valor + resultadoDer.valor, tipo: Resultado_1.TipoDato.NUMBER };
                    case Resultado_1.TipoDato.DOUBLE:
                        convertirTipo(resultadoIzq);
                        convertirTipo(resultadoDer);
                        return { valor: resultadoIzq.valor + resultadoDer.valor, tipo: Resultado_1.TipoDato.DOUBLE };
                    case Resultado_1.TipoDato.STRING:
                        return { valor: resultadoIzq.valor.toString() + resultadoDer.valor.toString(), tipo: Resultado_1.TipoDato.STRING };
                    default:
                        throw Error(`Error: No se puede sumar ${Resultado_1.TipoDato[resultadoIzq.tipo]} con ${Resultado_1.TipoDato[resultadoDer.tipo]}`);
                }
            case Resultado_1.OpAritmetica.RESTA:
                dominantType = RESTAS[resultadoIzq.tipo][resultadoDer.tipo];
                switch (dominantType) {
                    case Resultado_1.TipoDato.NUMBER:
                        convertirTipo(resultadoIzq);
                        convertirTipo(resultadoDer);
                        return { valor: resultadoIzq.valor - resultadoDer.valor, tipo: Resultado_1.TipoDato.NUMBER };
                    case Resultado_1.TipoDato.DOUBLE:
                        convertirTipo(resultadoIzq);
                        convertirTipo(resultadoDer);
                        return { valor: resultadoIzq.valor - resultadoDer.valor, tipo: Resultado_1.TipoDato.DOUBLE };
                    default:
                        throw Error(`Error: No se puede restar ${Resultado_1.TipoDato[resultadoIzq.tipo]} con ${Resultado_1.TipoDato[resultadoDer.tipo]}`);
                }
            case Resultado_1.OpAritmetica.PRODUCTO:
                dominantType = PRODUCTO[resultadoIzq.tipo][resultadoDer.tipo];
                switch (dominantType) {
                    case Resultado_1.TipoDato.NUMBER:
                        convertirTipo(resultadoIzq);
                        convertirTipo(resultadoDer);
                        return { valor: resultadoIzq.valor * resultadoDer.valor, tipo: Resultado_1.TipoDato.NUMBER };
                    case Resultado_1.TipoDato.DOUBLE:
                        convertirTipo(resultadoIzq);
                        convertirTipo(resultadoDer);
                        return { valor: resultadoIzq.valor * resultadoDer.valor, tipo: Resultado_1.TipoDato.DOUBLE };
                    default:
                        throw Error(`Error: No se puede multiplicar ${Resultado_1.TipoDato[resultadoIzq.tipo]} con ${Resultado_1.TipoDato[resultadoDer.tipo]}`);
                }
            case Resultado_1.OpAritmetica.DIVISION:
                dominantType = DIVISION[resultadoIzq.tipo][resultadoDer.tipo];
                switch (dominantType) {
                    case Resultado_1.TipoDato.NUMBER:
                        convertirTipo(resultadoIzq);
                        convertirTipo(resultadoDer);
                        return { valor: resultadoIzq.valor / resultadoDer.valor, tipo: Resultado_1.TipoDato.DOUBLE };
                    case Resultado_1.TipoDato.DOUBLE:
                        convertirTipo(resultadoIzq);
                        convertirTipo(resultadoDer);
                        return { valor: resultadoIzq.valor / resultadoDer.valor, tipo: Resultado_1.TipoDato.DOUBLE };
                    default:
                        throw Error(`Error: No se puede dividir ${Resultado_1.TipoDato[resultadoIzq.tipo]} con ${Resultado_1.TipoDato[resultadoDer.tipo]}`);
                }
            case Resultado_1.OpAritmetica.MODULO:
                dominantType = MODULO[resultadoIzq.tipo][resultadoDer.tipo];
                switch (dominantType) {
                    case Resultado_1.TipoDato.DOUBLE:
                        convertirTipo(resultadoIzq);
                        convertirTipo(resultadoDer);
                        return { valor: resultadoIzq.valor % resultadoDer.valor, tipo: Resultado_1.TipoDato.DOUBLE };
                    default:
                        throw Error(`Error: No se puede modular ${Resultado_1.TipoDato[resultadoIzq.tipo]} con ${Resultado_1.TipoDato[resultadoDer.tipo]}`);
                }
            case Resultado_1.OpAritmetica.POTENCIA:
                dominantType = POTENCIA[resultadoIzq.tipo][resultadoDer.tipo];
                switch (dominantType) {
                    case Resultado_1.TipoDato.NUMBER:
                        convertirTipo(resultadoIzq);
                        convertirTipo(resultadoDer);
                        return { valor: Math.pow(resultadoIzq.valor, resultadoDer.valor), tipo: Resultado_1.TipoDato.NUMBER };
                    case Resultado_1.TipoDato.DOUBLE:
                        convertirTipo(resultadoIzq);
                        convertirTipo(resultadoDer);
                        return { valor: Math.pow(resultadoIzq.valor, resultadoDer.valor), tipo: Resultado_1.TipoDato.DOUBLE };
                    default:
                        throw Error(`Error: No se puede potenciar ${Resultado_1.TipoDato[resultadoIzq.tipo]} con ${Resultado_1.TipoDato[resultadoDer.tipo]}`);
                }
            default:
                throw Error(`Error: Operación no soportada ${Resultado_1.OpAritmetica[this.Operacion]}`);
        }
    }
}
exports.Aritmetica = Aritmetica;
function convertirTipo(temp) {
    if (temp.tipo == Resultado_1.TipoDato.BOOLEANO) {
        if (temp.valor == true) {
            temp.valor = 1;
        }
        else {
            temp.valor = 0;
        }
    }
    if (temp.tipo == Resultado_1.TipoDato.CHAR) {
        temp.valor = temp.valor.charCodeAt(0);
    }
}
const SUMAS = [
    [Resultado_1.TipoDato.NUMBER, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.NUMBER, Resultado_1.TipoDato.NUMBER, Resultado_1.TipoDato.STRING],
    [Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.STRING],
    [Resultado_1.TipoDato.NUMBER, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.STRING],
    [Resultado_1.TipoDato.NUMBER, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.STRING, Resultado_1.TipoDato.STRING],
    [Resultado_1.TipoDato.STRING, Resultado_1.TipoDato.STRING, Resultado_1.TipoDato.STRING, Resultado_1.TipoDato.STRING, Resultado_1.TipoDato.STRING],
];
const RESTAS = [
    [Resultado_1.TipoDato.NUMBER, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.NUMBER, Resultado_1.TipoDato.NUMBER, Resultado_1.TipoDato.NULO],
    [Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.NULO],
    [Resultado_1.TipoDato.NUMBER, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO],
    [Resultado_1.TipoDato.NUMBER, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO],
    [Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO],
];
const PRODUCTO = [
    [Resultado_1.TipoDato.NUMBER, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NUMBER, Resultado_1.TipoDato.NULO],
    [Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.NULO],
    [Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO],
    [Resultado_1.TipoDato.NUMBER, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO],
    [Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO],
];
const DIVISION = [
    [Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.NULO],
    [Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.NULO],
    [Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO],
    [Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO],
    [Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO],
];
const MODULO = [
    [Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO],
    [Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO],
    [Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO],
    [Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO],
    [Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO],
];
const POTENCIA = [
    [Resultado_1.TipoDato.NUMBER, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO],
    [Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO],
    [Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO],
    [Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO],
    [Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO],
];
const UMINUS = [
    Resultado_1.TipoDato.NUMBER,
    Resultado_1.TipoDato.DOUBLE,
    Resultado_1.TipoDato.NULO,
    Resultado_1.TipoDato.NULO,
    Resultado_1.TipoDato.NULO,
];
