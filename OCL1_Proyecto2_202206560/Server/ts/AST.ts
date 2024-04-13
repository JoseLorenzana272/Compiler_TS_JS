import { env } from 'process';
import { Instruccion } from './instruccion/Instruccion';
import { Environment } from './Symbol/Environment';

export class AST{
    public instrucciones: Instruccion[]
    public consola: string[]
    public global: Environment

    constructor(instrucciones: Instruccion[]){
        this.instrucciones = instrucciones
        this.consola = []
        this.global = new Environment(null)
    }

    public ejecutar(): void{
        this.instrucciones.forEach(instruccion => {
            instruccion.interpretar(this.global, this.consola)
        });
    }

    public getConsola(){
        let exit = ""
        for (let i = 0; i < this.consola.length; i++){
            exit += this.consola[i].toString()
        }
        return exit
    }

}
