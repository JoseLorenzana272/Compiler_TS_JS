import { TipoDato } from "../Expresion/Resultado";
import { Instruccion } from "./Instruccion";
import { Environment } from "../Symbol/Environment";
export class Incremento extends Instruccion{
    private id:string;
    private tipo:boolean;
    constructor(id:string,tipo:boolean,linea:number,columna:number){
        super(linea,columna)
        this.id=id
        this.tipo = tipo
    }
    public interpretar(entorno : Environment,consola: string[]): null {
        const value = entorno.getVar(this.id);
        if(value == null){
            throw new Error(`Variable ${this.id} no encontrada`);
        }
        if(value.type == TipoDato.NUMBER || value.type == TipoDato.DOUBLE){
            if(this.tipo){
                entorno.editVar(this.id, value.value+1, value.type, this.line, this.column);
            }else{
                entorno.editVar(this.id, value.value-1, value.type, this.line, this.column);
            }
        }else{
            throw new Error(`Variable ${this.id} no es de tipo numerico`);
        }
        return null;
    }
}