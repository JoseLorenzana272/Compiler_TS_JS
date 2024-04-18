"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_FOR = void 0;
const Resultado_1 = require("../../Expresion/Resultado");
const Instruccion_1 = require("../Instruccion");
class FN_FOR extends Instruccion_1.Instruccion {
    constructor(declaracion, condicion, incremento, bloque, linea, columna) {
        super(linea, columna);
        this.declaracion = declaracion;
        this.condicion = condicion;
        this.incremento = incremento;
        this.bloque = bloque;
    }
    interpretar(entorno, consola) {
        this.declaracion.interpretar(entorno, consola);
        let condicion = this.condicion.interpretar(entorno);
        if (condicion.tipo != Resultado_1.TipoDato.BOOLEANO) {
            throw new Error("EL CICLO NO VA A FUNCIONAR CONDICION ERRONEA");
        }
        while (condicion.valor == true) {
            let escape_for = this.bloque.interpretar(entorno, consola);
            console.log('Este es el escape', escape_for);
            if (escape_for == 'break') {
                break;
            }
            if (escape_for == 'continue') {
                this.incremento.interpretar(entorno, consola);
                condicion = this.condicion.interpretar(entorno);
            }
            else {
                this.incremento.interpretar(entorno, consola);
                condicion = this.condicion.interpretar(entorno);
            }
        }
    }
}
exports.FN_FOR = FN_FOR;
