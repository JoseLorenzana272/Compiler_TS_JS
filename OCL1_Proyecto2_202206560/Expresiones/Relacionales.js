const expression = require('./OperationType.js');
const newValue = require('./valores.js')

function Relacional(operation_object){
    console.log("Operación recibida:", operation_object);
    let n1 = expression(operation_object.izq);
    let n2 = expression(operation_object.der);
    console.log("n1:", n1, "n2:", n2);
    switch(operation_object.type){
        case 'mayor':
            return new newValue(n1 > n2, 'Boolean', operation_object.line, operation_object.column);
        case 'menor':
            return new newValue(n1 < n2, 'Boolean', operation_object.line, operation_object.column);
        case 'mayorigual':
            return new newValue(n1 >= n2, 'Boolean', operation_object.line, operation_object.column);
        case 'menorigual':
            return new newValue(n1 <= n2, 'Boolean', operation_object.line, operation_object.column);
        case 'igual':
            return new newValue(n1 === n2, 'Boolean', operation_object.line, operation_object.column);
        case 'noigual':
            return new newValue(n1 !== n2, 'Boolean', operation_object.line, operation_object.column);
    }
}

module.exports = Relacional;
