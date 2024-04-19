import { Instruccion } from "./Instruccion";
import { Environment } from "../Symbol/Environment";
import { Expresion } from "../Expresion/Expresion";

export class CallVoid extends Instruccion{

    constructor(private id:string, private expresiones: Expresion[], linea:number, columna:number){
        super(linea,columna)
    }

    public interpretar(environment_name: Environment, consola: string[]) {
        console.log("CALL VOID");
        const funcion = environment_name.getFunction(this.id);
        if (funcion == null || funcion == undefined){
            throw {error: "Semantico", mensaje: `La funcion ${this.id} no existe`, linea: this.line, columna: this.column};
        }
        const newEnv = new Environment(environment_name.getGlobal());

        if (this.expresiones != null){
            for (let i = 0; i < this.expresiones.length; i++){
                const value = this.expresiones[i].interpretar(environment_name);
                newEnv.saveVar(funcion.parameters[i], value.valor, value.tipo, this.line, this.column);
            }
        }
        funcion.statements.interpretar(newEnv, consola);
    }
}