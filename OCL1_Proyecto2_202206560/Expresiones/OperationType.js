function expression(expresion_type){
    if (expresion_type.type === 'entero'){
        return parseInt(expresion_type.value);
    
    }
    else if (expresion_type.type === 'Double'){
        return parseFloat(expresion_type.value);
    }
    else if (expresion_type.type === 'Cadena'){
        return expresion_type.value;
    }
    else if (expresion_type.type === 'Boolean'){
        return expresion_type.value;
    }
    else if (expresion_type.type === 'Char'){
        return expresion_type.value;
    }
    else if (expresion_type.type === 'negativo'){
        return -expression(expresion_type.izq);
    }
    else if (expresion_type.type === 'suma' || expresion_type.type === 'resta' || expresion_type.type === 'multiplicacion' || expresion_type.type === 'division' || expresion_type.type === 'potencia' || expresion_type.type === 'modulo'){
        const Aritmetica = require('./Aritmeticas');
        return Aritmetica(expresion_type);
    }

    if (expresion_type.type === 'mayor' || expresion_type.type === 'menor' || expresion_type.type === 'mayorigual' || expresion_type.type === 'menorigual' || expresion_type.type === 'igual' || expresion_type.type === 'noigual'){
        const Relacional = require('./Relacionales');
        return Relacional(expresion_type);
    }
    if (expresion_type.type === 'and' || expresion_type.type === 'or' || expresion_type.type === 'not'){
        const Logica = require('./Logicas');
        return Logica(expresion_type);
    }
}

module.exports = expression