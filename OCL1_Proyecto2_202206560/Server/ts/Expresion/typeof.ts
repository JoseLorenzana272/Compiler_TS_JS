import { Expresion } from "./Expresion";
import { Resultado,TipoDato } from "./Resultado";
import { Environment } from "../Symbol/Environment";

export class TypeOf extends Expresion{
    private expresion:Expresion;

    constructor(expresion:Expresion, linea:number,columna:number){
        super(linea,columna)
        this.expresion = expresion;
    }

    public interpretar(environment_name: Environment): Resultado {
        const resultado = this.expresion.interpretar(environment_name);
        if (resultado.tipo == TipoDato.NULO) {
            throw {error: "Semantico", mensaje: "TypeOf no acepta nulos", linea: this.line, columna: this.column};
        }
        switch (resultado.tipo) {
            case TipoDato.NUMBER:
                return {valor: "int", tipo: TipoDato.STRING};
            case TipoDato.STRING:
                return {valor: "string", tipo: TipoDato.STRING};
            case TipoDato.BOOLEANO:
                return {valor: "boolean", tipo: TipoDato.STRING};
            case TipoDato.CHAR:
                return {valor: "char", tipo: TipoDato.STRING};
            case TipoDato.DOUBLE:
                return {valor: "double", tipo: TipoDato.STRING};
            default:
                return {valor: "null", tipo: TipoDato.NULO};

        }

    }
}