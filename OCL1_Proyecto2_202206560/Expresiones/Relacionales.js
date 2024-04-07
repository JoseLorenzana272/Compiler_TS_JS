const expression = require('./OperationType.js');

function Relacional(operation_object){
    console.log("Operación recibida:", operation_object);
    let n1 = expression(operation_object.izq);
    let n2 = expression(operation_object.der);
    console.log("n1:", n1, "n2:", n2);
    switch(operation_object.type){
        case 'mayor':
            return n1 > n2;
        case 'menor':
            return n1 < n2;
        case 'mayorigual':
            return n1 >= n2;
        case 'menorigual':
            return n1 <= n2;
        case 'igual':
            return n1 === n2;
        case 'noigual':
            return n1 !== n2;
    }
}

module.exports = Relacional;
