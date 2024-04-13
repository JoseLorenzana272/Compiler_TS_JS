import { Expresion } from "./Expresion";
import { Resultado,TipoDato } from "./Resultado";
import { Environment } from "../Symbol/Environment";

export class ToUpper extends Expresion{
    private expresion:Expresion;

    constructor(expresion:Expresion, linea:number,columna:number){
        super(linea,columna)
        this.expresion = expresion;
    }

    public interpretar(environment_name: Environment): Resultado {
        const resultado = this.expresion.interpretar(environment_name);
        if (resultado.tipo != TipoDato.STRING) {
            throw {error: "Semantico", mensaje: "ToUpper solo acepta cadenas", linea: this.line, columna: this.column};
        }
        return {valor: resultado.valor.toUpperCase(), tipo: TipoDato.STRING};
    }
}