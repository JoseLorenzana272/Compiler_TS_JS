const expression = require('./OperationType.js');

function Logica(operation_object){
    let n1 = expression(operation_object.izq);
    let n2 = expression(operation_object.der);
    switch(operation_object.type){
        case 'and':
            return n1 && n2;
        case 'or':
            return n1 || n2;
        case 'not':
            return !n1;
    }
}

module.exports = Logica