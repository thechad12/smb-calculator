

// Insert a blank row so this data can be edited and added into backend updates
export const blankRowFromEmptyData = (columns,data) => {
    if (data.length == 0) {
        let newData = [];
        for (let i=0; i<columns.length; i++) {
            let field = columns[i].field;
            newData.push({[field]: ''});
        }
        return newData;
    }
    return data;
};


// create empty row from columns
export const insertNewRow = columns => {
    let newData = [];
    for (let i=0; i<columns.length; i++) {
        let field = columns[i].field;
        newData.push({[field]: ''});
    }
    return newData;
};