const expression = require('./OperationType.js');

function Aritmetica(operation_object){
    let n1 = expression(operation_object.izq);
    let n2 = expression(operation_object.der);
    console.log(operation_object.izq, operation_object.der)
    switch(operation_object.type){
        case 'suma':
            if (operation_object.izq.type === 'Char' && operation_object.der.type === 'entero'){
                n1 = n1.charCodeAt(0);
            }else if (operation_object.izq.type === 'entero' && operation_object.der.type === 'Char'){
                n2 = n2.charCodeAt(0);
            }else if (operation_object.izq.type === 'entero' && operation_object.der.type === 'Double'){
                n1 = parseFloat(n1);
            }else if (operation_object.izq.type === 'Double' && operation_object.der.type === 'entero'){
                n2 = parseFloat(n2);
            }else if (operation_object.izq.type === 'entero' && operation_object.der.type === 'Cadena'){
                n1 = n1.toString();
            }else if (operation_object.izq.type === 'Cadena' && operation_object.der.type === 'entero'){
                n2 = n2.toString();
            }else if (operation_object.izq.type === 'Double' && operation_object.der.type === 'Char'){
                n2 = n2.charCodeAt(0)
            }else if (operation_object.izq.type === 'Char' && operation_object.der.type === 'Double'){
                n1 = n1.charCodeAt(0)
            }else if (operation_object.izq.type === 'Cadena' && operation_object.der.type === 'Double'){
                n2 = n2.toString();
            }else if (operation_object.izq.type === 'Double' && operation_object.der.type === 'Cadena'){
                n1 = n1.toString();
            }else if (operation_object.izq.type === 'Boolean' && operation_object.der.type === 'Boolean'){
                // Esta no se deberia de poder hacer
                return "Error";
            }else if (operation_object.izq.type === 'Boolean' && operation_object.der.type === 'Char'){
                // Esta no se deberia de poder hacer
                return "Error";
            }

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