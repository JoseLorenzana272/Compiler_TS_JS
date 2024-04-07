const expression = require('./OperationType.js');

function Aritmetica(operation_object){
    let n1 = expression(operation_object.izq);
    let n2 = expression(operation_object.der);
    switch(operation_object.type){
        case 'suma':
            return n1 + n2;
        case 'resta':
            return n1 - n2;
        case 'multiplicacion':
            return n1 * n2;
        case 'division':
            return n1 / n2;
        case 'potencia':
            return Math.pow(n1, n2);
        case 'modulo':
            return n1 % n2;
    }
}

module.exports = Aritmetica