import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import {
  Alert,
  AlertIcon,
  Box,
  CloseButton,
  useDisclosure,
  AlertDescription
} from '@chakra-ui/react';
import EditableTable from '../tables/EditableTable';
import Toolbar from '../display/Toolbar';
import { blankRowFromEmptyData } from '../../utils/format';

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

  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: true })


  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    const response = await fetch(`${DATA_BASE_URL}/get_businesses`);
    const data = await response.json();
    setData(blankRowFromEmptyData(columns, data));
  }

  const createBusiness = async (data) => {
    const response = await fetch(`${DATA_BASE_URL}/add_business`, {
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
      {(success && isVisible) && (
          <Alert status='success'>
            <AlertIcon />
            <Box>
              <AlertDescription>
                Business uploaded to the server. Fire on!
              </AlertDescription>
            </Box>
            <CloseButton
              alignSelf='flex-start'
              position='relative'
              right={-1}
              top={-1}
              onClick={onClose}
            />    
          </Alert>
      )}
      <EditableTable 
        columns={columns}
        saveEndpoint={createBusinessMutation}
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