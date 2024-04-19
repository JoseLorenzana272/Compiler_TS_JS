import { Instruccion } from './Instruccion';
import { Environment } from '../Symbol/Environment';

export class Function extends Instruccion{

    constructor(private id:string, public statements:Instruccion, public parameters: Array<string>, linea:number, columna:number){
        super(linea,columna)
    }

    public interpretar(environment_name: Environment, consola: string[]){
        environment_name.saveFunction(this.id, this)
        
    }
}