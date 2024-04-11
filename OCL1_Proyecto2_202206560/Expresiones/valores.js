function newValue(value, type, row, column){
    let value_new = {
        value: value,
        type: type,
        row: row,
        column: column
    }
    return value_new;
}

module.exports = newValue;