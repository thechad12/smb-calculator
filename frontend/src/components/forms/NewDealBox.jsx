import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import {
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import EditableTable from '../tables/EditableTable';
import Toolbar from '../display/Toolbar';

const API_BASE_URL = 'http://localhost:8000/actions';
const DATA_BASE_URL = 'http://localhost:8000';

function NewDealBox() {
  const [data, setData] = useState([]);
  const [success, setSuccess] = useState(false);

  const columns = useState([
    {headerName: 'Name', field: 'name'},
    {headerName: 'Valuation', field: 'valuation'},
    {headerName: 'Gross Revenue', field: 'gross_revenue'},
    {headerName: 'Cashflow', field: 'cashflow'},
    {headerName: 'Ask Price', field: 'ask_price'},
    {headerName: 'Margin', field: 'margin'},
    {headerName: 'Sector', field: 'sector'},
    {headerName: 'Geography', field: 'geography'},
    {headerName: 'Advantages', field: 'advantages'},
    {headerName: 'Multiple', field: 'multiple'},
    {headerName: 'Investor', field: 'investor'},
    {headerName: 'Scale', field: 'scale'},
  ]);

  useEffect(() => {
    fetchDealBoxes();
  }, []);

  const fetchDealBoxes = async () => {
    const response = await fetch(`${DATA_BASE_URL}/get_deal_boxes`);
    const data = await response.json();
    setData(data);
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
      geography: data.geography ? data.geography.split(';') : [],
      advantages: data.advantages ? data.advantages.split(';') : []
    };

    const response = await fetch(`${API_BASE_URL}/add_deal_box`, {
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
      {success && (
          <Alert status='success'>
            <AlertIcon />
            Deal Box uploaded to the server. Fire on!
          </Alert>
      )}
      <EditableTable 
        columns={columns}
        endpoint={createDealBoxMutation}
        data={data} />
      </>
  );
}

export default NewDealBox;