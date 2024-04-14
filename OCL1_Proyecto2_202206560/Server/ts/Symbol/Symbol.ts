import { TipoDato } from '../Expresion/Resultado';

export class Symbol{
    public id: string;
    public value: any;
    public type: TipoDato;
    private line: number;
    private column: number;

    constructor(id:string, type:TipoDato, value:any, line:number, column:number){
        this.id = id;
        this.type = type;
        this.value = value;
        this.line = line;
        this.column = column;
        
    }
}