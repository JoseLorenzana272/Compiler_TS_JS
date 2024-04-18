import { TipoDato } from "../Expresion/Resultado";
import { Instruccion } from "./Instruccion";
import { Environment } from "../Symbol/Environment";

export class Continue extends Instruccion{
    constructor(linea:number,columna:number){
        super(linea,columna)
    }
    public interpretar(entorno : Environment,consola: string[]): string {
        return "continue";
    }
}