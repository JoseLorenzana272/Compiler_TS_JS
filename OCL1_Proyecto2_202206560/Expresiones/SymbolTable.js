class SymbolTable {
    constructor() {
      this.symbols = [];
    }
  
    // Método para agregar un símbolo a la tabla
    addSymbol(type, name, value, row, column) {
      console.log("Agregando símbolo", name, "de tipo", type, "con valor", value, "en la fila", row, "y columna", column);
      name.forEach(element => {
        this.symbols.push({ type: type, name: element, value: value, row: row, column: column });
      });
    }
  
    // Método para buscar un símbolo en la tabla
    getSymbol(name) {
      return this.symbols.find((symbol) => symbol.name === name);
    }
  
    // Método para actualizar el valor de un símbolo
    updateSymbol(name, newValue) {
      const symbol = this.getSymbol(name);
      if (symbol) {
        symbol.value = newValue;
      }
    }

    searchSymbol(name){
      return this.symbols.find((symbol) => symbol.name === name);
    }
  }

  module.exports = SymbolTable;
