import React, { useState, useMemo } from 'react';
import {
    Button
} from '@chakra-ui/react';
import Table from 'rowstack';

const EditableTable = props => {

    const columns = useMemo(() => props.columns);
    const data = props.data;
    const saveEndpoint = props.saveEndpoint;
    const [validationErrors, setValidationErrors] = useState([]);

    return (
        <>
            <Button variant='ghost' onClick={saveEndpoint}>
                Save Data
            </Button>
            <div className='table-container'>
                <Table data={data} columns={columns}/>
            </div>
        </>
    )
}

export default EditableTable;