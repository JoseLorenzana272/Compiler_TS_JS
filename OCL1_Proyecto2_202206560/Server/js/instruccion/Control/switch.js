"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SWITCH = void 0;
const Instruccion_1 = require("../Instruccion");
class FN_SWITCH extends Instruccion_1.Instruccion {
    constructor(condicion, casos, casoDefault, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.casos = casos;
        this.casoDefault = casoDefault;
    }
    interpretar(environment_name, consola) {
        const condicion = this.condicion.interpretar(environment_name);
        let bandera = false;
        console.log("condicion", condicion);
        console.log("casos", this.casos);
        for (let i = 0; i < this.casos.length; i++) {
            const caso = this.casos[i];
            console.log("casooooooo", caso.interpretar);
            if (condicion.valor == caso) {
                bandera = true;
                caso.interpretar(environment_name, consola);
                break;
            }
        }
        if (!bandera && this.casoDefault != null) {
            console.log("default", this.casoDefault.instrucciones);
            this.casoDefault.instrucciones.forEach(instruccion => {
                instruccion.interpretar(environment_name, consola);
            });
        }
        return null;
    }
}
exports.FN_SWITCH = FN_SWITCH;
