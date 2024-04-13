import { Expresion } from "./Expresion";
import { Resultado,TipoDato } from "./Resultado";
import { Environment } from "../Symbol/Environment";

export class ToLower extends Expresion{
    private expresion:Expresion;

    constructor(expresion:Expresion, linea:number,columna:number){
        super(linea,columna)
        this.expresion = expresion;
    }

    public interpretar(environment_name: Environment): Resultado {
        const resultado = this.expresion.interpretar(environment_name);
        if (resultado.tipo != TipoDato.STRING) {
            throw {error: "Semantico", mensaje: "ToLower solo acepta cadenas", linea: this.line, columna: this.column};
        }
        return {valor: resultado.valor.toLowerCase(), tipo: TipoDato.STRING};
    }
}