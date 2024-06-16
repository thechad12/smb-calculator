import React, 
{ 
    useState, 
    useMemo,
    useRef,
    useCallback,
} from 'react';
import {
    Button
} from '@chakra-ui/react';
import { AgGridReact } from 'ag-grid-react'; 
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { insertNewRow } from '../../utils/format';

const EditableTable = props => {

    const columns = props.columns;
    const data = props.data;
    const gridRef = useRef();
    const saveEndpoint = props.saveEndpoint;
    const saveText = props.saveText || 'Save Data';
    const width = props.width || '100%';
    const styleProps = props.styleProps || {};
    const [validationErrors, setValidationErrors] = useState([]);

    const defaultColDef = useMemo(() => {
        return {
          filter: 'agTextColumnFilter',
          floatingFilter: true,
        }
    }, []);

    const getRowData = useCallback(() => {
        const rowData = [];
        gridRef.current.api.forEachNode((node) => {
            rowData.push(node.data);
        });
        return rowData;
    });

    const addBlankRow = useCallback((addIndex) => {
        const newRow = insertNewRow(columns);
        const res = gridRef.current.api.applyTransaction({
            add: newRow,
            addIndex: addIndex,
        });
        return res;
    });

    return (
        <>
            <div className='table-container'>
                <Button variant='ghost' onClick={() => saveEndpoint(getRowData)}>
                    {saveText}
                </Button>
                <Button variant='ghost' onClick={() => addBlankRow(data.length || 0)}>
                    Add New Row
                </Button>
                <div className="ag-theme-quartz" // applying the grid theme
                style={{ height: 500, width: width, ...styleProps }} // the grid will fill the size of the parent container
                >
                <AgGridReact
                    rowData={data}
                    columnDefs={columns}
                    defaultColDef={defaultColDef}
                    pagination
                />
                </div>
            </div>
        </>
    )
}

export default EditableTable;