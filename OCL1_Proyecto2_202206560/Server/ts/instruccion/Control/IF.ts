
import { Expresion } from "../../Expresion/Expresion";
import { TipoDato } from "../../Expresion/Resultado";
import { Bloque } from "../Bloque";
import { Instruccion } from "../Instruccion";
import { Environment } from "../../Symbol/Environment";

export class FN_IF extends Instruccion{
    condicion: Expresion
    bloqueIf: Bloque
    bloqueElse: Bloque

    constructor(condicion:Expresion,bloqueIf:Bloque,bloqueElse:Bloque,linea:number,columna:number){
        super(linea,columna)
        this.condicion = condicion
        this.bloqueIf = bloqueIf
        this.bloqueElse  = bloqueElse
    }

    public interpretar(environment_name: Environment, consola: string[]): null {
        const condicion = this.condicion.interpretar(environment_name)
        var escape_if;
        if (condicion.tipo!=TipoDato.BOOLEANO)
            throw Error("La condición no es booleana")
        if (condicion.valor){
            escape_if = this.bloqueIf.interpretar(environment_name, consola)
        }else{
            if (this.bloqueElse != null){
            console.log("else")
            console.log({else:this.bloqueElse})
            escape_if = this.bloqueElse.interpretar(environment_name, consola)
            }

            
        }

        if (escape_if != null)
            return escape_if
        else{return null}

        
    }
}
