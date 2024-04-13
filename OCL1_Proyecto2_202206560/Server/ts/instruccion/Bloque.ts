
import { Instruccion } from "./Instruccion";
import { Environment } from "../Symbol/Environment";

export class Bloque extends Instruccion{
    instrucciones: Instruccion[]

    constructor(instrucciones: Instruccion[]){
        super(0,0)
        this.instrucciones = instrucciones
    }

    public interpretar(environment_name: Environment, consola: string[]): null {
        this.instrucciones.forEach(instruccion => {
            instruccion.interpretar(environment_name, consola)
       });
       return null;
    }
}
