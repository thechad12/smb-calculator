import React, { useState, useEffect, useMemo } from 'react';
import { useTable } from 'react-table';

const TableInput = (props) => {
    const value = props.value;
    const onChange = props.onChange;
    const [inputValue, setInputValue] = useState(value);

    const handleInputChange = e => {
        setInputValue(e.target.value);
        onChange(e.target.value);
    };

    return <input
            value={inputValue}
            onChange={handleInputChange} />;
}

const EditableTable = props => {

    const columns = useMemo(() => props.columns);
    const data = props.data;
    const setData = props.setData;
    const saveEndpoint = props.saveEndpoint;
    const [validationErrors, setValidationErrors] = useState([]);

    const handleEditClick = rowId => {
        setEditRowId(rowId);
    };

    const handleSaveClick = async (rowId, updatedRowData) => {
        try {
            await saveEndpoint(updatedRowData);
            setData((prevData) => {
                prevData.map((row) => (row.id == rowId ? updatedRowData : row))
            });
            setEditRowId(null);
        } catch (e) {
            alert("there was an error saving data: ", e);
        }
    }

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data });

    return (
        <div className='table-container'>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {editRowId === row.id ? (
                                                <TableInput
                                                    value={cell.value}
                                                    onChange={(newValue) => {}}
                                                />
                                            )
                                            : (cell.render('Cell'))
                                            }
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default EditableTable;