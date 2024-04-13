import { Expresion } from "./Expresion";
import { Resultado,TipoDato } from "./Resultado";
import { Environment } from "../Symbol/Environment";

export class ToString extends Expresion{
    private expresion:Expresion;

    constructor(expresion:Expresion, linea:number,columna:number){
        super(linea,columna)
        // expresion es lo que se va a convertir a string
        this.expresion = expresion;
    }

    public interpretar(environment_name: Environment): Resultado {
        const resultado = this.expresion.interpretar(environment_name);
        // Si el tipo de dato es diferente a STRING, se convierte a string
        if (resultado.tipo != TipoDato.NUMBER && resultado.tipo != TipoDato.DOUBLE && resultado.tipo != TipoDato.BOOLEANO) {
            throw {error: "Semantico", mensaje: "ToString solo acepta numeros, decimales y booleanos", linea: this.line, columna: this.column};
        }
        return {valor: resultado.valor.toString(), tipo: TipoDato.STRING};
    }

    
}