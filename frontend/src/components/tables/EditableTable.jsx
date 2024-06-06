import React, { useState } from 'react';
import {
    Button
} from '@chakra-ui/react';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

const EditableTable = props => {

    const columns = props.columns;
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
                <div className="ag-theme-quartz" // applying the grid theme
                style={{ height: 500 }} // the grid will fill the size of the parent container
                >
                <AgGridReact
                    rowData={data}
                    columnDefs={columns}
                />
                </div>
            </div>
        </>
    )
}

export default EditableTable;