"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogicalOpName = exports.getRelationalOpName = exports.getArithmeticOpName = exports.OpTernario = exports.OpLogico = exports.OpRelacional = exports.OpAritmetica = exports.TipoDato = void 0;
var TipoDato;
(function (TipoDato) {
    TipoDato[TipoDato["NUMBER"] = 0] = "NUMBER";
    TipoDato[TipoDato["DOUBLE"] = 1] = "DOUBLE";
    TipoDato[TipoDato["BOOLEANO"] = 2] = "BOOLEANO";
    TipoDato[TipoDato["CHAR"] = 3] = "CHAR";
    TipoDato[TipoDato["STRING"] = 4] = "STRING";
    TipoDato[TipoDato["NULO"] = 5] = "NULO";
})(TipoDato || (exports.TipoDato = TipoDato = {}));
var OpAritmetica;
(function (OpAritmetica) {
    OpAritmetica[OpAritmetica["SUMA"] = 0] = "SUMA";
    OpAritmetica[OpAritmetica["RESTA"] = 1] = "RESTA";
    OpAritmetica[OpAritmetica["PRODUCTO"] = 2] = "PRODUCTO";
    OpAritmetica[OpAritmetica["DIVISION"] = 3] = "DIVISION";
    OpAritmetica[OpAritmetica["MODULO"] = 4] = "MODULO";
    OpAritmetica[OpAritmetica["POTENCIA"] = 5] = "POTENCIA";
    OpAritmetica[OpAritmetica["UMINUS"] = 6] = "UMINUS";
})(OpAritmetica || (exports.OpAritmetica = OpAritmetica = {}));
var OpRelacional;
(function (OpRelacional) {
    OpRelacional[OpRelacional["IGUAL"] = 0] = "IGUAL";
    OpRelacional[OpRelacional["DISTINTO"] = 1] = "DISTINTO";
    OpRelacional[OpRelacional["MENOR"] = 2] = "MENOR";
    OpRelacional[OpRelacional["MENORIGUAL"] = 3] = "MENORIGUAL";
    OpRelacional[OpRelacional["MAYOR"] = 4] = "MAYOR";
    OpRelacional[OpRelacional["MAYORIGUAL"] = 5] = "MAYORIGUAL";
})(OpRelacional || (exports.OpRelacional = OpRelacional = {}));
var OpLogico;
(function (OpLogico) {
    OpLogico[OpLogico["AND"] = 0] = "AND";
    OpLogico[OpLogico["OR"] = 1] = "OR";
    OpLogico[OpLogico["NOT"] = 2] = "NOT";
})(OpLogico || (exports.OpLogico = OpLogico = {}));
var OpTernario;
(function (OpTernario) {
    OpTernario[OpTernario["TERNARIO"] = 0] = "TERNARIO";
})(OpTernario || (exports.OpTernario = OpTernario = {}));
function getArithmeticOpName(value) {
    return OpAritmetica[value];
}
exports.getArithmeticOpName = getArithmeticOpName;
function getRelationalOpName(value) {
    return OpRelacional[value];
}
exports.getRelationalOpName = getRelationalOpName;
function getLogicalOpName(value) {
    return OpLogico[value];
}
exports.getLogicalOpName = getLogicalOpName;
