import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import {
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import EditableTable from '../tables/EditableTable';
import Toolbar from '../display/Toolbar';
import { blankRowFromEmptyData } from '../../utils/format';

const API_BASE_URL = 'http://localhost:8000/actions';
const DATA_BASE_URL = 'http://localhost:8000';

function NewBusiness() {
  const [data, setData] = useState([]);
  const [success, setSuccess] = useState(false);

  const [columns, setColumns] = useState([
    {headerName: 'Name', field: 'name', editable: true},
    {headerName: 'Location', field: 'location', editable: true},
    {headerName: 'Business Type', field: 'biz_type', editable: true},
    {headerName: 'Description', field: 'description', editable: true},
  ]);

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    const response = await fetch(`${DATA_BASE_URL}/get_businesses`);
    const data = await response.json();
    setData(blankRowFromEmptyData(columns, data));
  }

  const createBusiness = async (data) => {
    const response = await fetch(`${API_BASE_URL}/add_business`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const responseData = await response.json();
    return responseData;
  };

  const { mutate: createBusinessMutation, isLoading: isCreatingBusiness } = useMutation(createBusiness, {
    onSuccess: () => {
      setSuccess(true);
      fetchBusinesses();
    }
  });

  return (
    <>
      <Toolbar/>
      {success && (
          <Alert status='success'>
            <AlertIcon />
            Business uploaded to the server. Fire on!
          </Alert>
      )}
      <EditableTable 
        columns={columns}
        endpoint={createBusinessMutation}
        width="55rem"
        styleProps={{
          left: '10rem',
          position: 'relative'
        }}
        data={data} />
      </>
  );
}

export default NewBusiness;