import { Expresion } from "../Expresion/Expresion";
import { TipoDato } from "../Expresion/Resultado";
import { Instruccion } from "./Instruccion";
import { Environment } from "../Symbol/Environment";

export class VarDecla extends Instruccion {
    public id: string[];
    public tipo: TipoDato;
    public valor: Expresion | null;

    constructor (id: string[], tipo: TipoDato, valor: Expresion | null, line: number, column: number){
        super(line, column);
        this.id = id;
        this.tipo = tipo;
        this.valor = valor;
    }

    public interpretar(environment_name: Environment, consola:string[]):null{
        let tipo:TipoDato;
        let preliminarValue:any;
        console.log(this.tipo.toString());
        switch(this.tipo){
            case 0:
                tipo = TipoDato.NUMBER;
                preliminarValue = 0;
                break;
            case 1:
                tipo = TipoDato.DOUBLE;
                preliminarValue = 0.0;
                break;
            case 2:
                tipo = TipoDato.BOOLEANO;
                preliminarValue = true;
                break;
            case 3:
                tipo = TipoDato.CHAR;
                preliminarValue = '0';
                break;
            case 4:
                tipo = TipoDato.STRING;
                preliminarValue = "";
                break;
            default:
                throw new Error("Tipo de dato no válido");
        }
        if(this.valor != null){
            const result = this.valor.interpretar(environment_name);
            if(result.tipo != tipo){
                throw new Error("El tipo de dato no coincide con el valor asignado");
            }
            this.id.forEach(id => {
                environment_name.saveVar(id, result.valor, result.tipo, this.line, this.column);
            })
        }else{
            this.id.forEach(id => {
                environment_name.saveVar(id, preliminarValue, tipo, this.line, this.column);
            })
        }
        return null;
    }


}