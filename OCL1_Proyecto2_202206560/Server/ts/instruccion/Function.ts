import { Instruccion } from './Instruccion';
import { Environment } from '../Symbol/Environment';

export class Function extends Instruccion{

    constructor(private id:string, private statements:Instruccion, public parameters: Array<string>, linea:number, columna:number){
        super(linea,columna)
    }

    public interpretar(environment_name: Environment, consola: string[]): null {
        //environment_name.guardarFuncion(this.id, this)
        return null
        
    }
}