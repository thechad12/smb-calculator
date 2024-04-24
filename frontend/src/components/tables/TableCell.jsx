import React, {useState, useEffect} from 'react';

const TableCell = (props) => {
    const value = props.value;
    const onChange = props.onChange;
    const getValue = props.getValue;
    const table = props.table;
    const row = props.row;
    const column = props.column;
    const initialValue = getValue ? getValue() : '';
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
        setInputValue(initialValue)
    }, [initialValue]);

    const onBlur = () => {
        table.options.meta?.updateData(row.index, column.id, value);
    }

    const handleInputChange = e => {
        setInputValue(e.target.value);
        onChange(e.target.value);
    };

    return <input
            value={inputValue}
            onChange={handleInputChange}
            onBlur={onBlur} />;
}

export default TableCell;