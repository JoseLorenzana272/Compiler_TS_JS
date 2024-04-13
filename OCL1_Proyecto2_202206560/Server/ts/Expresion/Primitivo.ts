import { Expresion } from "./Expresion";
import { TipoDato, Resultado } from "./Resultado";

export class Primitivo extends Expresion{
    exp1:string;
    tipo: TipoDato;
    
    constructor(e1:string,tipo:TipoDato,linea:number,columna:number){
        super(linea,columna)
        this.exp1 = e1;
        this.tipo = tipo;
    }
    public interpretar(): Resultado {
        switch(this.tipo){
            case TipoDato.NUMBER:
                return {valor:parseInt(this.exp1),tipo:TipoDato.NUMBER}
            case TipoDato.DOUBLE:
                return {valor:parseFloat(this.exp1),tipo:TipoDato.DOUBLE}
            case TipoDato.BOOLEANO:
                return {valor:this.exp1 == "true",tipo:TipoDato.BOOLEANO}
            case TipoDato.CHAR:
                return {valor:this.exp1,tipo:TipoDato.CHAR}
            case TipoDato.STRING:
                return {valor:this.exp1.toString(),tipo:TipoDato.STRING}
            default:
                return {valor:null,tipo:TipoDato.NULO}
        }

        // en caso que no sea ninguno
        return {valor:null,tipo:TipoDato.NULO}
    }
}