import { Expresion } from "./Expresion";
import { Resultado,TipoDato } from "./Resultado";
import { Environment } from "../Symbol/Environment";

export class Round extends Expresion{
    private expresion:Expresion;

    constructor(expresion:Expresion, linea:number,columna:number){
        super(linea,columna)
        this.expresion = expresion;
    }

    public interpretar(environment_name: Environment): Resultado {
        const resultado = this.expresion.interpretar(environment_name);
        if(resultado.tipo == TipoDato.DOUBLE || resultado.tipo == TipoDato.NUMBER){
            return {valor: Math.round(resultado.valor), tipo: TipoDato.NUMBER};
        }else {
            throw {error: "Semantico", mensaje: "Round solo acepta numeros", linea: this.line, columna: this.column};
        }
    }
}