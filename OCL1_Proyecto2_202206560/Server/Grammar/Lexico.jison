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
        const {FN_CASE} = require("../js/instruccion/Control/Case");
        const {Break} = require("../js/instruccion/Break");
        const {SetVar} = require("../js/instruccion/SetVar");
        const {FN_FOR} = require("../js/instruccion/Control/For");
        const {FN_WHILE} = require("../js/instruccion/Control/While");
        const {Continue} = require("../js/instruccion/Continue");
        const {Return} = require("../js/instruccion/Return");
        const {Function} = require("../js/instruccion/Function");
        const {CallVoid} = require("../js/instruccion/CallVoid");
        const {CallReturn} = require("../js/Expresion/CallReturn");
        const {Casteo} = require("../js/Expresion/casteos");

%}

%lex // Inicia parte léxica

%options case-insensitive
%x character

%%

\s+                                 //ignora espacios
//Palabras reservadas
"//".*		{   }
//[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] {   }

[0-9]+("."[0-9]+)\b     return 'DOUBLE_A';
[0-9]+\b                return 'NUMBER_A';
"void"                 return 'VOID';
"EXEC"                  return 'EXEC';
"cout"                 return 'COUT';
"endl"                 return 'ENDL';
"<<"                   return 'CONCATENAR';
"true"                  return 'TRUE';
"false"                 return 'FALSE';
"new"                   return 'NEW';
//Instrucciones de control
"if"                    return 'IF';
"else"                  return 'ELSE';
"{"                     return 'LLAVEIZQ';
"}"                     return 'LLAVEDER';
":"                    return 'DOSPUNTOS';


