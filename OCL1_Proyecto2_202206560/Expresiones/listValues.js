const expression = require('./OperationType.js');

function analyzeList(instrucciones) {
    var salida = "";
    instrucciones.forEach(instruccion => {
        salida += expression(instruccion);
        salida += '\n';
    });
    return salida;
}

module.exports = analyzeList