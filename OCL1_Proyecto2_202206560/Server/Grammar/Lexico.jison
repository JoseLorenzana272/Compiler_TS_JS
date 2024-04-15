%{
    // Importar librerías
    const {Aritmetica} = require("../js/Expresion/Aritmetica");
    const {Relacional} = require("../js/Expresion/Relacionales");
    const {Logico} = require("../js/Expresion/Logicos");
    const {Primitivo} = require("../js/Expresion/Primitivo");
    const {OpAritmetica,OpRelacional,OpLogico,TipoDato} = require("../js/Expresion/Resultado");
    const {Print} = require("../js/instruccion/Print");
    const {Bloque} = require("../js/instruccion/Bloque");
    const {FN_IF} = require("../js/instruccion/Control/IF");
    const {AST} = require("../js/AST");
    const {Ternario} = require("../js/Expresion/Ternario");
    const {ToLower} = require("../js/Expresion/ToLower");
        const {Round} = require("../js/Expresion/Round");
        const {ToUpper} = require("../js/Expresion/ToUpper");
        const {ToString} = require("../js/Expresion/toString");
        const {VarDecla} = require("../js/instruccion/VarDecla");
        const {idValue} = require("../js/Expresion/idValue");
        const {Incremento} = require("../js/instruccion/Incremento");
        const {FN_DO_WHILE} = require("../js/instruccion/Control/DoWhile");
        const {FN_SWITCH} = require("../js/instruccion/Control/Switch");
        const {TypeOf} = require("../js/Expresion/TypeOf");

%}

%lex // Inicia parte léxica

%options case-insensitive

%%

\s+                                 //ignora espacios
//Palabras reservadas
// Comentarios son con //

[0-9]+("."[0-9]+)\b     return 'DOUBLE';
[0-9]+\b                return 'NUMBER';

"EXEC"                  return 'EXEC';
"cout"                 return 'COUT';
"endl"                 return 'ENDL';
"<<"                   return 'CONCATENAR';
"true"                  return 'TRUE';
"false"                 return 'FALSE';
//Instrucciones de control
"if"                    return 'IF';
"else"                  return 'ELSE';
"{"                     return 'LLAVEIZQ';
"}"                     return 'LLAVEDER';
":"                    return 'DOSPUNTOS';


// signos
"("                     return 'PARIZQ';
")"                     return 'PARDER';
// Aritmeticas
"+"                     return 'MAS';
"-"                     return 'RES';
"*"                     return 'MUL';
"/"                     return 'DIV';
"pow"                   return 'POW';
"%"                    return 'MOD';
";"                     return 'PYC';
","                    return 'COMA';
"?"                    return 'TERNARIO';
// Relacionales
"=="                    return 'IGUAL';
"!="                    return 'DISTINTO';
"<="                    return 'MENORIGUAL';
"<"                     return 'MENOR';
">="                    return 'MAYORIGUAL';
">"                     return 'MAYOR';
"="                     return 'ASIGNACION';
//logicos
"&&"                    return 'AND';
"||"                    return 'OR';
"!"                     return 'NOT';
//Variables
"int"                  return 'NUMBER';
"double"               return 'DOUBLE';
"std::string"               return 'STRING';
"bool"              return 'BOOLEAN';
"char"              return 'CHAR';
// pequeñas funciones
"tolower"               return 'TOLOWER';
"toupper"               return 'TOUPPER';
"round"                 return 'ROUND';
"std::toString"         return 'TOSTRING';
"typeof"                return 'TYPEOF';
// Incremento
"++"                    return 'DMAS';
"--"                    return 'DMENOS';
// do while
"do"                    return 'DO';
"while"                 return 'WHILE';
// switch
"switch"                return 'SWITCH';
"case"                  return 'CASE';
"default"               return 'DEFAULT';
// Cadenas             "asdfasdfasf"
\"[^\"]*\"				{ yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
([a-zA-z])[a-zA-Z0-9_]* return 'ID';

<<EOF>>                 return 'EOF';

.					   {    console.log(yylloc.first_line, yylloc.first_column,'Lexico',yytext);    }

// Finaliza parte de Léxica
/lex

// precedencia

