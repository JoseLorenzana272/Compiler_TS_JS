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
    saveVar(id, value, type) {
        let env = this;
        if (env.variables.has(id)) {
            env.variables.set(id, new Symbol_1.Symbol(id, type, value));
            return;
        }
        this.variables.set(id, new Symbol_1.Symbol(id, type, value));
    }
    editVar(id, value, type) {
        let env = this;
        while (env != null) {
            if (env.variables.has(id)) {
                env.variables.set(id, new Symbol_1.Symbol(id, type, value));
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
}
exports.Environment = Environment;
