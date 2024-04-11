
function Ternario(operation_object) {
    let condition = operation_object.condicion;
    let valueIfTrue = operation_object.res1;
    let valueIfFalse = operation_object.res2;
    console.log("Condición", condition);
    console.log("Valor si verdadero", valueIfTrue);
    console.log("Valor si falso", valueIfFalse);
    if (condition.value) {
      return valueIfTrue;
    } else {
      return valueIfFalse;
    }
  }
  
  module.exports = Ternario;