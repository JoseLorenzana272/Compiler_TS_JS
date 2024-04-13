import {env} from 'process';
import { Expresion } from "./Expresion";
import { OpTernario, Resultado,TipoDato } from "./Resultado";
import { Environment } from "../Symbol/Environment";

export class Ternario extends Expresion{
    public condicion:Expresion;
    public exp1:Expresion;
    public exp2:Expresion;

    constructor(condicion:Expresion,e1:Expresion,e2:Expresion,linea:number,columna:number){
        super(linea,columna)
        this.condicion = condicion;
        this.exp1 = e1;
        this.exp2 = e2
    }

    public interpretar(environment_name: Environment): Resultado {

        const resultadoCondicion = this.condicion.interpretar(environment_name)

        if(resultadoCondicion.tipo != TipoDato.BOOLEANO){
            console.log(resultadoCondicion, this.condicion) 
            throw new Error(`Error: No se puede evaluar una condición de tipo ${TipoDato[resultadoCondicion.tipo]}`)
        }

        if(resultadoCondicion.valor){
            return this.exp1.interpretar(environment_name)
        }else{
            return this.exp2.interpretar(environment_name)
        }
    }
}