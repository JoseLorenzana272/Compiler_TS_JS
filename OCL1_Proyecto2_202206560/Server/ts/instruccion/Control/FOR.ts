import { Expresion } from "../../Expresion/Expresion";
import { TipoDato } from "../../Expresion/Resultado";
import { Bloque } from "../Bloque";
import { Instruccion } from "../Instruccion";
import { Environment } from "../../Symbol/Environment";

export class FN_FOR extends Instruccion {
    private declaracion: Instruccion
    private condicion: Expresion
    private incremento: Instruccion
    private bloque: Bloque

    constructor(declaracion: Instruccion, condicion: Expresion, incremento: Instruccion, bloque: Bloque, linea: number, columna: number) {
        super(linea, columna)
        this.declaracion = declaracion
        this.condicion = condicion
        this.incremento = incremento
        this.bloque = bloque
    }

    public interpretar(entorno: Environment, consola: string[]): any {
        this.declaracion.interpretar(entorno, consola)
        let condicion = this.condicion.interpretar(entorno)
        if (condicion.tipo != TipoDato.BOOLEANO) {
            throw new Error("EL CICLO NO VA A FUNCIONAR CONDICION ERRONEA");
        }
        while (condicion.valor == true) {
            let escape_for = this.bloque.interpretar(entorno, consola)
            console.log('Este es el escape', escape_for)
            if (escape_for == 'break') {
                break;
            }
            if(escape_for == 'continue'){
                this.incremento.interpretar(entorno, consola)
                condicion = this.condicion.interpretar(entorno)
            }else {
                this.incremento.interpretar(entorno, consola)
                condicion = this.condicion.interpretar(entorno)
            }
            
            
        }
    }

}