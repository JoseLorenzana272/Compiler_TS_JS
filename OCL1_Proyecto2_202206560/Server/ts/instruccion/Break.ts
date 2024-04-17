import { TipoDato } from "../Expresion/Resultado";
import { Instruccion } from "./Instruccion";
import { Environment } from "../Symbol/Environment";

export class Break extends Instruccion{
    constructor(linea:number,columna:number){
        super(linea,columna)
    }
    public interpretar(entorno : Environment,consola: string[]): string {
        return "break";
    }
}