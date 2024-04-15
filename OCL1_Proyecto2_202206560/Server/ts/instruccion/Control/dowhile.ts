
import { Expresion } from "../../Expresion/Expresion";
import { TipoDato } from "../../Expresion/Resultado";
import { Bloque } from "../Bloque";
import { Instruccion } from "../Instruccion";
import { Environment } from "../../Symbol/Environment";

export class FN_DO_WHILE extends Instruccion {
    condicion: Expresion
    bloque: Bloque

    constructor(condicion: Expresion, bloque: Bloque, linea: number, columna: number) {
        super(linea, columna)
        this.condicion = condicion
        this.bloque = bloque
    }

    public interpretar(entorno : Environment,consola: string[]): any {
        let condicion = this.condicion.interpretar(entorno)
        if(condicion.tipo != TipoDato.BOOLEANO){
            throw new Error("EL CICLO NO VA A FUNCIONAR CONDICION ERRONEA");
        }
        do{

            const bloque = this.bloque.interpretar(entorno,consola);
            if(bloque != null){
                if(bloque=="continue"){
                    continue;
                }else if(bloque=="break"){
                    break;
                }else{
                    throw new Error("Instruccion no valida");
                }
            }
            condicion = this.condicion.interpretar(entorno)
            if(condicion.tipo != TipoDato.BOOLEANO){
                throw new Error('Error en la condicion del do while')
            }
        }while(condicion.valor);
    }
}

