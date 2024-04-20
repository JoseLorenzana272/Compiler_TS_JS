import { Expresion } from "./Expresion";
import { Resultado,TipoDato } from "./Resultado";
import { Environment } from "../Symbol/Environment";


export class Casteo extends Expresion{
    private expresion:Expresion;
    private tipo:TipoDato;

    constructor(expresion:Expresion, tipo:TipoDato, linea:number,columna:number){
        super(linea,columna)
        this.expresion = expresion;
        this.tipo = tipo;
    }

    public interpretar(environment_name: Environment): Resultado {
        const resultado = this.expresion.interpretar(environment_name);
        if (resultado.tipo != TipoDato.NUMBER && resultado.tipo != TipoDato.DOUBLE && resultado.tipo != TipoDato.BOOLEANO) {
            throw {error: "Semantico", mensaje: "Casteo solo acepta numeros, decimales y booleanos", linea: this.line, columna: this.column};
        }
        // Cast de int a double
        if(this.tipo == TipoDato.DOUBLE && resultado.tipo == TipoDato.NUMBER){
            return {valor: parseFloat(resultado.valor), tipo: TipoDato.DOUBLE};
        }
        // Cast de double a int
        if(this.tipo == TipoDato.NUMBER && resultado.tipo == TipoDato.DOUBLE){
            return {valor: parseInt(resultado.valor), tipo: TipoDato.NUMBER};
        }
        // Cast de int a string
        if(this.tipo == TipoDato.STRING && resultado.tipo == TipoDato.NUMBER){
            return {valor: resultado.valor.toString(), tipo: TipoDato.STRING};
        }
        // Cast de int a char
        if(this.tipo == TipoDato.CHAR && resultado.tipo == TipoDato.NUMBER){
            return {valor: String.fromCharCode(resultado.valor), tipo: TipoDato.CHAR};
        }
        // Cast de double a string
        if(this.tipo == TipoDato.STRING && resultado.tipo == TipoDato.DOUBLE){
            return {valor: resultado.valor.toString(), tipo: TipoDato.STRING};
        }
        return {valor: resultado.valor, tipo: resultado.tipo};

    }
}