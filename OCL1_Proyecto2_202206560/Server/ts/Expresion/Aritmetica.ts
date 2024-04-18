import {env} from 'process';
import { Expresion } from "./Expresion";
import { OpAritmetica, Resultado,TipoDato } from "./Resultado";
import { Environment } from "../Symbol/Environment";


export class Aritmetica extends Expresion{
    public exp1:Expresion;
    public exp2:Expresion;
    public Operacion: OpAritmetica;

    constructor(e1:Expresion,e2:Expresion,op:OpAritmetica,linea:number,columna:number){
        super(linea,columna)
        this.Operacion = op;
        this.exp1 = e1;
        this.exp2 = e2
    }
    public interpretar(environment_name: Environment): Resultado {
        // Ejecutamos los noterminales
        const resultadoIzq = this.exp1.interpretar(environment_name)
        const resultadoDer = this.exp2.interpretar(environment_name)
        let dominantType;
        // Lógica del intérprete
        // Comparamos el tipo de operación
        switch(this.Operacion){
            case OpAritmetica.SUMA:
                dominantType = SUMAS[resultadoIzq.tipo][resultadoDer.tipo]
                switch(dominantType){
                    case TipoDato.NUMBER:
                        convertirTipo(resultadoIzq);
                        convertirTipo(resultadoDer);
                        return {valor:resultadoIzq.valor + resultadoDer.valor,tipo:TipoDato.NUMBER}
                    case TipoDato.DOUBLE:
                        convertirTipo(resultadoIzq);
                        convertirTipo(resultadoDer);
                        return {valor:resultadoIzq.valor + resultadoDer.valor,tipo:TipoDato.DOUBLE}
                    case TipoDato.STRING:
                        return {valor:resultadoIzq.valor.toString() + resultadoDer.valor.toString(),tipo:TipoDato.STRING}
                    default:
                        throw Error(`Error: No se puede sumar ${TipoDato[resultadoIzq.tipo]} con ${TipoDato[resultadoDer.tipo]}`)
                }
            case OpAritmetica.RESTA:
                dominantType = RESTAS[resultadoIzq.tipo][resultadoDer.tipo]
                switch(dominantType){
                    case TipoDato.NUMBER:
                        convertirTipo(resultadoIzq);
                        convertirTipo(resultadoDer);
                        return {valor:resultadoIzq.valor - resultadoDer.valor,tipo:TipoDato.NUMBER}
                    case TipoDato.DOUBLE:
                        convertirTipo(resultadoIzq);
                        convertirTipo(resultadoDer);
                        return {valor:resultadoIzq.valor - resultadoDer.valor,tipo:TipoDato.DOUBLE}
                    default:
                        throw Error(`Error: No se puede restar ${TipoDato[resultadoIzq.tipo]} con ${TipoDato[resultadoDer.tipo]}`)
                }
            case OpAritmetica.PRODUCTO:
                dominantType = PRODUCTO[resultadoIzq.tipo][resultadoDer.tipo]
                switch(dominantType){
                    case TipoDato.NUMBER:
                        convertirTipo(resultadoIzq);
                        convertirTipo(resultadoDer);
                        return {valor:resultadoIzq.valor * resultadoDer.valor,tipo:TipoDato.NUMBER}
                    case TipoDato.DOUBLE:
                        convertirTipo(resultadoIzq);
                        convertirTipo(resultadoDer);
                        return {valor:resultadoIzq.valor * resultadoDer.valor,tipo:TipoDato.DOUBLE}
                    default:
                        throw Error(`Error: No se puede multiplicar ${TipoDato[resultadoIzq.tipo]} con ${TipoDato[resultadoDer.tipo]}`)
                }
            case OpAritmetica.DIVISION:
                dominantType = DIVISION[resultadoIzq.tipo][resultadoDer.tipo]
                switch(dominantType){
                    case TipoDato.NUMBER:
                        convertirTipo(resultadoIzq);
                        convertirTipo(resultadoDer);
                        return {valor:resultadoIzq.valor / resultadoDer.valor,tipo:TipoDato.DOUBLE}
                    case TipoDato.DOUBLE:
                        convertirTipo(resultadoIzq);
                        convertirTipo(resultadoDer);
                        return {valor:resultadoIzq.valor / resultadoDer.valor,tipo:TipoDato.DOUBLE}
                    default:
                        throw Error(`Error: No se puede dividir ${TipoDato[resultadoIzq.tipo]} con ${TipoDato[resultadoDer.tipo]}`)
                }
            case OpAritmetica.MODULO:
                dominantType = MODULO[resultadoIzq.tipo][resultadoDer.tipo]
                switch(dominantType){
                    case TipoDato.DOUBLE:
                        convertirTipo(resultadoIzq);
                        convertirTipo(resultadoDer);
                        return {valor:resultadoIzq.valor % resultadoDer.valor,tipo:TipoDato.DOUBLE}
                    default:
                        throw Error(`Error: No se puede modular ${TipoDato[resultadoIzq.tipo]} con ${TipoDato[resultadoDer.tipo]}`)
                }
            case OpAritmetica.POTENCIA:
                dominantType = POTENCIA[resultadoIzq.tipo][resultadoDer.tipo]
                switch(dominantType){
                    case TipoDato.NUMBER:
                        convertirTipo(resultadoIzq);
                        convertirTipo(resultadoDer);
                        return {valor:Math.pow(resultadoIzq.valor,resultadoDer.valor),tipo:TipoDato.NUMBER}
                    case TipoDato.DOUBLE:
                        convertirTipo(resultadoIzq);
                        convertirTipo(resultadoDer);
                        return {valor:Math.pow(resultadoIzq.valor,resultadoDer.valor),tipo:TipoDato.DOUBLE}
                    default:
                        throw Error(`Error: No se puede potenciar ${TipoDato[resultadoIzq.tipo]} con ${TipoDato[resultadoDer.tipo]}`)
                }
            default:
                throw Error(`Error: Operación no soportada ${OpAritmetica[this.Operacion]}`)
        }

    }
}

