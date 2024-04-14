import { Expresion } from "./Expresion";
import { Resultado,TipoDato } from "./Resultado";
import { Environment } from "../Symbol/Environment";

export class idValue extends Expresion{

    constructor(private id:string,line:number,column:number){
        super(line,column);
    }
    public interpretar(entorno : Environment) : Resultado{
        const value = entorno.getVar(this.id);
        if(value != null){
            return {valor: value.value,tipo:value.type}
        }else{
            throw {error: "Semantico", mensaje: `Variable ${this.id} no encontrada`, linea: this.line, columna: this.column};
        }
    }

}