// signos
"("                     return 'PARIZQ';
")"                     return 'PARDER';
"["                     return 'CORCHIZQ';
"]"                     return 'CORCHDER';
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
"break"                 return 'BREAK';
"continue"             return 'CONTINUE';
"return"                return 'RETURN';
// for
"for"                   return 'FOR';
// Cadenas             "asdfasdfasf"
\"[^\"]*\"				{ yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
[']                            { this.begin("character"); }
<character>\\x[0-9a-fA-F]{2}   { return 'CARACTER';}
<character>[^\\\']             { return 'CARACTER'; }
<character>\'                  { this.popState(); }
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
%right cast


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
            | fn_switch           { $$ = $1;}
                | fn_for         { $$ = $1;}
                | break_instruccion { $$ = $1; }
                | fn_while { $$ = $1; }
                | continue_instruccion { $$ = $1; }
                | return_instruccion { $$ = $1; }
                | funcion { $$ = $1; }
                | call_funcion { $$ = $1; }
;

break_instruccion: BREAK PYC { $$ = new Break(@1.first_line,@1.first_column); }
;

continue_instruccion: CONTINUE PYC { $$ = new Continue(@1.first_line,@1.first_column); }
;

return_instruccion: RETURN expresion PYC { $$ = new Return($2,@1.first_line,@1.first_column); }
;

fn_dowhile
        : DO bloque WHILE PARIZQ expresion PARDER { $$ = new FN_DO_WHILE($5,$2,@1.first_line,@1.first_column);}
; 

dec_var: tipo lista_id var_assig {$$ = new VarDecla($2,$1,$3, @1.first_line,@1.first_column);}
        | tipo ID CORCHIZQ CORCHDER ASIGNACION NEW tipo CORCHIZQ expresion CORCHDER { $$ = new DeclaraArreglo($2, $1, $9, @1.first_line, @1.first_column); }
       | tipo ID CORCHIZQ CORCHDER ASIGNACION CORCHIZQ list_expresion CORCHDER { $$ = new DeclaraArregloLiteral($2, $1, $7, @1.first_line, @1.first_column); }
;

lista_id: lista_id COMA ID { $1.push($3); $$ = $1;}
        | ID { $$ = [$1];}
;

var_assig : ASIGNACION expresion { $$ = $2;}
        | ASIGNACION NEW tipo CORCHIZQ expresion CORCHDER { $$ = new CrearArreglo($3, $5, @1.first_line, @1.first_column); }
        | ASIGNACION CORCHIZQ list_expresion CORCHDER { $$ = new CrearArregloLiteral($3, @1.first_line, @1.first_column); }
        | { $$ = null;}
;

set_var: ID ASIGNACION expresion { $$ = new SetVar($1,$3,@1.first_line,@1.first_column);}
;

// Para sitetisar un dato, se utiliza $$
expresion: RES expresion %prec UMINUS   { $$ = new Aritmetica($2,$2,OpAritmetica.UMINUS,@1.first_line,@1.first_column);} 
        | expresion MAS expresion      { $$ = new Aritmetica($1,$3,OpAritmetica.SUMA,@1.first_line,@1.first_column);}
        | expresion RES expresion       { $$ = new Aritmetica($1,$3,OpAritmetica.RESTA,@1.first_line,@1.first_column);}
        | expresion MUL expresion       { $$ =  new Aritmetica($1,$3,OpAritmetica.PRODUCTO,@1.first_line,@1.first_column);}
        | expresion DIV expresion       { $$ =  new Aritmetica($1,$3,OpAritmetica.DIVISION,@1.first_line,@1.first_column);}
        | expresion MOD expresion       { $$ =  new Aritmetica($1,$3,OpAritmetica.MODULO,@1.first_line,@1.first_column);}
        | POW PARIZQ expresion COMA expresion PARDER { $$ =  new Aritmetica($3,$5,OpAritmetica.POTENCIA,@1.first_line,@1.first_column);}
        | expresion TERNARIO expresion DOSPUNTOS expresion { $$ = new Ternario($1,$3,$5,@1.first_line,@1.first_column);}
        | relacionales                   { $$ = $1;}
        | logicos                   { $$ = $1;}
        | NUMBER_A                        { $$ = new Primitivo($1,TipoDato.NUMBER,@1.first_line,@1.first_column); }
        | DOUBLE_A                        { $$ =  new Primitivo($1,TipoDato.DOUBLE,@1.first_line,@1.first_column); }
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
        | CARACTER { $$ = new Primitivo($1,TipoDato.CHAR,@1.first_line,@1.first_column); }
        | ID PARIZQ list_expresion PARDER { $$ = new CallReturn($1,$3,@1.first_line,@1.first_column); }
        | ID PARIZQ PARDER { $$ = new CallReturn($1,null,@1.first_line,@1.first_column); }
        | PARIZQ tipo PARDER expresion %prec cast { $$ = new Casteo($4,$2,@1.first_line,@1.first_column); }
        
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
;

cases
        : cases case_div { $1.push($2); $$ = $1;}
        | case_div { $$ = [$1];}
;

case_div
        : CASE expresion DOSPUNTOS instrucciones { $$ = new FN_CASE($2, $4, @1.first_line,@1.first_column);}
        | DEFAULT DOSPUNTOS instrucciones { $$ = new FN_CASE(null, $3, @1.first_line,@1.first_column);}
;

fn_for: FOR PARIZQ dec_for PYC expresion PYC actualizacion_for PARDER bloque { $$ = new FN_FOR($3,$5,$7,$9,@1.first_line,@1.first_column);}
;

dec_for: tipo ID ASIGNACION expresion { $$ = new VarDecla([$2],$1,$4,@1.first_line,@1.first_column);}
        | ID ASIGNACION expresion { $$ = new SetVar($1,$3,@1.first_line,@1.first_column);}
;

actualizacion_for: ID MAS MAS { $$ = new Incremento($1,true,@1.first_line,@1.first_column);}
        | ID RES RES { $$ = new Incremento($1,false,@1.first_line,@1.first_column);}
        | ID ASIGNACION expresion { $$ = new SetVar($1,$3,@1.first_line,@1.first_column);}
;

fn_while: WHILE PARIZQ expresion PARDER bloque { $$ = new FN_WHILE($3,$5,@1.first_line,@1.first_column);}
;

funcion : tipo ID PARIZQ parametros PARDER bloque { $$ = new Function($2, $6, $4, @1.first_line,@1.first_column);}
        | tipo ID PARIZQ PARDER bloque { $$ = new Function($2, $5, [], @1.first_line,@1.first_column);}
;

parametros: parametros COMA parametro { $1.push($3); $$ = $1;}
        | parametro { $$ = [$1];}
;

parametro: tipo ID { $$ = $2; }
;

call_funcion: ID PARIZQ list_expresion PARDER PYC { $$ = new CallVoid($1,$3,@1.first_line,@1.first_column); }
        | ID PARIZQ PARDER PYC { $$ = new CallVoid($1,null,@1.first_line,@1.first_column); }
;

list_expresion: list_expresion COMA expresion { $1.push($3); $$ = $1;}
        | expresion { $$ = [$1];}
;

tipo
        : NUMBER { $$ = TipoDato.NUMBER;}
        | DOUBLE { $$ = TipoDato.DOUBLE;}
        | STRING { $$ = TipoDato.STRING;}
        | BOOLEAN { $$ = TipoDato.BOOLEANO;}
        | CHAR { $$ = TipoDato.CHAR;}
        | VOID { $$ = $1}
;
