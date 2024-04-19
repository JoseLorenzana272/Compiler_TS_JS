import { Environment } from "../Symbol/Environment";
import { Expresion } from "./Expresion";
import { Resultado, TipoDato } from "./Resultado";

export class CallReturn extends Expresion{
    private id: string;
    private expresion: Expresion[];
    private consola: string[];

    constructor(id: string, expresion: Expresion[], linea: number, columna: number){
        super(linea, columna);
        this.id = id;
        this.expresion = expresion;
        this.consola = [];
    }

    public interpretar(environment_name: Environment): Resultado {
        const funcion = environment_name.getFunction(this.id);
        if (funcion == null || funcion == undefined){
            throw {error: "Semantico", mensaje: `La funcion ${this.id} no existe`, linea: this.line, columna: this.column};
        }
        const newEnv = new Environment(environment_name.getGlobal());
        if (this.expresion != null){
            for (let i = 0; i < this.expresion.length; i++){
                const value = this.expresion[i].interpretar(environment_name);
                newEnv.saveVar(funcion.parameters[i], value.valor, value.tipo, this.line, this.column);
            }
        }
        let result = funcion.statements.interpretar(newEnv, this.consola);
        if (result != null && result != undefined){
            return result;
        }
        return {valor: null, tipo: TipoDato.NULO};
    }

    public setConsola(consola: string[]): void{
        this.consola = consola;
    }

}