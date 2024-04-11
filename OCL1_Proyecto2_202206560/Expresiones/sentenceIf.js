const expression = require('./OperationType.js');
const newValue = require('./valores.js');
const relacional = require('./Relacionales.js');

function sentenceIf(operation_object){
    console.log("Operación recibida:", operation_object);
    let condition = relacional(operation_object.condition);
    console.log("Condición:", condition);
}

module.exports = sentenceIf;