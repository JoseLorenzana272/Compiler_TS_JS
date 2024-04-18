import { env } from 'process';
import { Symbol } from '../Symbol/Symbol';
import { TipoDato } from '../Expresion/Resultado';
import { Function } from '../instruccion/Function';

export class Environment{
    private variables: Map<string,Symbol>
    private functions: Map<string,Function>

    constructor(public previous: Environment | null){
        this.variables = new Map()
        this.functions = new Map()
    }

    public saveVar(id:string, value:any, type:TipoDato, line:number, column:number) : void{
        let env: Environment | null = this;
        if(env.variables.has(id)){
            this.editVar(id,value,type,line,column);
        }
        this.variables.set(id,new Symbol(id,type,value, line, column));
    }

    public editVar(id:string, value:any, type:TipoDato, line:number, column:number) : void{
        let env: Environment | null = this;
        while(env != null){
            if(env.variables.has(id)){
                env.variables.set(id,new Symbol(id,type,value, line, column));
                return;
            }
            env = env.previous;
        }
        throw new Error(`Variable ${id} no encontrada`);
    }

    public getVar(id:string): Symbol | null | undefined{
        let env: Environment | null = this;
        while(env != null){
            if(env.variables.has(id)){
                return env.variables.get(id);
            }
            env = env.previous;
        }
        return null;
        
    }
}

