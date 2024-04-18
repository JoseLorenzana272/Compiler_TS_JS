
import { Instruccion } from "./Instruccion";
import { Environment } from "../Symbol/Environment";

export class Bloque extends Instruccion{
    instrucciones: Instruccion[]

    constructor(instrucciones: Instruccion[]){
        super(0,0)
        this.instrucciones = instrucciones
    }

    public interpretar(environment_name: Environment, consola: string[]): null {
        var inst
        for(let instruccion of this.instrucciones){
            inst = instruccion.interpretar(environment_name,consola)
            if(inst == "break" || inst == "continue" || inst == "return"){
                break
            }

        }
       if (inst != null) return inst
       else{
       return null;
       }
    }
}
