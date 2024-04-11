const expression = require('./OperationType.js');
const newValue = require('./valores.js');

function Aritmetica(operation_object){
    let n1 = expression(operation_object.izq);
    let n2 = expression(operation_object.der);
    console.log(operation_object.izq, operation_object.der)
    switch(operation_object.type){
        case 'suma':
            if (operation_object.izq.type === 'char' && operation_object.der.type === 'entero'){
                n1 = n1.charCodeAt(0);
                return new newValue(n1 + n2, 'char', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'entero' && operation_object.der.type === 'char'){
                n2 = n2.charCodeAt(0);
                return new newValue(n1 + n2, 'char', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'entero' && operation_object.der.type === 'double'){
                n1 = parseFloat(n1);
                return new newValue(n1 + n2, 'double', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'double' && operation_object.der.type === 'entero'){
                n2 = parseFloat(n2);
                return new newValue(n1 + n2, 'double', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'entero' && operation_object.der.type === 'cadena'){
                n1 = n1.toString();
                return new newValue(n1 + n2, 'cadena', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'cadena' && operation_object.der.type === 'entero'){
                n2 = n2.toString();
                return new newValue(n1 + n2, 'cadena', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'double' && operation_object.der.type === 'char'){
                n2 = n2.charCodeAt(0)
                return new newValue(n1 + n2, 'double', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'char' && operation_object.der.type === 'double'){
                n1 = n1.charCodeAt(0)
                return new newValue(n1 + n2, 'double', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'cadena' && operation_object.der.type === 'double'){
                n2 = n2.toString();
                return new newValue(n1 + n2, 'cadena', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'double' && operation_object.der.type === 'cadena'){
                n1 = n1.toString();
                return new newValue(n1 + n2, 'cadena', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'boolean' && operation_object.der.type === 'boolean'){
                // Esta no se deberia de poder hacer
                return "Error";
            }else if (operation_object.izq.type === 'boolean' && operation_object.der.type === 'char'){
                // Esta no se deberia de poder hacer
                return "Error";
            }else if (operation_object.izq.type === 'entero' && operation_object.der.type === 'entero'){
                n2 = parseInt(n2);
                n1 = parseInt(n1);
                return new newValue(n1 + n2, 'entero', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'double' && operation_object.der.type === 'double'){
                return new newValue(n1 + n2, 'double', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'char' && operation_object.der.type === 'char'){
                return new newValue(n1 + n2, 'char', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'cadena' && operation_object.der.type === 'cadena'){
                return new newValue(n1 + n2, 'cadena', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'entero' && operation_object.der.type === 'boolean'){
                return new newValue(n1 + n2, 'entero', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'boolean' && operation_object.der.type === 'entero'){
                return new newValue(n1 + n2, 'entero', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'double' && operation_object.der.type === 'boolean'){
                return new newValue(n1 + n2, 'double', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'boolean' && operation_object.der.type === 'double'){
                return new newValue(n1 + n2, 'double', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'char' && operation_object.der.type === 'boolean'){
                return 'Error';
            }else if (operation_object.izq.type === 'boolean' && operation_object.der.type === 'char'){
                return 'Error';
            }else if (operation_object.izq.type === 'char' && operation_object.der.type === 'cadena'){
                return new newValue(n1 + n2, 'cadena', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'cadena' && operation_object.der.type === 'char'){
                return new newValue(n1 + n2, 'cadena', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'cadena' && operation_object.der.type === 'boolean'){
                return new newValue(n1 + n2, 'cadena', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'boolean' && operation_object.der.type === 'cadena'){
                return new newValue(n1 + n2, 'cadena', operation_object.line, operation_object.column);
            }
            return n1 + n2;
            
        case 'resta':
            if (operation_object.izq.type === 'char' && operation_object.der.type === 'entero'){
                n1 = n1.charCodeAt(0);
                return new newValue(n1 - n2, 'entero', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'entero' && operation_object.der.type === 'char'){
                n2 = n2.charCodeAt(0);
                return new newValue(n1 - n2, 'entero', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'entero' && operation_object.der.type === 'double'){
                n1 = parseFloat(n1);
                return new newValue(n1 - n2, 'double', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'double' && operation_object.der.type === 'entero'){
                n2 = parseFloat(n2);
                return new newValue(n1 - n2, 'double', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'entero' && operation_object.der.type === 'cadena'){
                return "Error";
            }else if (operation_object.izq.type === 'cadena' && operation_object.der.type === 'entero'){
                return "Error";
            }else if (operation_object.izq.type === 'entero' && operation_object.der.type === 'boolean'){
                return new newValue(n1 - n2, 'entero', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'boolean' && operation_object.der.type === 'entero'){
                return new newValue(n1 - n2, 'entero', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'double' && operation_object.der.type === 'char'){
                n2 = n2.charCodeAt(0)
                return new newValue(n1 - n2, 'double', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'char' && operation_object.der.type === 'double'){
                n1 = n1.charCodeAt(0)
                return new newValue(n1 - n2, 'double', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'entero' && operation_object.der.type === 'entero'){
                return new newValue(n1 - n2, 'entero', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'double' && operation_object.der.type === 'double'){
                return new newValue(n1 - n2, 'double', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'double' && operation_object.der.type === 'boolean'){
                return new newValue(n1 - n2, 'double', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'boolean' && operation_object.der.type === 'double'){
                return new newValue(n1 - n2, 'double', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'char' && operation_object.der.type === 'boolean'){
                return 'Error';
            }else if (operation_object.izq.type === 'boolean' && operation_object.der.type === 'char'){
                return 'Error';
            }else if (operation_object.izq.type === 'char' && operation_object.der.type === 'cadena'){
                return "Error";
            }else if (operation_object.izq.type === 'cadena' && operation_object.der.type === 'char'){
                return "Error";
            }else if (operation_object.izq.type === 'cadena' && operation_object.der.type === 'boolean'){
                return "Error";
            }else if (operation_object.izq.type === 'boolean' && operation_object.der.type === 'cadena'){
                return "Error";
            }else if (operation_object.izq.type === 'boolean' && operation_object.der.type === 'boolean'){
                return 'Error';
            }else if (operation_object.izq.type === 'char' && operation_object.der.type === 'char'){
                return 'Error';
            }else if (operation_object.izq.type === 'cadena' && operation_object.der.type === 'cadena'){
                return 'Error';
            }
            return n1 - n2;
        case 'multiplicacion':
            if (operation_object.izq.type === 'entero' && operation_object.der.type === 'entero'){
                return new newValue(n1 * n2, 'entero', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'entero' && operation_object.der.type === 'double'){
                n1 = parseFloat(n1);
                return new newValue(n1 * n2, 'double', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'double' && operation_object.der.type === 'entero'){
                n2 = parseFloat(n2);
                return new newValue(n1 * n2, 'double', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'entero' && operation_object.der.type === 'char'){
                n2 = n2.charCodeAt(0);
                return new newValue(n1 * n2, 'entero', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'char' && operation_object.der.type === 'entero'){
                n1 = n1.charCodeAt(0);
                return new newValue(n1 * n2, 'entero', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'double' && operation_object.der.type === 'double'){
                return new newValue(n1 * n2, 'double', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'char' && operation_object.der.type === 'double'){
                n2 = n2.charCodeAt(0);
                return new newValue(n1 * n2, 'double', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'double' && operation_object.der.type === 'char'){
                n1 = n1.charCodeAt(0);
                return new newValue(n1 * n2, 'double', operation_object.line, operation_object.column);
            }
            return n1 * n2;
        case 'division':
            if (operation_object.izq.type === 'entero' && operation_object.der.type === 'entero'){
                return new newValue(n1 / n2, 'entero', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'entero' && operation_object.der.type === 'double'){
                n1 = parseFloat(n1);
                return new newValue(n1 / n2, 'double', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'double' && operation_object.der.type === 'entero'){
                n2 = parseFloat(n2);
                return new newValue(n1 / n2, 'double', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'entero' && operation_object.der.type === 'char'){
                n2 = n2.charCodeAt(0);
                return new newValue(n1 / n2, 'entero', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'char' && operation_object.der.type === 'entero'){
                n1 = n1.charCodeAt(0);
                return new newValue(n1 / n2, 'entero', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'double' && operation_object.der.type === 'double'){
                return new newValue(n1 / n2, 'double', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'char' && operation_object.der.type === 'double'){
                n2 = n2.charCodeAt(0);
                return new newValue(n1 / n2, 'double', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'double' && operation_object.der.type === 'char'){
                n1 = n1.charCodeAt(0);
                return new newValue(n1 / n2, 'double', operation_object.line, operation_object.column);
            }
            return n1 / n2;
        case 'potencia':
            if (operation_object.izq.type === 'double' && operation_object.der.type === 'entero'){
                n2 = parseFloat(n2);
                return new newValue(Math.pow(n1, n2), 'double', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'entero' && operation_object.der.type === 'double'){
                n1 = parseFloat(n1);
                return new newValue(Math.pow(n1, n2), 'double', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'entero' && operation_object.der.type === 'entero'){
                n1 = parseInt(n1);
                n2 = parseInt(n2);
                return new newValue(Math.pow(n1, n2), 'entero', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'double' && operation_object.der.type === 'double'){
                return new newValue(Math.pow(n1, n2), 'double', operation_object.line, operation_object.column);
            }
            return Math.pow(n1, n2);
        case 'modulo':
            if (operation_object.izq.type === 'entero' && operation_object.der.type === 'entero'){
                n1 = parseFloat(n1);
                n2 = parseFloat(n2);
                return new newValue(n1 % n2, 'double', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'double' && operation_object.der.type === 'entero'){
                n2 = parseFloat(n2);
                return new newValue(n1 % n2, 'double', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'entero' && operation_object.der.type === 'double'){
                n1 = parseFloat(n1);
                return new newValue(n1 % n2, 'double', operation_object.line, operation_object.column);
            }else if (operation_object.izq.type === 'double' && operation_object.der.type === 'double'){
                return new newValue(n1 % n2, 'double', operation_object.line, operation_object.column);
            }
            return n1 % n2;
    }
} 

module.exports = Aritmetica