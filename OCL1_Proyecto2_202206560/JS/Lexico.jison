%{
var cadena = '';
var errores = [];
const SymbolTable = require('./Expresiones/SymbolTable');
var symbolTable = new SymbolTable();

%}



%lex

%options case-insensitive
%x string
%x char

%%
\s+              //espacios en blanco
"//".*                              {} 
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] {}
";"                      return 'ptcoma'
//Aritmeticas
"*"                      return 'multi'
"/"                      return 'div'
"-"                      return 'menos'
"+"                      return 'suma'
"pow"                   return 'potencia'
"%"                     return 'modulo'
"("                      return 'parbre'
")"                      return 'parcierra'
","                      return 'coma'
"_"                    return 'negativo'
//Relacionales
"=="                     return 'igual'
"!="                     return 'noigual'
"<"                      return 'menor'
"<="                     return 'menorigual'
">"                      return 'mayor'
">="                     return 'mayorigual'
"="                     return 'asignacion'
//Operadores logicos
"&&"                     return 'and'
"||"                     return 'or'
"!"                      return 'not'
//Declaración de variables
'int'                    return 'int'
'std::string'            return 'std'
'string'                 return 'string'
'char'                   return 'char_v'
'bool'                   return 'bool'
'double'                 return 'double_var'
'true'                  return 'true'
'false'                 return 'false'

([a-zA-Z])([a-zA-Z0-9])* return 'id'
[0-9]+("."[0-9]+)+\b     return 'double'
[0-9]+                   return 'entero'
[a-zA-Z]+             return 'char'

