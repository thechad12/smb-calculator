import React from "react";
import { Link } from "react-router-dom";

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
    let dataset = {};
    for (let i=0; i<columns.length; i++) {
        let field = columns[i].field;
        dataset[field] = '';
    }
    newData.push(dataset);
    return newData;
};

const mapCurrencyToSymbol = currency => {
    const map = {
        'USD': '$',
        'CAD': 'CAD',
        'Euro': '€',
        'AUD': 'AUD',
        'GBP': '£',
    }
}


export const money = (value, currency) => {
    const newValue = value.toFixed(2).toString();
    return `${mapCurrencyToSymbol(currency)} ${newValue}`
}

// Generate link from entity to profile page
export const link = (uid, entity, name) => {
    return (
        <Link to={`${entity}/${uid}`}>{name}</Link>
    )
}