
import { Expresion } from "./Expresion";
import { OpLogico, Resultado, TipoDato } from "./Resultado";
import { Environment } from "../Symbol/Environment";

export class Logico extends Expresion{
    
    public exp1:Expresion;
    public exp2:Expresion;
    public Operacion: OpLogico;
    // En jison deben agregar las 2 expresiones, el tipo de expresión
    // Ustedes saben eso a través de su gramática
    constructor(e1:Expresion,e2:Expresion,op:OpLogico,linea:number,columna:number){
        super(linea,columna)
        this.Operacion = op;
        this.exp1 = e1;
        this.exp2 = e2
    }

    public interpretar(environment_name: Environment): Resultado {

        // LO MIO
        const resultado1 = this.exp1.interpretar(environment_name);
        const resultado2 = this.exp2.interpretar(environment_name);

        switch (this.Operacion){
            case OpLogico.AND:
                if(resultado1.tipo==TipoDato.BOOLEANO && resultado2.tipo==TipoDato.BOOLEANO){
                    return {valor: resultado1.valor && resultado2.valor, tipo:TipoDato.BOOLEANO}
                }
                break;
            case OpLogico.OR:
                if(resultado1.tipo==TipoDato.BOOLEANO && resultado2.tipo==TipoDato.BOOLEANO){
                    return {valor: resultado1.valor || resultado2.valor, tipo:TipoDato.BOOLEANO}
                }
                break;
            case OpLogico.NOT:
                if(resultado1.tipo==TipoDato.BOOLEANO){
                    return {valor: !resultado1.valor, tipo:TipoDato.BOOLEANO}
                }
                break;
            default:
                throw new Error("Error en la operación lógica")
       }
       return {valor:null,tipo:TipoDato.NULO}

    }

}
