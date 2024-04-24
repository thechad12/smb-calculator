import React, { useState, useMemo } from 'react';
import Table from 'rowstack';

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
        useTable({ 
            columns, 
            data,
            getCoreRowModel: getCoreRowModel(),
            meta: {
                updateData: handleSaveClick,
            }
        });

    return (
        <div className='table-container'>
            <Table data={data} columns={columns}/>
        </div>
    )
}

export default EditableTable;