import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import {
  Alert,
  AlertIcon,
  CloseButton,
  Box,
  useDisclosure,
  AlertDescription
} from '@chakra-ui/react'
import EditableTable from '../tables/EditableTable';
import Toolbar from '../display/Toolbar';
import { blankRowFromEmptyData } from '../../utils/format';

const DATA_BASE_URL = 'http://localhost:8000';

function NewDealBox() {
  const [data, setData] = useState([]);
  const [success, setSuccess] = useState(false);

  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: true })

  const [columns, setColumns] = useState([
    {
      headerName: 'Name', 
      field: 'name', 
      editable: true
    },
    {
      headerName: 'Valuation', 
      field: 'valuation', 
      editable: true
    },
    {
      headerName: 'Gross Revenue', 
      field: 'gross_revenue', 
      editable: true
    },
    {
      headerName: 'Cashflow', 
      field: 'cashflow', 
      editable: true
    },
    {
      headerName: 'Ask Price', 
      field: 'ask_price', 
      editable: true
    },
    {
      headerName: 'Margin', 
      field: 'margin', 
      editable: true
    },
    {
      headerName: 'Sector', 
      field: 'sector', 
      editable: true
    },
    {
      headerName: 'Geography', 
      field: 'geography', 
      editable: true
    },
    {
      headerName: 'Advantages', 
      field: 'advantages', 
      editable: true
    },
    {
      headerName: 'Multiple', 
      field: 'multiple', 
      editable: true
    },
    {
      headerName: 'Investor', 
      field: 'investor', 
      editable: true
    },
    {
      headerName: 'Scale', 
      field: 'scale', 
      editable: true
    },
  ]);

  useEffect(() => {
    fetchDealBoxes();
  }, []);

  const fetchDealBoxes = async () => {
    const response = await fetch(`${DATA_BASE_URL}/get_deal_boxes`);
    const data = await response.json();
    setData(blankRowFromEmptyData(columns, data));
  }

  const createDealBox = async (data) => {
    // Adjust list-type fields
    const adjustedData = {
      ...data,
      cashflow_low: data.cashflow ? data.cashflow.split('-')[0] : 0,
      cashflow_high: data.cashflow ? data.cashflow.split('-')[1] : 0,
      valuation_low: data.valuation ? data.valuation.split('-')[0] : 0,
      valuation_high: data.valuation ? data.valuation.split('-')[1] : 0,
      ask_price_low: data.ask_price ? data.ask_price.split('-')[0] : 0,
      ask_price_high: data.ask_price ? data.ask_price.split('-')[1] : 0,
      revenue_low: data.revenue ? data.revenue.split('-')[0] : 0,
      revenue_high: data.revenue ? data.revenue.split('-')[1] : 0,
      sector: data.sector ? data.sector.split(';') : [],
      margin: data.margin,
      geography: data.geography ? data.geography.split(';') : [],
      advantages: data.advantages ? data.advantages.split(';') : []
    };

    console.log(adjustedData);

    const response = await fetch(`${DATA_BASE_URL}/add_deal_box`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(adjustedData)
    });
    const responseData = await response.json();
    return responseData;
  };

  const { mutate: createDealBoxMutation, isLoading: isCreatingDealBox } = useMutation(createDealBox, {
    onSuccess: () => {
      setSuccess(true);
      fetchDealBoxes();
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
              Deal Box uploaded to the server. Fire on!
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
        width="58rem"
        saveEndpoint={createDealBoxMutation}
        data={data} />
      </>
  );
}

export default NewDealBox;