["]                      { cadena = ''; this.begin("string"); }
<string>[^"\\]+          { cadena += yytext; }
<string>"\\\""           { cadena += "\""; }
<string>"\\n"            { cadena += "\n"; }
<string>\s               { cadena += " "; }
<string>"\\t"            { cadena += "\t";}
<string>"\\\\"           { cadena += "\\"; }
<string>"\\\'"           { cadena += "\'"; }
<string>"\\r"            { cadena += "\r"; }
<string>["]              { yytext = cadena; this.popState(); return 'cadena' }

[']                     { cadena = ''; this.begin("char"); }
<char>[^'\\]            { cadena = yytext; }
<char>"\\'"             { cadena += "'"; }
<char>[']             { yytext = cadena; this.popState(); return 'char' }


<<EOF>>                  return 'EOF'
.                        { errores.push({tipo: "Lexico", error: yytext, linea: yylloc.first_line, columna: yylloc.first_column+1}); return 'INVALID'; }

/lex

%{
function newValue(value, type, row, column){
    let value_new = {
        value: value,
        type: type,
        row: row,
        column: column
    }
    return value_new;
}

function bynaricOperation(izq, der, type, row, column){
    let value = {
        izq: izq,
        der: der,
        type: type,
        row: row,
        column: column
    }
    return value;
}

function declararVariable(tipo, ids, valor) {

        this.tipo =  tipo;
        this.ids =  ids;
        this.valor = valor;
    
}
%}

//precedencias
%left 'or'
%left 'and'
%right 'not'
%left 'igual', 'noigual', 'menor', 'menorigual', 'mayor', 'mayorigual'
%left 'suma', 'menos'
%left 'multi', 'div', 'modulo'
%left 'potencia'
%right 'negativo'
%left 'parbre'


%start ini

%%

ini: ENTRADA EOF { retorno = {instrucciones: $1, errores: errores}; errores = []; return retorno; }
| error EOF { retorno = {instrucciones: [], errores: [{tipo: "Sintactico", error: "Declaracion de instruccion no valida", linea: this._$.first_line, columna: this._$.first_column+1}]}; return retorno; }
;
ENTRADA: ENTRADA INSTRUCCION { $1.push($2); $$ = $1; }
| INSTRUCCION { $$ = [$1]; }
;

INSTRUCCION: EXPRESION { $$ = $1; }
| DECLARACION_VAR ptcoma { $$ = $1; }
| error ptcoma { $$ = ""; errores.push({tipo: "Sintactico", error: "Declaracion de instruccion no valida", linea: this._$.first_line, columna: this._$.first_column+1}); }
;

// Declaracion de variables
DECLARACION_VAR: TIPO_DATO ID_VAR_LISTA {console.log($2); 
let ts = [];
for (const i of $2) {
    symbolTable.addSymbol($1, i, $3, this._$.first_line, this._$.first_column);
} 
}
| TIPO_DATO ID_VAR_LISTA asignacion EXPRESION { console.log($2); symbolTable.addSymbol($4.type, $2, $4.value, this._$.first_line, this._$.first_column) }
;

ID_VAR_LISTA: ID_VAR_LISTA coma id  { let ids = $1; ids.push($3); $$ = ids; console.log(ids); }
    | id { $$ = [$1]; }
;

TIPO_DATO:
    int
    | std 
    | string
    | char_v
    | bool
    | double_var
;


EXPRESION: EXPRESION suma EXPRESION { $$ = bynaricOperation($1, $3, 'suma', this._$.first_line, this._$.first_column); }
| EXPRESION menos EXPRESION { $$ = bynaricOperation($1, $3, 'resta', this._$.first_line, this._$.first_column); }
| EXPRESION multi EXPRESION { $$ = bynaricOperation($1, $3, 'multiplicacion', this._$.first_line, this._$.first_column); }
| EXPRESION div EXPRESION { $$ = bynaricOperation($1, $3, 'division', this._$.first_line, this._$.first_column); }
| EXPRESION modulo EXPRESION { $$ = bynaricOperation($1, $3, 'modulo', this._$.first_line, this._$.first_column); }
| potencia parbre EXPRESION coma EXPRESION parcierra { $$ = bynaricOperation($3, $5, 'potencia', this._$.first_line, this._$.first_column); }
| EXPRESION igual EXPRESION { $$ = bynaricOperation($1, $3, 'igual', this._$.first_line, this._$.first_column); }
| EXPRESION noigual EXPRESION { $$ = bynaricOperation($1, $3, 'noigual', this._$.first_line, this._$.first_column); }
| EXPRESION menor EXPRESION { $$ = bynaricOperation($1, $3, 'menor', this._$.first_line, this._$.first_column); }
| EXPRESION menor asignacion EXPRESION { $$ = bynaricOperation($1, $4, 'menorigual', this._$.first_line, this._$.first_column); }
| EXPRESION mayor EXPRESION { $$ = bynaricOperation($1, $3, 'mayor', this._$.first_line, this._$.first_column); }
| EXPRESION mayor asignacion EXPRESION { $$ = bynaricOperation($1, $4, 'mayorigual', this._$.first_line, this._$.first_column); }
| EXPRESION and EXPRESION { $$ = bynaricOperation($1, $3, 'and', this._$.first_line, this._$.first_column); }
| EXPRESION or EXPRESION { $$ = bynaricOperation($1, $3, 'or', this._$.first_line, this._$.first_column); }
| not EXPRESION { $$ = bynaricOperation($2, null, 'not', this._$.first_line, this._$.first_column); }
| negativo EXPRESION { $$ = bynaricOperation($2, null, 'negativo', this._$.first_line, this._$.first_column); }
| parbre EXPRESION parcierra { $$ = $2; }
| entero { $$ = newValue($1, 'entero', this._$.first_line, this._$.first_column); }
| double { $$ = newValue($1, 'Double', this._$.first_line, this._$.first_column); }
| cadena { $$ = newValue($1, 'Cadena', this._$.first_line, this._$.first_column); }
| id { var symbol = symbolTable.searchSymbol($1); console.log(symbol) ;$$ = newValue(symbol.value, symbol.type, this._$.first_line, this._$.first_column); }
| true { $$ = newValue(true, 'Boolean', this._$.first_line, this._$.first_column); }
| false { $$ = newValue(false, 'Boolean', this._$.first_line, this._$.first_column); }
| char { $$ = newValue($1, 'Char', this._$.first_line, this._$.first_column); }
;