%right 'NOT'
%left 'OR'
%left 'AND'
%nonassoc 'TERNARIO'
%left 'IGUAL','DISTINTO','MENOR','MENORIGUAL','MAYOR','MAYORIGUAL'
%left 'MAS', 'RES'
%left 'MUL','DIV'
%left 'MOD', 'POW'

%right 'UMINUS'

// Inicio de gramática
%start ini

// Parte sintáctica  - Definición de la gramática
%%

ini : instrucciones EOF { return new AST($1);}
;

instrucciones: instrucciones instruccion    {  $1.push($2); $$ = $1;}
            | instruccion                   { $$ =  [$1];}
;

instruccion: EXEC expresion PYC         { $$ =  $2;}
            | fn_print PYC               { $$ = $1;}
            | fn_if                     { $$ = $1;}
            | dec_var PYC                { $$ = $1;}
            | set_var PYC                { $$ = $1;}
            | incremento PYC             { $$ = $1;}
            | fn_dowhile PYC            { $$ = $1;}
            | fn_switch PYC            { $$ = $1;}
;

fn_dowhile
        : DO bloque WHILE PARIZQ expresion PARDER { $$ = new FN_DO_WHILE($5,$2,@1.first_line,@1.first_column);}
; 

dec_var: tipo lista_id var_assig {$$ = new VarDecla($2,$1,$3, @1.first_line,@1.first_column);}
;

lista_id: lista_id COMA ID { $1.push($3); $$ = $1;}
        | ID { $$ = [$1];}
;

var_assig : ASIGNACION expresion { $$ = $2;}
        | { $$ = null;}
;

set_var: ID ASIGNACION expresion { $$ = new SetVar($1,$3,@1.first_line,@1.first_column);}
;

// Para sitetisar un dato, se utiliza $$
expresion: RES expresion %prec UMINUS   { $$ = new Aritmetica(new Primitivo(@1.first_line,@1.first_column,0),$2,OpAritmetica.RESTA,@1.first_line,@1.first_column);} 
        | expresion MAS expresion      { $$ = new Aritmetica($1,$3,OpAritmetica.SUMA,@1.first_line,@1.first_column);}
        | expresion RES expresion       { $$ = new Aritmetica($1,$3,OpAritmetica.RESTA,@1.first_line,@1.first_column);}
        | expresion MUL expresion       { $$ =  new Aritmetica($1,$3,OpAritmetica.PRODUCTO,@1.first_line,@1.first_column);}
        | expresion DIV expresion       { $$ =  new Aritmetica($1,$3,OpAritmetica.DIVISION,@1.first_line,@1.first_column);}
        | expresion MOD expresion       { $$ =  new Aritmetica($1,$3,OpAritmetica.MODULO,@1.first_line,@1.first_column);}
        | POW PARIZQ expresion COMA expresion PARDER { $$ =  new Aritmetica($3,$5,OpAritmetica.POTENCIA,@1.first_line,@1.first_column);}
        | expresion TERNARIO expresion DOSPUNTOS expresion { $$ = new Ternario($1,$3,$5,@1.first_line,@1.first_column);}
        | relacionales                   { $$ = $1;}
        | logicos                   { $$ = $1;}
        | NUMBER                        { $$ = new Primitivo($1,TipoDato.NUMBER,@1.first_line,@1.first_column); }
        | DOUBLE                        { $$ =  new Primitivo($1,TipoDato.DOUBLE,@1.first_line,@1.first_column); }
        | TRUE                        { $$ =  new Primitivo($1,TipoDato.BOOLEANO,@1.first_line,@1.first_column); }
        | FALSE                        { $$ =  new Primitivo($1,TipoDato.BOOLEANO,@1.first_line,@1.first_column); }
        | CADENA                        { $$ =  new Primitivo($1,TipoDato.STRING,@1.first_line,@1.first_column); }
        | PARIZQ expresion PARDER        { $$ = $2;}
        | TOLOWER PARIZQ expresion PARDER { $$ = new ToLower($3,@1.first_line,@1.first_column); }
        | TOUPPER PARIZQ expresion PARDER { $$ = new ToUpper($3,@1.first_line,@1.first_column); }
        | ROUND PARIZQ expresion PARDER { $$ = new Round($3,@1.first_line,@1.first_column); }
        | TOSTRING PARIZQ expresion PARDER { $$ = new ToString($3,@1.first_line,@1.first_column); }
        | ID                            { $$ = new idValue($1, @1.first_line,@1.first_column); }
        | TYPEOF PARIZQ expresion PARDER { $$ = new TypeOf($3,@1.first_line,@1.first_column); }
        
