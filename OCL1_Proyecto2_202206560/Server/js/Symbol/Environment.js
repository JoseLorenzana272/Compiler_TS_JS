"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
const Symbol_1 = require("../Symbol/Symbol");
class Environment {
    constructor(previous) {
        this.previous = previous;
        this.variables = new Map();
        this.functions = new Map();
    }
    saveVar(id, value, type, line, column) {
        let env = this;
        if (env.variables.has(id)) {
            this.editVar(id, value, type, line, column);
        }
        this.variables.set(id, new Symbol_1.Symbol(id, type, value, line, column));
    }
    editVar(id, value, type, line, column) {
        let env = this;
        while (env != null) {
            if (env.variables.has(id)) {
                env.variables.set(id, new Symbol_1.Symbol(id, type, value, line, column));
                return;
            }
            env = env.previous;
        }
        throw new Error(`Variable ${id} no encontrada`);
    }
    getVar(id) {
        let env = this;
        while (env != null) {
            if (env.variables.has(id)) {
                return env.variables.get(id);
            }
            env = env.previous;
        }
        return null;
    }
    // Para funciones
    getFunction(id) {
        let env = this;
        while (env != null) {
            if (env.functions.has(id)) {
                return env.functions.get(id);
            }
            env = env.previous;
        }
        return undefined;
    }
    saveFunction(id, func) {
        this.functions.set(id, func);
    }
    getGlobal() {
        let env = this;
        while ((env === null || env === void 0 ? void 0 : env.previous) != null) {
            env = env.previous;
        }
        return env;
    }
}
exports.Environment = Environment;
