import React, { useState, useMemo } from 'react';
import Table from 'rowstack';

const EditableTable = props => {

    const columns = useMemo(() => props.columns);
    const data = props.data;
    const setData = props.setData;
    const saveEndpoint = props.saveEndpoint;
    const [validationErrors, setValidationErrors] = useState([]);

    return (
        <div className='table-container'>
            <Table data={data} columns={columns}/>
        </div>
    )
}

export default EditableTable;