;

relacionales
        : expresion IGUAL expresion       { $$ =  new Relacional($1,$3,OpRelacional.IGUAL,@1.first_line,@1.first_column);}
        | expresion DISTINTO expresion    { $$ =  new Relacional($1,$3,OpRelacional.DISTINTO,@1.first_line,@1.first_column);}
        | expresion MENOR expresion       { $$ =  new Relacional($1,$3,OpRelacional.MENOR,@1.first_line,@1.first_column);}
        | expresion MENORIGUAL expresion  { $$ =  new Relacional($1,$3,OpRelacional.MENORIGUAL,@1.first_line,@1.first_column);}
        | expresion MAYOR expresion       { $$ =  new Relacional($1,$3,OpRelacional.MAYOR,@1.first_line,@1.first_column);}
        | expresion MAYORIGUAL expresion  { $$ =  new Relacional($1,$3,OpRelacional.MAYORIGUAL,@1.first_line,@1.first_column);}
;

logicos
        : expresion AND expresion       { $$ =  new Logico($1,$3,OpLogico.AND,@1.first_line,@1.first_column);}
        | expresion OR  expresion       { $$ =  new Logico($1,$3,OpLogico.OR,@1.first_line,@1.first_column);}
        | NOT expresion                 { $$ =  new Logico(null,$2,OpLogico.NOT,@1.first_line,@1.first_column);}
;

incremento: ID MAS MAS {$$ = new Incremento($1,true,@1.first_line,@1.first_column);}
        | ID RES RES {$$ = new Incremento($1,false,@1.first_line,@1.first_column);}
;

fn_print: COUT CONCATENAR expresion { $$ = new Print($3,false,@1.first_line,@1.first_column)}
        | COUT CONCATENAR expresion CONCATENAR ENDL { $$ = new Print($3,true,@1.first_line,@1.first_column)}
;
// Bloque de instrucciones
bloque
        : LLAVEIZQ instrucciones LLAVEDER      { $$= new Bloque($2);}
        | LLAVEIZQ  LLAVEDER                    { $$ = new Bloque([]) }
;
// Sentencia de control
fn_if
        : IF PARIZQ expresion PARDER bloque     { $$ = new FN_IF($3,$5,null,@1.first_line,@1.first_column);}
        | IF PARIZQ expresion PARDER bloque ELSE bloque     { $$ = new FN_IF($3,$5,$7,@1.first_line,@1.first_column);}
        | IF PARIZQ expresion PARDER bloque ELSE fn_if     { $$ = new FN_IF($3,$5,$7,@1.first_line,@1.first_column);}
;

fn_switch
        : SWITCH PARIZQ expresion PARDER LLAVEIZQ cases LLAVEDER { $$ = new FN_SWITCH($3,$6,@1.first_line,@1.first_column);}
        | SWITCH PARIZQ expresion PARDER LLAVEIZQ cases default_div LLAVEDER { $$ = new FN_SWITCH($3,$6,$7,@1.first_line,@1.first_column);}
;

cases
        : cases case_div { $1.push($2); $$ = $1;}
        | case_div { $$ = [$1];}
;

case_div
        : CASE expresion DOSPUNTOS instrucciones { $$ = {case: $2, instrucciones: $4};}
;

default_div
        : DEFAULT DOSPUNTOS instrucciones { $$ = {case: "default", instrucciones: $3};}
;

tipo
        : NUMBER { $$ = TipoDato.NUMBER;}
        | DOUBLE { $$ = TipoDato.DOUBLE;}
        | STRING { $$ = TipoDato.STRING;}
        | BOOLEAN { $$ = TipoDato.BOOLEANO;}
        | CHAR { $$ = TipoDato.CHAR;}
;