function convertirTipo(temp: Resultado): void {
    if(temp.tipo == TipoDato.BOOLEANO) {
        if(temp.valor == true) {
            temp.valor = 1;
        } else {
            temp.valor = 0;
        }
    }
    if(temp.tipo == TipoDato.CHAR) {
        temp.valor = temp.valor.charCodeAt(0);
    }
}

const SUMAS = [
    [TipoDato.NUMBER ,TipoDato.DOUBLE ,TipoDato.NUMBER ,TipoDato.NUMBER ,TipoDato.STRING ],
    [TipoDato.DOUBLE ,TipoDato.DOUBLE ,TipoDato.DOUBLE ,TipoDato.DOUBLE ,TipoDato.STRING ],
    [TipoDato.NUMBER ,TipoDato.DOUBLE ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.STRING ],
    [TipoDato.NUMBER ,TipoDato.DOUBLE ,TipoDato.NULO ,TipoDato.STRING ,TipoDato.STRING ],
    [TipoDato.STRING ,TipoDato.STRING ,TipoDato.STRING ,TipoDato.STRING ,TipoDato.STRING ],
]

const RESTAS = [
    [TipoDato.NUMBER ,TipoDato.DOUBLE ,TipoDato.NUMBER ,TipoDato.NUMBER ,TipoDato.NULO ],
    [TipoDato.DOUBLE ,TipoDato.DOUBLE ,TipoDato.DOUBLE ,TipoDato.DOUBLE ,TipoDato.NULO ],
    [TipoDato.NUMBER ,TipoDato.DOUBLE ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ],
    [TipoDato.NUMBER ,TipoDato.DOUBLE ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ],
    [TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ],
]

const PRODUCTO = [
    [TipoDato.NUMBER ,TipoDato.DOUBLE ,TipoDato.NULO ,TipoDato.NUMBER ,TipoDato.NULO ],
    [TipoDato.DOUBLE ,TipoDato.DOUBLE ,TipoDato.NULO ,TipoDato.DOUBLE ,TipoDato.NULO ],
    [TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ],
    [TipoDato.NUMBER ,TipoDato.DOUBLE ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ],
    [TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ],
]

const DIVISION = [
    [TipoDato.DOUBLE ,TipoDato.DOUBLE ,TipoDato.NULO ,TipoDato.DOUBLE ,TipoDato.NULO ],
    [TipoDato.DOUBLE ,TipoDato.DOUBLE ,TipoDato.NULO ,TipoDato.DOUBLE ,TipoDato.NULO ],
    [TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ],
    [TipoDato.DOUBLE ,TipoDato.DOUBLE ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ],
    [TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ],
]

const MODULO = [
    [TipoDato.DOUBLE ,TipoDato.DOUBLE ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ],
    [TipoDato.DOUBLE ,TipoDato.DOUBLE ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ],
    [TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ],
    [TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ],
    [TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ],
]

const POTENCIA = [
    [TipoDato.NUMBER ,TipoDato.DOUBLE ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ],
    [TipoDato.DOUBLE ,TipoDato.DOUBLE ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ],
    [TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ],
    [TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ],
    [TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ,TipoDato.NULO ],
]
