

export type Resultado = {
    valor: any,
    tipo: TipoDato
}

export enum TipoDato{
    NUMBER = 0,
    DOUBLE = 1,
    BOOLEANO = 2,
    CHAR = 3,
    STRING = 4,
    NULO,
}

export enum OpAritmetica{
    SUMA, RESTA, PRODUCTO,DIVISION, MODULO, POTENCIA, UMINUS
}

export enum OpRelacional{
    IGUAL,DISTINTO,MENOR,MENORIGUAL,MAYOR,MAYORIGUAL
}

export enum OpLogico{
    AND,OR,NOT
}

export enum OpTernario{
    TERNARIO
}

export function getArithmeticOpName(value: OpAritmetica): string {
    return OpAritmetica[value];
}

export function getRelationalOpName(value: OpRelacional): string {
    return OpRelacional[value];
}

export function getLogicalOpName(value: OpLogico): string {
    return OpLogico[value];
}