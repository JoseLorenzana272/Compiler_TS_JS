import { Instruccion } from "./Instruccion";
import { Expresion } from "../Expresion/Expresion";
import { Environment } from "../Symbol/Environment";

export class Return extends Instruccion{
    private expresion: Expresion;

    constructor(expresion: Expresion, line: number, column: number){
        super(line, column);
        this.expresion = expresion;
    }

    public interpretar(environment: Environment): any{
        const result = this.expresion.interpretar(environment);
        return result;
    }
}