import { Expresion } from "./Expresion";
import { Resultado,TipoDato } from "./Resultado";
import { Environment } from "../Symbol/Environment";

export class lenght extends Expresion {
    private value: Expresion;

    constructor(value: Expresion, line: number, column: number) {
        super(line, column);
        this.value = value;
    }

    public interpretar(environment_name: Environment): Resultado {
        const value = this.value.interpretar(environment_name);
        if (value.tipo != TipoDato.STRING) {
            throw { error: "Semantico", mensaje: "Lenght solo acepta strings", linea: this.line, columna: this.column };
        }
        return { valor: value.valor.length, tipo: TipoDato.NUMBER };
    }

}