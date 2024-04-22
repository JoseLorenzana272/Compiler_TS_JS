import { Instruccion } from "./Instruccion";
import { Environment } from "../Symbol/Environment";
import { TipoDato } from "../Expresion/Resultado";
import { Resultado } from "../Expresion/Resultado";
import { Function } from "./Function";
import { CallReturn } from "../Expresion/callReturn";
import { CallVoid } from "./callVoid";
import { tConsole } from "./tConsole";

export class execute extends Instruccion{
    public Llamada: CallReturn | CallVoid;
    constructor(Llamada: CallReturn | CallVoid, line: number, column: number){
        super(line, column);
        this.Llamada = Llamada;
    }

    public interpretar(environment_name: Environment, consola: string[]):any{
        if(this.Llamada instanceof CallVoid){
            this.Llamada.interpretar(environment_name, consola);
        }else{
            let result = this.Llamada.interpretar(environment_name);
        }
    }

}