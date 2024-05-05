import React, { useState, useMemo } from 'react';
import {
    Button
} from '@chakra-ui/react';
import Table from 'rowstack';

const EditableTable = props => {

    const columns = useMemo(() => props.columns);
    const data = props.data;
    const saveEndpoint = props.saveEndpoint;
    const saveText = props.saveText || 'Save Data';
    const [validationErrors, setValidationErrors] = useState([]);

    return (
        <>
            <div className='table-container'>
                <Button variant='ghost' onClick={saveEndpoint}>
                    {saveText}
                </Button>
                <Table data={data} columns={columns}/>
            </div>
        </>
    )
}

export default EditableTable;