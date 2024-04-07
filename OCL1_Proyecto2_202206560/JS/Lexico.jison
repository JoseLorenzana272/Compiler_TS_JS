%{
var cadena = '';
var errores = [];
%}



%lex

%options case-insensitive
%x string

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
"("                      return 'parbre'
")"                      return 'parcierra'
//Relacionales
"=="                     return 'igual'
"!="                     return 'noigual'
"<"                      return 'menor'
"<="                     return 'menorigual'
">"                      return 'mayor'
">="                     return 'mayorigual'
"="                     return 'asignacion'


([a-zA-Z])([a-zA-Z0-9])* return 'id'
[0-9]+("."[0-9]+)+\b     return 'double'
[0-9]+                   return 'entero'

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
%}

//precedencias
%left 'suma', 'menos'
%left 'multi', 'div'
%left 'parbre'
%left 'igual', 'noigual', 'menor', 'menorigual', 'mayor', 'mayorigual'

%start ini

%%

ini: ENTRADA EOF { retorno = {instrucciones: $1, errores: errores}; errores = []; return retorno; }
| error EOF { retorno = {instrucciones: [], errores: [{tipo: "Sintactico", error: "Declaracion de instruccion no valida", linea: this._$.first_line, columna: this._$.first_column+1}]}; return retorno; }
;
ENTRADA: ENTRADA INSTRUCCION { $1.push($2); $$ = $1; }
| INSTRUCCION { $$ = [$1]; }
;

INSTRUCCION: EXPRESION { $$ = $1; }
| error ptcoma { $$ = ""; errores.push({tipo: "Sintactico", error: "Declaracion de instruccion no valida", linea: this._$.first_line, columna: this._$.first_column+1}); }
;

EXPRESION: EXPRESION suma EXPRESION { $$ = bynaricOperation($1, $3, 'suma', this._$.first_line, this._$.first_column); }
| EXPRESION menos EXPRESION { $$ = bynaricOperation($1, $3, 'resta', this._$.first_line, this._$.first_column); }
| EXPRESION multi EXPRESION { $$ = bynaricOperation($1, $3, 'multiplicacion', this._$.first_line, this._$.first_column); }
| EXPRESION div EXPRESION { $$ = bynaricOperation($1, $3, 'division', this._$.first_line, this._$.first_column); }
| EXPRESION igual EXPRESION { $$ = bynaricOperation($1, $3, 'igual', this._$.first_line, this._$.first_column); }
| EXPRESION noigual EXPRESION { $$ = bynaricOperation($1, $3, 'noigual', this._$.first_line, this._$.first_column); }
| EXPRESION menor EXPRESION { $$ = bynaricOperation($1, $3, 'menor', this._$.first_line, this._$.first_column); }
| EXPRESION menor asignacion EXPRESION { $$ = bynaricOperation($1, $4, 'menorigual', this._$.first_line, this._$.first_column); }
| EXPRESION mayor EXPRESION { $$ = bynaricOperation($1, $3, 'mayor', this._$.first_line, this._$.first_column); }
| EXPRESION mayor asignacion EXPRESION { $$ = bynaricOperation($1, $4, 'mayorigual', this._$.first_line, this._$.first_column); }
| parbre EXPRESION parcierra { $$ = $2; }
| entero { $$ = newValue($1, 'entero', this._$.first_line, this._$.first_column); }
| double { $$ = newValue($1, 'Double', this._$.first_line, this._$.first_column); }
| cadena { $$ = newValue($1, 'Cadena', this._$.first_line, this._$.first_column); }
;