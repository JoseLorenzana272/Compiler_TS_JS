import { Expresion } from "../../Expresion/Expresion";
import { Bloque } from "../Bloque";
import { Instruccion } from "../Instruccion";
import { Environment } from "../../Symbol/Environment";
import { FN_CASE } from "./case";

export class FN_SWITCH extends Instruccion{
    private condicion: Expresion
    private casos: FN_CASE[]

    constructor(condicion:Expresion,casos:FN_CASE[],casoDefault:Bloque,linea:number,columna:number){
        super(linea,columna)
        this.condicion = condicion
        this.casos = casos
    }

    public interpretar(environment_name: Environment, consola: string[]): any {
        const condicion = this.condicion.interpretar(environment_name)
        let continuar_default = true
        for (let i = 0; i < this.casos.length; i++) {
            const caso = this.casos[i];
            const condicion_case = caso.getCondicion(environment_name).valor
            if (condicion_case == condicion.valor) {
                let escape = caso.interpretar(environment_name, consola)
                if (escape == "break") {
                    continuar_default = false
                    break
                }
            }
        }
        if (continuar_default){
            this.casos.forEach(caso => {
                if (caso.getCondicion(environment_name).valor == null) {
                    caso.interpretar(environment_name, consola)
                }
            });
        }
    }

}
