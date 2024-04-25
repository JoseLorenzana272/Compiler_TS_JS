import { env } from 'process';
import { Instruccion } from './instruccion/Instruccion';
import { Environment } from './Symbol/Environment';
import { VarDecla } from './instruccion/varDecla';
import { Function } from './instruccion/Function';
import { execute } from './instruccion/execute';
import { Print } from './instruccion/Print';
import { tConsole } from './instruccion/tConsole';

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
        tConsole.length = 0
        this.instrucciones.forEach(instruccion => {
            if(instruccion instanceof VarDecla || instruccion instanceof Function){
            instruccion.interpretar(this.global, this.consola)
            }
        });
        for (let instruccion of this.instrucciones){
            if(instruccion instanceof execute){
                instruccion.interpretar(this.global, this.consola)
                break;
            }
        }
        console.log(tConsole[0])
        console.log(tConsole.length)
        this.consola = tConsole

    }

    public getConsola(){
        let exit = ""
        for (let i = 0; i < this.consola.length; i++){
            exit += this.consola[i].toString()
        }
        return exit
    }

    public generateGraphvizDOT(): string {
        let dot = `digraph AST {\n`;

        // Add nodes for each instruction
        this.instrucciones.forEach((instruccion, index) => {
            dot += `  node${index} [label="${instruccion.constructor.name}"];\n`;
        });

        // Add edges between instructions
        for (let i = 0; i < this.instrucciones.length - 1; i++) {
            dot += `  node${i} -> node${i + 1};\n`;
        }

        dot += `}`;

        return dot;
    }

}
