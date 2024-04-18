import { TipoDato } from "../Expresion/Resultado";
import { Instruccion } from "./Instruccion";
import { Environment } from "../Symbol/Environment";
import { Expresion } from "../Expresion/Expresion";


export class SetVar extends Instruccion {
    private id: string;
    private exp: Expresion;

    constructor(id: string, value: any, line: number, column: number) {
        super(line, column);
        this.id = id;
        this.exp = value;
    }

    public interpretar(environment_name: Environment, consola: string[]): null {
        const resultado = this.exp.interpretar(environment_name);
        if (resultado.tipo == TipoDato.BOOLEANO) {
            resultado.valor = resultado.valor ? "true" : "false";
        }
        let simbolo = environment_name.getVar(this.id);
        if (simbolo != null) {
            if (simbolo.type == resultado.tipo) {
                environment_name.saveVar(this.id, resultado.valor, resultado.tipo, this.line, this.column);
            } else {
                throw new Error("El tipo de dato no coincide con el valor asignado");
            }
        } else {
            throw new Error("Variable no encontrada");
        }
        return null;
    }

}