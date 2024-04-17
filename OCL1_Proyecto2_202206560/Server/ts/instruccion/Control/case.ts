import { Instruccion } from "../Instruccion";
import { Expresion } from "../../Expresion/Expresion";
import { Environment } from "../../Symbol/Environment";
import { Resultado } from "../../Expresion/Resultado";
import { TipoDato } from "../../Expresion/Resultado";

export class FN_CASE extends Instruccion{
    private condicion: Expresion
    private instrucciones: Instruccion[]

    constructor(condicion:Expresion,instrucciones:Instruccion[],linea:number,columna:number){
        super(linea,columna)
        this.condicion = condicion
        this.instrucciones = instrucciones
    }

    public interpretar(environment_name: Environment, consola: string[]): any {
        for (let i = 0; i < this.instrucciones.length; i++) {
            const instruccion = this.instrucciones[i];
            const result = instruccion.interpretar(environment_name, consola)
            if (result != null) return result;
        }
        
    }

    public getCondicion(environment_name: Environment): Resultado{
        if (this.condicion == null) return {valor: null, tipo: TipoDato.NULO}
        return this.condicion.interpretar(environment_name)
    }


}