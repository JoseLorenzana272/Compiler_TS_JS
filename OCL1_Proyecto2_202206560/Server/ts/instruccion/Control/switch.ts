import { Expresion } from "../../Expresion/Expresion";
import { TipoDato } from "../../Expresion/Resultado";
import { Bloque } from "../Bloque";
import { Instruccion } from "../Instruccion";
import { Environment } from "../../Symbol/Environment";

export class FN_SWITCH extends Instruccion{
    condicion: Expresion
    casos: Bloque[]
    casoDefault: Bloque

    constructor(condicion:Expresion,casos:Bloque[],casoDefault:Bloque,linea:number,columna:number){
        super(linea,columna)
        this.condicion = condicion
        this.casos = casos
        this.casoDefault  = casoDefault
    }

    public interpretar(environment_name: Environment, consola: string[]): any {
        const condicion = this.condicion.interpretar(environment_name)
        let bandera = false
        console.log("condicion", condicion)
        console.log("casos", this.casos)
        for (let i = 0; i < this.casos.length; i++) {
            const caso = this.casos[i]
            console.log("casooooooo", caso.interpretar)
            if (condicion.valor == caso){
                bandera = true
                caso.interpretar(environment_name, consola)
                break
            }
        }
        if (!bandera && this.casoDefault != null){
            console.log("default", this.casoDefault.instrucciones)
            this.casoDefault.instrucciones.forEach(instruccion => {
                instruccion.interpretar(environment_name, consola)
            });
        }
        return null
    }

}
