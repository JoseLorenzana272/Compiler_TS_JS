"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SWITCH = void 0;
const Instruccion_1 = require("../Instruccion");
class FN_SWITCH extends Instruccion_1.Instruccion {
    constructor(condicion, casos, casoDefault, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.casos = casos;
    }
    interpretar(environment_name, consola) {
        const condicion = this.condicion.interpretar(environment_name);
        let continuar_default = true;
        for (let i = 0; i < this.casos.length; i++) {
            const caso = this.casos[i];
            const condicion_case = caso.getCondicion(environment_name).valor;
            if (condicion_case == condicion.valor) {
                let escape = caso.interpretar(environment_name, consola);
                if (escape == "break") {
                    continuar_default = false;
                    break;
                }
            }
        }
        if (continuar_default) {
            this.casos.forEach(caso => {
                if (caso.getCondicion(environment_name).valor == null) {
                    caso.interpretar(environment_name, consola);
                }
            });
        }
    }
}
exports.FN_SWITCH = FN_SWITCH;
